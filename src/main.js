import chalk from 'chalk'
import moment from 'moment'
import { readFileSync } from 'fs'
import 'shelljs/global'
import { CronJob } from 'cron'
import Runner from 'Modules/Runner'
class App {
  constructor() {
    global.chalk = chalk
    global.log = this.log
    global.now = this.now
    global.config = JSON.parse(readFileSync('static/config.json', 'utf8'))

    this.config = config
    this.runner = Runner(this.config)

    console.log(chalk.cyan(`App start... \t ${now()}`))

    for(const jobName in this.config.jobs) {
      const jobConfig = this.config.jobs[jobName]
      const job = new CronJob(jobConfig.schedule, () => this.startJob(jobName, jobConfig))
      job.start()

      if(jobConfig.runAtStart) this.startJob(jobName, jobConfig)
    }
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

  async startJob(jobName, jobConfig) {
    log(`[Cron Service] Runner execute ${jobConfig.name} \t\tat ${now()}`)
    this.runner.execute(jobName, jobConfig)
  }
}

export default new App()