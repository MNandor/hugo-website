---
title: "Cron"
date: 2023-01-05T22:12:48+02:00
progress: done
---- `cronjob`, `crontab`
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

{{% raw %}}<style> table td:nth-child(2), table td:nth-child(5), table th:nth-child(2), table th:nth-child(5){ display: none; } table td:nth-child(1) { width: 150px; } table td:nth-child(3) { font-size: 1.5em; font-family: monospace; text-decoration: overline 1px green; color: green; } table td:nth-child(4), table td:nth-child(1){ width: 250px; } table td:nth-child(3){ width: 50%; } /* disable joplin's default huge padding */ th, td, tr { padding: 4px !important; } </style> {{% / raw %}} 
