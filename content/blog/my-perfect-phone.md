---
title: "My Perfect Phone"
date: 2023-02-01T02:07:03+02:00
---

I try to not rely on my phone too much.
I don't think everything should be an app, and I'd rather not have daddy Google track every step I take.
There's some irony to it - Android development is literally my profession - but maybe that's exactly why I try to separate work from personal use.

As a Linux user, I'm used to a customizable system made of open-source components.
Android is definitely better than its main competitor, iOS in this regard.
However, it still doesn't compete with a real Linux distro.

Most manufacturers lock down the bootloaders of their devices.
They also pre-install unnecessary apps - commonly referred to as bloatware.
The user is not even given root (administrator) access by default.

Even though I've been very happy with my phone compared to the competition, I've decided not to spend money on a device I do not truly own due to the restrictions of its operating system.
I wouldn't buy MacBook for the same reason.

This is where custom ROMs come in.
Android does actually exist as an open-source project (AOSP).
Projects based on AOSP can be installed on phones, offering a relatively de-Googled experience.

# Hardware

When it comes to selecting hardware, [GSMArena](https://www.gsmarena.com/)'s search and compare tools are invaluable.
It even offers camera comparisons.

Controversial statement:
I don't think a **headphone jack** is an optional feature.
The only thing worse than Apple and Samsung trying to sell incomplete phones is the fact that people buy them.

In terms of a **camera**, just give me a good main camera and perhaps an ultrawide.
Telephoto lens are alright, but how much extra functionality do they bring to a non-professional user compared to cropping in with the main sensor?
2MP macro cameras are obviously a joke.

An **OLED screen** is also a requirement.
I use my phone in the dark quite a bit, and I want those pitch blacks.
I am however more than happy the "standard" 1080p 60Hz.

I also want a slot for a **microSD card**.
Just like with a headphone jack, even if I don't need it right away, why would I pay for a device with fewer features?

Other than that, the bigger the **battery**, the better.
Fast charging is also welcome.

I'd love to have a small, compact phone.

Perhaps most important though, the device needs to have the support of at least one custom ROM.
This is actually my reason for leaving my previous phone, the Samsung Note 10 Lite - one of the last devices from an era of headphone jacks, microSD card slots, but also OLED screens.

## Google Pixel 4a

The Pixel4a is a tiny device with a decent camera (the performance of which can be attributed to Google software though).
It boasts a headphone jack, a physical **fingerprint sensor**, and an OLED screen.

It does not have expandable storage.

It's also supported by GrapheneOS and CalyxOS (see below).


## Asus Zenfone 8

The Zenfone is slightly more expensive, slightly larger, and significantly more powerful with an AnTuTU benchmark score 2.5 times that of the Pixel.
It's a bit bigger in size, but that comes with a larger battery and a 120Hz screen.

It has an IP68 dust/water resistance rating, which certainly nice.

Compared to the Pixel, the Zenfone has a higher-megapixel (not necessarily better) main camera and an additional ultrawide.

Sadly, expandable storage is missing here too, but I decided to accept that compromise at this point.
However, it does have 256GB storage models, while the Pixel only offers 128GB.

The Zenfone 8 is supported by LineageOS, and /e/OS.

---

I bought a Zenfone 8 256GB.

# ROM

Custom {{% abbr "Read Only Memory" %}}ROM{{% / abbr %}}s are essentially builds of Android available for installation.
They're the equivalent of Linux distros.

## GrapheneOS

GrapheneOS is a ROM focused on privacy and security.
It's designed for the Pixel series is phones, because though they're not big on privacy, Google's security is actually pretty good.

## CalyxOS

Very similar to Graphene, Calyx is privacy-focused and aimed at Pixel devices.

## /e/OS

The ROM with a name impossible to find in any search engine, /e/OS is a fork of LineageOS with some added features.
They aim to replace the Google ecosystem with their own Murena cloud.

They also package microG, which is a set of libraries intended to emulate Google's services for apps that rely on them.

## LineageOS

You might have noticed a pattern where my final choice is the last one I talk about.
LineageOS is much like Arch Linux - simple, customizable, doesn't offer anything but the bare minimum to build a system on top of.

Just the way I like it.

Lineage does have forks that package microG, but I decided that if I'm going to de-Google, I might as well go all the way and get vanilla Lineage.

# Recovery

A recovery is bootable software on the phone outside of Android.
It's typically used for basic maintenance tasks such as factory-resetting the device.
<!-- todo post screenshots vs default -->

## Stock

Phones come with some sort of recovery built-in.
This will be replaced in the {{% abbr "installation" %}}flashing{{% / abbr %}} process.

## LineageOS

LineageOS offers its own recovery.
It highly recommends sticking to it and does not guarantee to work with alternatives.

## TWRP

{{% abbr "Team Win Recovery Project" %}}TWRP{{% / abbr %}} is pretty much universally considered the standard recovery and "the good one".
It offers some great features, such as backups and even a functional terminal.

I actually had an easier time following TWRP's instructions than Lineage's own when setting the recovery up.

# Flashing

## ADB & Fastboot
{{% abbr "Android Debug Bridge" %}}ADB{{% / abbr %}} and fastboot are two essential programs used in the process of setting up a custom ROM.
If you would like to follow along, please set them up on your desktop operating system of choice.

Also have a USB cable to connect your phone.

This is a good point to make sure your device is connected and shows up:

```sh
adb devices
sudo fastboot devices
```

## Unlock Bootloader

Most phones typically come with the bootloader locked, meaning they won't just let us install whatever we want.
Unlocking the bootloader typically involves wiping the phone's memory clean.
This shouldn't be an issue with a new device though.

Locked Bootloaders are actually a non-useless security feature.
Keep in mind though that LineageOS comes with encrypted storage, so we won't necessarily leave our phone vulnerable even if we leave the bootloader unlocked.
Re-locking it is possible, but it's generally not considered to be worth it.

Asus does offer an app to unlock the Zenfone 8.

I simply downloaded it and installed using the command:

```sh
adb install AsusUnlock_1.0.0.7_210127_fulldpi.apk
```

## Additional Partitions

At this point, I'm following LineageOS' [instructions](https://wiki.lineageos.org/devices/sake/install) to my device.

It's good to note that `adb reboot` and `adb reboot -p` can be used to reboot or shut down a device respectively, even if it's stuck booting.

The instructions call for the installation of a downloaded image file using the command:

```sh
fastboot flash vendor_boot <vendor_boot>.img
```

## Flash TWRP

This is where I deviated from Lineage's instructions and installed TWRP as opposed to Lineage's recovery.

TWRP's [manual](https://twrp.me/asus/zenfone8.html) recommends live-booting TWRP:

```sh
adb reboot bootloader
sudo fastboot boot twrp-3.7.0_12-0-I006D.img
```

At this point, I could navigate TWRP's menu on my phone and flash it persistently.

## Flash Lineage

TWRP made flashing LineageOS really easy.
The solution I went with is to save the .zip file to the phone, then use TWRP's menu to flash it. ADB can be used to transfer files:

```sh
adb push lineage-19.1-20230127-nightly-sake-signed.zip /sdcard
```

## Root

I definitely wanted to root my device.
The standard tool for this is [Magisk](https://github.com/topjohnwu/Magisk).
I found some contradicting instructions for rooting with Magisk, but the actual solution was very simple:

1. download Magisk.apk
2. rename to Magisk.zip
3. boot into TWRP
4. flash Magisk.zip

<!-- ## Xposed -->

# Conclusion

That's pretty much it!
I'm extremely happy with the result.
I've gone through configuring LineageOS to my liking.

I will soon have a new blog post about the apps I decided to install.
<!-- todo -->
