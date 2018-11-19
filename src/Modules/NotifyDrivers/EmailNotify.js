import BaseNotifyDriver from 'Modules/NotifyDrivers/BaseNotifyDriver.js'
import nodemailer from 'nodemailer'
class EmailNotify extends BaseNotifyDriver{
  async send(title, result) {
    this.mailConfig = this.driverConfig.config

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.mailConfig.username,
        pass: this.mailConfig.password,
      },
    })

    const sendConfig = {
      from: this.mailConfig.from,
      to: this.mailConfig.to,
      subject: title,
      html: this._getContent(title, result),
    }

    await this._setMail(transporter, sendConfig)
  }

  async _setMail(transporter, sendConfig) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(sendConfig, (error, info) => {
        if(error) {
          log(error, 'red')
          log('[Notify] Send mail fail', 'red')
          return reject(error)
        }

        log('[Notify] Send mail successfully', 'green')
        resolve()
      })
    })
  }

  _getContent(title, result) {
    let content = `<h1>${title}</h1><br><br>`
    for(const command of result) {
      content += `<div><h3>${command.description}</h3></div><br>`
      content += `<div><strong>type</strong></div></div><div>${command.type}</div><br>`
      content += `<div><strong>command</strong></div></div><div>${command.command}</div><br>`
      content += `<div><strong>log</strong></div></div><div>${this._nl2br(command.log)}</div><br>`
      content += `<hr><br>`
    }
    return content
  }

  _nl2br(data) {
    return String(data).replace(/\n/g, '<br>')
  }
}

export default data => new EmailNotify(data)