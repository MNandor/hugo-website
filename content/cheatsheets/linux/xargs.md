---
title: "Xargs"
date: 2023-01-21T23:34:46+02:00
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
- this can be changed to run the command every X lines or space-separated words

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



 
