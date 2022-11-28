---
title: "Git"
date: 2022-09-25T15:10:49+03:00
progress: progress
---


{{% floatleft torvalds %}}

## What is Git?

- made by Linus Torvalds
- to manage the Linux kernel
- distributed, non-linear workflows
- free/open-source
- network/server not required


## Graphical Clients

- frontend to git commands
- provide some helpful visualizations
- I recommend learning the commands themselves

{{< figure src="/img/sourcetree.png" title="Sourcetree" link="https://sourcetreeapp.com" class="guiclient">}}

{{< figure src="/img/github.png" title="Github Desktop" link="https://desktop.github.com" class="guiclient">}}

{{< figure src="/img/gitkraken.png" title="GitKraken" link="https://www.gitkraken.com/" class="guiclient">}}

{{< figure src="/img/gitgui.png" title="Git GUI" link="https://git-scm.com" class="guiclient">}}


{{% / floatleft %}}

My notes contain Markdown/HTML tables in this format.
This is to make it easy to export them. See [J2A](https://github.com/MNandor/joplin-to-anki).

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Start git repo||git init||

# Commits

asd --asd-- ddd

{{% floatleft commit %}}

## What's a commit?

- one "version" of the code
- standard unit of a git repository
- contains a list of changes
- references previous commit
- one link in a linked list
- information about commit author
- commit message
- defined by a unique commit hash

{{% / floatleft %}}

## Staging

To prepare a changed, added, or removed (see below) file for a commit, it needs to be added to an in-between placed called the {{< ul >}}staging area{{< / ul >}}.

Some commands take the option `--cached` or `--staged` to interact with the staging area. This is not consistent between commands.

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Stage changed file||git add filename||
Stage all files in this folder and subfolders||git add .<br>git add &ast;||
Stage a "hunk" of code from the terminal||git add -p filename<br>git add \--patch filename|
&nbsp;|
Delete a file from disk and staging area||git rm filename|Also works on already deleted files
Delete a file staging area but not disk||git rm \--cached filename|Also works on already deleted files

## Committing

Committing is the act of recording the changes in the staging area into a commit.

For the commit message, the convention is to write it as an imperative. For example, "This commit will {{< ul >}}Implement image loading API{{< / ul >}}".

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Create commit||git commit -m "Message"<br>git commit --message "Message"||
Amend last commit||git commit --amend||
Auto stage all modified and deleted files (but not new ones) while committing||git commit -a<br>git commit --all

{{< figure src="/img/gitareas1.png" width="100%" >}}

# Undo


## Resets
Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Load staged version of file to disk||git restore filename<br>git checkout filename
Unstage a file||git reset filename<br>git restore --staged filename||
Revert a commit by making a new commit with opposite changes||git revert commithash
&nbsp;|
Revert *everything* to last commit||git reset --hard||
Unstage everything, but keep files as they are currently||git reset --mixed<br>git reset||
Mark a commit as last but don't change files or staging area||git reset --soft
Undo the action of "git commit"||git reset --soft HEAD~1|
&nbsp;|
&nbsp;|
Stage file that's in .gitignore||git add -f filename

<!-- j2aref Difference between git reset<br>--soft, --mixed, --hard? -->
<!-- j2aref What does git revert do? -->





# Info

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Show commit history||git log||
Show git history with diff||git log -p||
Show git history that's relevant to a file||git log -- filename||
Show git history filtered by regex in added lines||git log -S text
Show git history filtered by regex in commit message||git log --grep="text"
&nbsp;|
Show history, concisely||git log --oneline||
Display cool git tree?||git log --graph --oneline||gla
&nbsp;|
Show diff of an individual commit?||git show commithash||
Show diff of a commit on a file||git show commithash filename
Show content of a file as of a commit||git show commithash:filename||
Show content of file in staging area||git show :filename
&nbsp;|
Line-by-line, figure out which commit wrote file?||git blame filename<br>git annotate filename||
Git blame, ignoring whitespace||git blame -w filename
&nbsp;|
Show changes to non-staged files only||git diff||
Show changes to staged files only||git diff --cached||
Show changes between files on drive and last commit||git diff HEAD||
Show difference between two commits||git diff commithash1 commithash2||

<!-- j2aref Git show variants -->
<!-- j2aref Git regex -->


<!-- j2aref True/False: Git amend safely deletes previous version of commit? -->

# Branches

## Branch Management

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
List all branches||git branch
List all branches, local and remote||git branch -av||
Switch to a different branch||git checkout name||
Undo last branch switch, go back to where you were||git checkout -||
&nbsp;|
Create branch||git branch branchname||
Delete branch||git branch -d branchname|-D is the same|
Rename current branch||git branch -m branchname|-M is the same|
&nbsp;|


## Remotes

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Download remote repo||git clone url||
Clone a remote repo's specific branch||git clone url -b branchname
Checkout a remote branch in an existing local repo||git checkout --track -b branchname origin/branchname
&nbsp;|
Download changes from remote||git fetch
Update current branch with what's on remote||git pull|Implicitly fetches
Put local changes on remote||git push|
&nbsp;|
Change remote url?||git remote set-url origin url||

<!-- j2aref Difference between fetch and pull? -->

## Sparse Checkout

```
git init
git remote add -f origin $url

git config core.sparseCheckout true

echo "some/dir/" >> .git/info/sparse-checkout
echo "another/sub/tree" >> .git/info/sparse-checkout

git pull origin master
```

[source](https://stackoverflow.com/questions/600079/how-do-i-clone-a-subdirectory-only-of-a-git-repository)

# Merge & Rebase

## Basic
Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Merge branch B into current branch||git merge B||
Rebase develop to come after master||git rebase master develop|Handles cherry-picks well


## Interactive Rebase

Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Change commit messages in the past?||git rebase -i HEAD~5|5 to change 5 commits<br>Change "pick" to "reword" in vim|
How to reorder commits?||git rebase -i commithash|Just reorder them in the text file|
Rebase starting with initial commit||git rebase -i --root
Change commit author of all past commits||git rebase --root --exec 'git commit --amend --no-edit --reset-author'|This uses the default author from config

# Tricks

## Stash
Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
Create git stash||git stash name|name is optional|
Stash including untracked files||git stash -u|name is optional|
Get from git stash?||git stash pop||

## Other
Front|Hotkey|Command|Notes|Perskey
-|-|-|-|-
How to see orphaned commits?||git reflog --all|Optionally, &#124; grep reset|
Binary search which commit introduced a bug?<br>(manually test each version)||git bisect good commithash<br>git bisect bad|Repeat good/bad|
Show all current configuration?||git config -l||
How to ignore a file that's already added to index?||git update-index --assume-unchanged filename|To undo: git update-index --no-assume-unchanged<br>alias: ignore/unignore

## Hooks

- to create a hook, go to `.git/hooks`
- edit the file, `chmod 755`, and remove the `.sample` part
- for commits, try `pre-commit`
- if it exists with error (bash: `exit 1`), the commit is prevented
- [source](https://githooks.com/)
- run `git commit --no-verify` to skip the hook
- to include the hook in the repo: [source](https://stackoverflow.com/questions/3462955/putting-git-hooks-into-a-repository)

## Config
- `git config --global`, then set these
- aliases: `git config --global alias.ignore "update-index --assume-unchanged"`

```
user.name=MNandor
user.email=mnandor@users.noreply.github.com
credential.helper=store
init.defaultbranch=master
pull.rebase=true
```

# Annex

- to start, `git init` and `git annex init Name` in this order
	- skipping name creates an empty name
- `git annex add file`
	- this moves the files to the objects folder
	- creates the symlinks
	- also adds the symlinks to normal git
	- does not annex small files
		- this is particularly sensible with a .gitignore file
- `git commit -m "msg"
	- regular git manages the symlinks
- `git remote add org ../org`
	- can also with with ssh
- `git annex sync`
	- this updates the symlinks
	- new symlinks pulled this way will naturally be broken
	- pulls info only, does not push
- `git annex sync --content`
	- gets files as well as content
- moving/renaming files works without issues
	- `git add .` and commit as normal
- `git annex drop`
	- deletes the file content to save space
	- does not remove the symlink
	- checks to verify that at least one copy remains, does not let you drop the last one
	- for your own good, the object files require sudo to delete
- `git annex move -f org file` `git annex move -t org file`
	- -f and -t are --from and --to respectively
	- does what you expect, moves content but not symlinks
	- `copy` also works as expected
- `git annex whereis file`
	- you're not gonna believe what this command does!
- `git annex get file`
	- basically a copy with an auto -f (likely using whereis)
- `git annex fsck`
	- check files using checksums
	- yep.
- `git annex unannex` 
	- to turn into a normal file
	- it's a copy, not a move - todo find a better solution
	- use `git annex unannex --fast` instead


{{< raw >}}
<style>
	table td:nth-child(2), table td:nth-child(5),
	table th:nth-child(2), table th:nth-child(5){
		display: none;
	}
	
	
	table td:nth-child(3) {
		font-size: 1.5em;
		font-family: monospace;
		text-decoration: overline 1px yellow;
		color: yellow;
		
	}
	.guiclient {
		display: inline-block;
		width: 24%;
		margin: 0px;
	}
	figcaption h4 {
		text-align: center;
		margin-left: 0px;
		margin-top: 0px;
	}

@media print {
	table td:nth-child(3) { color: black; }
}

</style>
{{< / raw >}}

{{% mnemonic `@ a - @:a` %}}

`@ a` displays the changes made to the file `a` in commit `@`.

`@:a` displays the content of `a` "as of" commit `@`.
{{% / mnemonic %}}
Take individual commit from elsewhere||git cherry-pick commithash|This creates a different commit with identical changes|
