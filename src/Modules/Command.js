import shelljs from 'shelljs'
import Notify from 'Modules/Notify'
class Command {
  constructor(config) {
    this.config = config
    this.notify = Notify(config)
    this.result = []
  }

  async execute() {
    if(!Array.isArray(this.config.commands)) {
      log('commands property in config.js must be array type', 'red')
      return
    }

    for(const command of this.config.commands) {
      let execConfig = {
        async: true,
      }
      if(command.cwd) execConfig.cwd = command.cwd
      if(command.description) log(command.description)
      let result = await this._execAsync(`${command.command}`, execConfig)
      result.cwd = command.cwd
      result.command = command.command
      result.description = command.description
      this.result.push(result)
    }

    this.notify.send(this.result)
  }

  _execAsync(command, options = {}) {
    return new Promise((resolve, reject) => {
      shelljs.exec(command, options, async(code, stdout, stderr) => {
        if(code != 0) {
          new Error(stderr)
          return reject({
            type: 'error',
            log: stderr,
          })
        }

        return resolve({
          type: 'success',
          log: stdout,
        })
      })
    })
  }
}

export default config => new Command(config)