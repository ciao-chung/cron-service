export default {
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
      command: 'cd ../; rm -rf foobar',
      description: 'delete project',
    },
  ],
  drivers: {
    line: {
      data: {
        token: '',
      },
    },
  },
}