class Notify {
  constructor(config) {
    this.config = config
  }

  async send() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.warn('send success')
        resolve()
      }, 1000)
    })
  }
}

export default config => new Notify(config)