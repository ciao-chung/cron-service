import chalk from 'chalk'
import { CronJob } from 'cron'
class App {
  constructor() {
    global.chalk = chalk
    global.log = this.log
    console.log(chalk.cyan('App start...'))
    this.Job = new CronJob('* * * * * *', this.start)
    this.Job.start()
  }

  /**
   * log style(white, red, green, yellow, cyan, magenta)
   */
  log(content, style = 'cyan') {
    console.log(chalk[`${style}Bright`](content)+chalk.whiteBright(`\t at ${now()}`))
  }

  start() {
    console.log(chalk.cyan(new Date()))
  }


}

export default new App()