import shelljs from 'shelljs'
class Command {
  constructor(config) {
    this.config = config
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
      await this._execAsync(command.command, execConfig)
    }

  }

  _execAsync(command, options = {}) {
    return new Promise(function(resolve, reject) {
      shelljs.exec(command, options, function(code, stdout, stderr) {
        if (code != 0) return reject(new Error(stderr))
        return resolve(stdout)
      })
    })
  }
}

export default config => new Command(config)