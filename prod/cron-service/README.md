# Cron Service

> Easy to maintain multiple cron job, and auto send job execute log.

## Feature

- Allow multiple cron job
- Allow multiple notify drivers(email, line) 

## Dependencies

- [cron](https://github.com/kelektiv/node-cron)
- [shelljs](https://github.com/shelljs/shelljs)
- [moment](https://github.com/moment/moment) 
- [axios](https://github.com/axios/axios)
- [nodemailer](https://github.com/nodemailer/nodemailer)

## Installation

**Clone project**

```bash
yarn global add cron-service
```

## Start service

```bash
cron-service --config=/file-to-your/config.json
```

## Configuration

**Main**

- jobs: Setup cron job.
- notifyDrivers: Setup notify driver (configuration see below).

**job item**

- name(required): String, name of job item.
- runAtStart(optional): Boolean, job will run after service launch if this property is true (default value is false).
- schedule(required): String/Array, schedule rule like cron job(to setup multi schedule you can pass array value), see more rule in [cron](https://github.com/kelektiv/node-cron).
- commands(required): Array, **CommandItem** array (**CommandItem** configuration see below).
- notify(optional): Array, setup drivers which you wanna notify.

```json
{
  "someCronJob": {
    "name": "Some Cron Job",
    "runAtStart": true,
    "schedule": "*/60 * * * * *",
    "commands": [
      CommandItem,
      CommandItem,
      CommandItem,
    ],
    "notify": ["line", "email"]
  }
}
```

**CommandItem**

- command: Command which you wanna execute.
- description(required): String, this description will display in execute notify content.
- cwd(optional): String, Path where command to execute.

```json
{
  "command": "git clone https://foobar.com.git; cd foobar",
  "description": "Clone some repo.",
  "cwd": "/home/project/"
}
```

**Example**

```json
{
  "jobs": {
    "someCronJob": {
      "name": "Some Cron Job",
      "runAtStart": true,
      "schedule": "*/60 * * * * *",
      "commands": [
        {
          "command": "rm -rf foobar",
          "description": "remove folder"
        },
        {
          "command": "git clone git@github.com:rtyley/small-test-repo.git foobar; pwd; ls",
          "description": "clone project"
        },
        {
          "command": "cd foobar; ls",
          "description": "go into project"
        },
        {
          "command": "rm -rf foobar",
          "description": "delete project"
        }
      ],
      "notify": ["line", "email"]
    }
  },
  "notifyDrivers": {
    "line": {
      "token": "lineApiToken"
    },
    "email": {
      "transporter": {
        "port": 587,
        "host": "smtp.gmail.com",
        "username": "foo@bar.com",
        "password": "password"
      },
      "send": {
        "from": "foo@bar.com",
        "to": "target1@foobar.com,target2@foobar.com"
      }
    }
  }
}
```

## Notify Drivers

### Email

- transporter: Object, mail configuration.
- send: 
  - from: String, from mail.
  - to: String, one or more receiver.

```json
{
  "notifyDrivers": {
    "email": {
      "transporter": {
        "port": 587,
        "host": "smtp.gmail.com",
        "username": "foo@bar.com",
        "password": "password"
      },
      "send": {
        "from": "foo@bar.com",
        "to": "target1@foobar.com,target2@foobar.com"
      }
    }
  }
}
```

### Line

> Line is a popular chat application in asia which like WhatsApp in west countries.

To create access token see [offical documentation](https://notify-bot.line.me/doc/en/)

- token: String, access token of line notify api.

```json
{
  "notifyDrivers": {
    "line": {
      "token": "lineApiToken"
    }
  }
}
```