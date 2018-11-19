import axios from 'axios'
class BaseNotifyDriver {
  constructor(driverConfig) {
    this.config = config
    this.driverConfig = driverConfig
    this.axios = axios
    this.init()
  }

  init() {
    // TODO
  }

  async send() {
    // TODO
  }
}

export default BaseNotifyDriver