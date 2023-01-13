- `cronjob`, `crontab`
- [source](https://www.shellhacks.com/crontab-format-cron-job-examples-linux/) [source](https://docs.rockylinux.org/guides/automation/cronie/)
- if a cronjob is supposed to execute, but the system is turned off, the cronjob will be skipped
- `%` signs in cronjob definitions need to be escaped as `\%`

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


Example crontab entry:
```text
@reboot /home/n/dns.sh
```
- @daily and @reboot at the most useful
- see logs: `sudo cat /var/log/cron`

 