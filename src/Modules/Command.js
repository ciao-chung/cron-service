import shelljs from 'shelljs'
import Notify from 'Modules/Notify'
class Command {
  constructor(config) {
    this.config = config
    this.notify = Notify(config)
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
      await this._execAsync(`${command.command}`, execConfig)
    }
  }

  _execAsync(command, options = {}) {
    const self = this
    return new Promise((resolve, reject) => {
      shelljs.exec(command, options, async(code, stdout, stderr) => {
        await self.notify.send(code, stdout, stderr)
        if(code != 0) return reject(new Error(stderr))
        return resolve(stdout)
      })
    })
  }
}

export default config => new Command(config)