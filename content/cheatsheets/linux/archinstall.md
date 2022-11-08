---
title: "Archinstall"
date: 2022-09-25T15:14:28+03:00
---

Arch Linux is a Linux {{< abbr `distribution`>}}distro{{< / abbr >}} that's *relatively* hard to install.
While guided installers do exist, part of an Arch user's pride comes from going through the process manually.
It's actually not difficult at all - running a list on commands in the right order with occasional decisionmaking woven in - but it is a great learning opportunity.

This guide is based on my personal notes.
Parts not relevant to me, such as a non-English keyboard layout it omitted because I never needed it.
The preparation section assumes you already have a Linux machine (such as Ubuntu or Mint), since it's generally not recommended to use Arch as your first distro.

## Sources

- [Arch Wiki Page](https://wiki.archlinux.org/title/Installation_guide)
- [DistroTube Video](https://www.youtube.com/watch?v=PQgyW10xD8s)
- [EF Video About LUKS](https://www.youtube.com/watch?v=XNJ4oKla8B0)
- [Dan Henry Video About XFCE4](https://www.youtube.com/watch?v=FfGzL9zhPoU)

# Get The Disk Image

Unless you're installing Arch in a {{< abbr `Virtual Machine`>}}VM{{< / abbr >}}, you're going to need a USB flash drive.
This is fairly normal for all Linux distros.
Keep in mind that all data on the flash drive will be wiped.
All data on the computer you're installing on will likely also be wiped - so **take backups**.

The `.iso` file is a disk image. It's the standard way of of distributing Linux.

To get the Arch iso, go to:

[https://archlinux.org/download/](https://archlinux.org/download/)

## Verify The Iso

The iso file is cryptographically signed so you can make sure you didn't get a copy that has been tampered with.
Find the downloaded file and look at its sha256 hash, making sure it matches the one displayed on the website.

```bash
sha256sum archlinux-2022.10.01-x86_64.iso
```

(todo pgp)

## Create a Boot Drive

Insert your flash drive and find its name using the following command (its size will show up):

```bash
lsblk
```

**This is the part where you can accidentally wipe your system.**
Make sure that you're using the correct device (for example, `/dev/sda`).

Once you're certain, write the disk image to the flash drive:

```bash
su
cat archlinux-2022.10.01-x86_64.iso > /dev/sda
exit
```

# First Steps

## BIOS

When booting your computer, open your BIOS by holding or spamming the `F2`, `F10`, `F12`, and/or `Delete` keys (depends on manufacturer).

Then, find a setting called {{< ul >}}Secure Boot{{< / ul >}} and turn it off.
"Secure", in this case, means "whatever Microsoft wants".

After that, you can select your flash drive as the boot device.

## EFI Check

Once you're in the Arch installer, make sure you're in EFI mode. Run the following commands:

```bash
modprobe efivarfs
ls /sys/firmware/efi/efivars
```

The former should have no output, the latter should list a bunch of files. If you run into errors here, installing `grub` will require a workaround. VMs can enable EFI mode in the settings.

## Internet

VM users and those with a wired connection can skip this.

Running `ip link` should show an interface.

If it does, run the following commands, replacing `device` and `SSID` with their proper names:

```bash
iwctl
device list
station device scan
station device get-networks
station device connect SSID
exit
```

If needed, also run:

```bash
dhcpcd
```

To verify your connection, simply run `ping example.com`.

## Setup Mirrors

A mirror is a server with Arch's package repository, except somewhere else.
Use Reflector to get the nearest mirrors.

```bash
timedatectl set-ntp true
sudo pacman -Syy reflector
reflector -c Romania -a 6 --sort rate --save /etc/pacman.d/mirrorlist
pacman -Syyy
```


# Hard Drive

## Partitions

# Installation

# Inside Chroot

# Graphical Environment
