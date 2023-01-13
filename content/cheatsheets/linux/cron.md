# Introduction

- `cronjob`, `crontab`
- [source](https://www.shellhacks.com/crontab-format-cron-job-examples-linux/) [source](https://docs.rockylinux.org/guides/automation/cronie/)
- if a cronjob is supposed to execute, but the system is turned off, the cronjob will be skipped
- `%` signs in cronjob definitions need to be escaped as `\%`
- see logs: `sudo cat /var/log/cron`

# Installation

There are multiple implementations. Example using Cronie and Arch:

```sh
sudo pacman -S cronie
sudo systemctl enable --now cronie
```

# Jobs

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Edit crontabs||crontab -e
Show crontabs||crontab -l
Run crontab as another user||crontab -u

# Times

```text
.---------------- minute (0 - 59)
| .-------------- hour (0 - 23)
| | .------------ day of month (1 - 31)
| | | .---------- month (1 - 12) OR jan,feb,mar ...
| | | | .-------- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue ...
| | | | |
* * * * * command to be executed
```

- can give a single value `7`
- can work with multiple values `2,4,6`
- can work with a range `5-10`
- can work with modulo `*/5` = every 5 (unit of time)
- can combine the above two `3-12/3` = 3, 6, 9, 12
- there are many shortcuts. For example, `@daily` replaces `0 0 * * *`
- there is also `@reboot`


Example crontab entry:
```text
@reboot /home/n/dns.sh
```

 