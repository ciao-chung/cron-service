import LineNotify from 'Modules/NotifyDrivers/LineNotify.js'
import EmailNotify from 'Modules/NotifyDrivers/EmailNotify.js'
class Notify {
  constructor(config) {
    this.config = config
    this.init()
  }

  async init() {
    this.drivers = {
      line: LineNotify(),
      email: EmailNotify(),
    }
  }

  async send(result) {
    for(const driverName in this.config.drivers) {
      await this.drivers[driverName].send(this.config.name, result)
    }
  }
}

export default config => new Notify(config)