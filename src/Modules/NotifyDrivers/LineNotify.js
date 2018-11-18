import BaseNotifyDriver from 'Modules/NotifyDrivers/BaseNotifyDriver.js'
class LineNotify extends BaseNotifyDriver{
  async send(title, result) {
    this.token = this.config.drivers.line.data.token

    for(const command of result) {
      try {
        await this.axios({
          url: 'https://notify-api.line.me/api/notify',
          method: 'post',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          params: {
            message: this._getContent(title, command),
          }
        })
      } catch(error) {
        const response = error.response
        log(`line notify error ${response.status}`, 'red')
        log(`${response.data}`, 'red')
      }
    }
  }

  _getContent(title, command) {
    let content =  `\nJob: ${title}(${command.type})\n`
    return content
  }
}

export default data => new LineNotify(data)