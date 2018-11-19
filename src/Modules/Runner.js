import shelljs from 'shelljs'
import Notify from 'Modules/Notify'
class Runner {
  constructor(config) {
    this.config = config
    this.notify = Notify(config)
    this.onProcess = {}
    this.result = []
    
  }

  async execute(jobName, jobConfig) {
    if(this.onProcess[jobName]) {
      log(`Skip job [${jobConfig.name}], cuz it's still process. \t\tat ${now()}`, 'red')
      return
    }
    this.onProcess[jobName] = true

    if(!Array.isArray(jobConfig.commands)) {
      log('commands property in config.js must be array type', 'red')
      return
    }

    for(const command of jobConfig.commands) {
      let execConfig = {
        async: true,
      }
      if(command.cwd) execConfig.cwd = command.cwd
      if(command.description) log(`[Running] ${command.description}`)
      let result = await this._execAsync(`${command.command}`, execConfig)
      result.cwd = command.cwd
      result.command = command.command
      result.description = command.description
      this.result.push(result)
    }

    this.notify.send(jobConfig, this.result)
    this.result = []
    delete this.onProcess[jobName]
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

export default config => new Runner(config)