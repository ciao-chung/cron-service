export default {
  name: 'Some Cron Job',
  runAtStart: true,
  cron: {
    rule: '*/60 * * * * *',
  },
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
  drivers: {
    line: {
      config: {
        token: 'line_token',
      },
    },
    email: {
      config: {
        username: 'username',
        password: 'password',
        from: 'foo@bar.com',
        to: 'target1@foobar.com,target2@foobar.com',
      },
    },
  },
}