export default {
  jobs: {
    someCronJob: {
      name: 'Some Cron Job',
      runAtStart: true,
      schedule: '*/60 * * * * *',
      commands: [
        {
          command: 'rm -rf foobar',
          description: 'remove folder',
        },
        {
          command: 'git clone git@github.com:rtyley/small-test-repo.git foobar; pwd; ls',
          description: 'clone project',
        },
        {
          command: 'cd foobar; ls',
          description: 'go into project',
        },
        {
          command: 'rm -rf foobar',
          description: 'delete project',
        },
      ],
      notify: ['line', 'email']
    },
  },
  notifyDrivers: {
    line: {
      config: {
        token: 'lintNotifyApiToken',
      },
    },
    email: {
      config: {
        username: 'foo@bar.com',
        password: 'password',
        from: 'foo@bar.com',
        to: 'target1@foobar.com,target3@foobar.com',
      },
    },
  },
}