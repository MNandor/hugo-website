# Cron

- `cronjob`, `crontab`

## Installation

There are multiple implementations. Example using Cronie and Arch:

```sh
sudo pacman -S cronie
sudo systemctl enable --now cronie
```

## Jobs

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Edit crontabs||crontab -e
Show crontabs||crontab -l


Example crontab entry:
```
@reboot /home/n/dns.sh
```
- @daily and @reboot at the most useful
- see logs: `sudo cat /var/log/cron`