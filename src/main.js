import chalk from 'chalk'
import moment from 'moment'
import 'shelljs/global'
import { CronJob } from 'cron'
import config from 'static/config.example'
import Command from 'Modules/Command'
class App {
  constructor() {
    global.chalk = chalk
    global.log = this.log
    global.now = this.now
    global.config = config

    this.config = config
    this.command = Command(config)
    console.log(chalk.cyan('App start...'))

    this.job = new CronJob(this.config.cron.rule, () => this.start())
    this.job.start()

    if(this.config.runAtStart) this.start()
  }

  /**
   * log style(white, red, green, yellow, cyan, magenta)
   */
  log(content, style = 'cyan') {
    console.log(chalk[`${style}Bright`](content)+chalk.whiteBright(`\t at ${now()}`))
  }

  now() {
    return moment(new Date).format('YYYY-MM-DD HH:mm:ss')
  }

  async start() {
    await this.command.execute()
    console.log(chalk.cyan(new Date()))
  }
}

export default new App()