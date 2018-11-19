import LineNotify from 'Modules/NotifyDrivers/LineNotify.js'
import EmailNotify from 'Modules/NotifyDrivers/EmailNotify.js'
class Notify {
  constructor(config) {
    this.config = config
    this.init()
  }

  async init() {
    this.drivers = {
      line: LineNotify(this.config.notifyDrivers.line),
      email: EmailNotify(this.config.notifyDrivers.email),
    }
  }

  async send(jobConfig, result) {
    for(const driverName of jobConfig.notify) {
      const driver = this.drivers[driverName]

      if(!driver) {
        log(`Notify driver ${driverName} config not found`, 'red')
        return
      }

      await driver.send(jobConfig.name, result)
    }
  }
}

export default config => new Notify(config)