---
title: "Archinstall"
date: 2022-09-25T15:14:28+03:00
progress: done
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

Use `lsblk` and find the drive. It's usually `sda` or `nvme0n1`.
As a shorthand, I will run `drive="sda"` so I can reference the drive name easier.

Use `gdisk` or an alternative to create partitions:

```bash
gdisk /dev/$drive
```

I personally don't make separate home or swap partitions. Here's how to make a boot and a main:

- press `n` `␣` `␣` `+200M` `ef00` to create a 200MB boot partition
- press `n` `␣` `␣` `␣` `␣` to use the rest of the drive as storage
- press `w` to save changes and exit

I will run `part=sda2` and `partefi=sda1` to easily refer to these partitions.
If your setup differs, use the proper partition labels.

## Encryption

Encrypting your partition makes it so you have to give a password on boot, otherwise your data is inaccessible.
Technically, there is some performance drawback to this, but to me it's not noticeable.

You probably don't need encryption in a VM except for practice.
You might not need encryption in a desktop PC either.

```bash
cryptsetup -y -v luksFormat /dev/$part
cryptsetup open /dev/$part cryptroot
```

Since we want to install *inside* the encrypted partition, we need to update our shorthand with `part="mapper/cryptroot"`.

## Filesystems

Fairly easy.
Create the file systems for the two partitions.

```bash
mkfs.ext4 /dev/$part
mkfs.fat -F32 /dev/$partefi
```

## Mounting

We need to have the partitions mounted for the install process.
The efi partition gets mounted inside the main one.

```bash
mount /dev/$part /mnt`
mkdir /mnt/boot`
mount /dev/$partefi /mnt/boot`
```


# Installation

## Pacstrap

The command `pacstrap` is used to install Arch packages into a different root directory.
You can think the Arch iso as its own Arch system that installs a second Arch into the partitions newly created.

```bash
pacstrap /mnt base linux linux-firmware base-devel vim
```

Optionally, also install `amd-ucode` or `intel-ucode`.

## Fstab

Save the File System Table to a file:

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

## Chroot

Change Root into the new Arch system to operate from there:

```bash
arch-chroot /mnt
```

# Inside Chroot

## Swapfile

We didn't create a swap partitions, but we can create a swap file.
A swap file is a section on your hard drive that's used when the RAM is full.
It's also useful for hybernation.
It's optional and its usefulness depends on your system.

```bash
fallocate -l 16GB /swapfile`
chmod 600 /swapfile`
mkswap /swapfile`
swapon /swapfile`
```

Use your favorite terminal-based text editor (mine is vim) to add this line:

`vim /etc/fstab`
```text
/swapfile none swap defaults 0 0`
```

## Time

Select your timezone and save it:

```bash
ln -sf /usr/share/zoneinfo/Europe/Bucharest /etc/localtime`
hwclock --systohc`
```

## Locale

First, uncomment the following line:

`vim /etc/locale.gen`
```text
en_US.UTF-8
```

Run this command:

```bash
locale-gen
```

And one last file to edit:

`vim /etc/locale.conf`
```text
LANG=en_US.UTF-8`
```

## Hostname

Time to name your computer.
This name will be visible to networks you connect to.

`vim /etc/hostname`
```text
n-archlaptop
```

A bit more editing to do:

`vim /etc/hosts`
```text
127.0.0.1	localhost
::1	localhost
127.0.1.1	n-archlaptop.localdomain	n-archlaptop
```

## Pacman

Pacman is Arch's package manager.
Get some more programs we didn't pacstrap earlier:

```bash
pacman -S sudo grub efibootmgr networkmanager dosfstools os-prober mtools git openssh stow
```


## Users

You are currently the `root` account. Set a password:

```bash
passwd
```

I will set up one user with sudo rights named `n`.

```bash
useradd -m n
passwd n
usermod -aG wheel,audio,video,optical,storage n`
```

Exclude the `wheel` group to make a non-sudo user.
Adding more users follows the same process.

## Sudo

Running a program with `sudo` essentially gives administrator rights. Uncomment the following line:

`EDITOR=vim visudo`

```text
%wheel ALL=(ALL) ALL
```

There is also a variant of the line that allows for running sudo without even requiring a password, but I recommend this one.

## Decryption

Skip this if you skipped encryption.

To automatically decrypt our drive, we need to add `encrypt` to out boot hooks.
Here's the sample line:

`vim /etc/mkinitcpio.conf`

```text
HOOKS=(base udev autodetect keyboard keymap modconf block encrypt filesystems keyboard fsck)
```

To apply these changes, run:

```bash
mkinitcpio -p linux
```

## Grub

Install the bootloader using these commands:

```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

## Decryption With Grub

With Grub installed, we need to come back to decryption for a moment and add the driver's unique ID to the Grub config:

`vim /etc/default/grub`
```text
GRUB_CMDLINE_LINUX="cryptdevice=UUID=f5...c7:cryptroot root=/dev/mapper/cryptroot"
```

Replace the `f5...c7` part with the actual ID as given by `blkid`. 

Pro tip: it's hard to copy-paste without a graphical environment. Try `:r !blkid` inside vim instead.

Just for good measure, update the Grub config:

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

# Graphical Environment

Good news!
You have a functional Arch system.
Of course, in its current state it'll only boot into a {{< abbr `non-graphical terminal`>}}tty{{< / abbr >}}

We have options here.

I recommend {{< ul >}}xfce{{< / ul >}} as a lightweight desktop environment.

I personally use just xfce's terminal along with {{< ul >}}Qtile{{< / ul >}} as my window manager.

We can also use Wayland instead of Xorg, but I'm personally happy with Xorg.

Install your software of choice using pacman:

```bash
sudo pacman -S xorg lightdm lightdm-gtk-greeter qtile xfce4-terminal
```

```bash
sudo pacman -S xorg lightdm lightdm-gtk-greeter xfce4 xfce4-goodies
```

## Systemctl

SystemD is the init system of Arch.
Let's enable some daemons so we have graphics and internet:

```bash
sudo systemctl enable lightdm
sudo systemctl enable NetworkManager
```

## Virtualbox

If using a Virtualbox VM, these can also be useful:

```bash
sudo pacman -S virtualbox-guest-utils
sudo systemctl enable vboxservice.service
```


## Other

If using bluetooth headphones, try the following setup:

```bash
pacman -S bluez bluez-utils pulseaudio-bluetooth
systemctl enable bluetooth
```

Otherwise, just install either `pipewire` or `pulseaudio`.
```bash
pacman -S pipewire
```

## Reboot

We're done!
Exit the installation environment, unplug the flash drive, and boot into the new system:

```bash
exit
umount -l /mnt
reboot
```
