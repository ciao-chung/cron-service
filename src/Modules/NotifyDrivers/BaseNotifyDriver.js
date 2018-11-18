import axios from 'axios'
class BaseNotifyDriver {
  constructor() {
    this.config = config
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