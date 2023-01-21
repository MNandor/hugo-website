---
title: "Xargs"
date: 2023-01-21T23:34:46+02:00
progress: done
---

# Introduction
- [source](https://www.youtube.com/watch?v=rp7jLi_kgPg)
- allows for piping to the command arguments
	- essentially converts stdin to command line call
	- as with all stdin programs, if you don't pipe another command into it, input is read from the terminal
- `command1 | xargs command2`
- particularly useful for calling programs with the output of `dmenu`


# Separation
- by default, xargs collects all of stdin and executes the command once
- this can be changed to run the command every X lines or space-separated words
- a custom delimiter can also be given

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Run xargs command after every line of input||xargs -L 1 figlet
Run xargs command after every word of input||xargs -n 1 figlet
Run xargs command separated by 'w'||xargs -n 1 -d w figlet|Delimiter

# Options 
- `xargs -t` to also print the command being ran
- `xargs -r` to only run if stdin is not empty
- `xargs -p` to prompt

# Substitution
- if the command is not specified, it's `echo`
- the argument(s) are appended at the end by default
- `-I` implies `-L1`

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Run xargs using substitution for the argument||xargs -I {} figlet a {} b
Run multiple commands in an xargs call||xargs -I {} sh -c "figlet {} && echo {}"


<style> table td:nth-child(2), table td:nth-child(5), table th:nth-child(2), table th:nth-child(5){ display: none; } table td:nth-child(1) { width: 150px; } table td:nth-child(3) { font-size: 1.5em; font-family: monospace; text-decoration: overline 1px green; color: green; } table td:nth-child(4), table td:nth-child(1){ width: 250px; } table td:nth-child(3){ width: 50%; } /* disable joplin's default huge padding */ th, td, tr { padding: 4px !important; } </style> 
 
