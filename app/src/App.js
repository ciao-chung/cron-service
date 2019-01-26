import 'Global'
import { CronJob } from 'cron'
import Runner from 'Modules/Runner'
import { readFileSync } from 'fs'
class App {
  constructor() {
    this.init()
  }

  async init() {
    try {
      global.config = JSON.parse(readFileSync(args.config, 'utf8'))
    } catch (error) {
      process.exit()
    }
    this.runner = Runner(config)
    this.start()
  }

  async start() {
    console.log(chalk.cyan(`App start... \t ${now()}`))
    for(const jobName in config.jobs) {
      const jobConfig = config.jobs[jobName]
      this.setupSchedule(jobName, jobConfig)

      if(jobConfig.runAtStart) this.startJob(jobName, jobConfig)
    }
  }

  setupSchedule(jobName, jobConfig) {
    if(!Array.isArray(jobConfig.schedule)) {
      const job = new CronJob(jobConfig.schedule, () => this.startJob(jobName, jobConfig))
      job.start()
      return
    }

    for(const schedule of jobConfig.schedule) {
      const job = new CronJob(schedule, () => this.startJob(jobName, jobConfig))
      job.start()
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

new App()