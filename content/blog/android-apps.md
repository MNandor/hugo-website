---
title: "Android Apps"
date: 2023-02-03T04:19:15+02:00
---

In my [last blog post](../my-perfect-phone), I described the installation process of my new phone.
I am extremely happy with both the device and LineageOS.

However, LineageOS only ships a few bare essential apps, such as Calendar or Clock.
They do not have many features either.

This is a good thing.
I intentionally chose a non-bloated ROM so that I can configure it to my liking.

In this post, I'll detail all the choice I made in terms of apps to install.
I'll be mainly talking about apps that replace what'd come pre-installed on a traditional Android phone, since whether or not the user also needs Snapstagram is up to their preference.

Every app that links to F-Droid is open-source.
Just the nature of the platform.
In a few cases, I had to get the app from the Google Play Store, GitHub releases, or compile from source.
I'll mention when this is the case.

# System

## Terminal Emulator - [Termux](https://f-droid.org/packages/com.termux/)

As much as I don't like to use the term "must-have", Termux is definitely an essential tool for anyone looking to do advanced work with their phone.
It's a full-fledged Linux terminal on your phone.
Termux has its own package manager and repositories.
It lets me use my favorite Linux tools such as Vim or Taskwarrior.
I could also use my phone as a home server.

If I could only ever use one app, it'd be Termux, so I had to put it first in the list.

## File Syncing - [Syncthing](https://f-droid.org/en/packages/com.nutomic.syncthingandroid/)

I can't even to begin to explain how useful Syncthing is.
It's cloud storage without a cloud.
It's end-to-end encrypted real-time file syncing.

It runs in the background and it's an essential component of my workflow.
Camera folder immediately shared with my computer.
My music library updated whenever I make a change.
Files and documents, Taskwarrior data, all shared across devices.

Syncthing is awesome.
Once you get it, you won't understand how you used to live without it.

## App Store - [F-Droid](https://f-droid.org/)

Pretty standard for de-Googled phones, F-Droid is full of open-source apps.

## App Store - [Aurora Launcher](https://f-droid.org/en/packages/com.aurora.store/)

A nice little front-end to Google's Play Store.
Aurora allows for anonymous downloads for the occasional app that can't be found on F-Droid.

## Keyboard - [Hacker's Keyboard](https://f-droid.org/en/packages/org.pocketworkstation.pckeyboard/)

No longer actively developed, but still insanely useful.
I'm more than happy to let go of modern features like swipe-typing or prediction in exchange for real arrow keys and PC-like symbol buttons.

## Launcher - [Discreet Launcher](https://f-droid.org/en/packages/com.vincent_falzon.discreetlauncher/)


<!-- todo screendhot -->

I was mostly happy with Nova until now, but I decided to go with something open-source.
I tried out a few launchers.
I really liked the idea behind Last Launcher's word cloud.

In the end though, Discreet convinced me with its ability to not cover my wallpaper.
It also has great search functionality.
When I add apps to folders, they disappear from the main app drawer, which helps a lot with organization (a full list can still be searched through).

I [forked](https://github.com/MNandor/discreet-launcher) the Discreet Launcher repository for a grand total of one commit I wanted to reverse.
I wanted for the app search to work even if I don't start typing at the beginning of the app name.
For example, "loc" should be found in the app "Clock".


Alternatives:
- [Nova Launcher](https://play.google.com/store/apps/details?id=com.teslacoilsw.launcher) (closed source)
- [KISS Launcher](https://f-droid.org/en/packages/fr.neamar.kiss/)
- [Last Launcher](https://f-droid.org/en/packages/io.github.subhamtyagi.lastlauncher/)

### Icon Pack - [Arcticons](https://f-droid.org/en/packages/com.donnnno.arcticons/)

## Camera - [Open Camera](https://f-droid.org/en/packages/net.sourceforge.opencamera/)

I don't need my phone to apply all the latest AI enhancements to my photos.
I certainly don't want it to phone home to Google servers every time I take a picture.

Open Camera exposes all the configuration settings I could ever need.
I'm extremely happy with it.

## Browser - [Firefox](https://play.google.com/store/apps/details?id=org.mozilla.firefox)

The standard non-Chromium browser.

Alternatives:
- [DuckDuckGo](https://f-droid.org/en/packages/com.duckduckgo.mobile.android/)

## Music Player - [VLC](https://f-droid.org/en/packages/org.videolan.vlc/)

I put some actual effort into comparing music players.
I was actually reasonably happy with my former non-FOSS BlackPlayer.
I wanted something good to replace it.

Before I get into the comparison, I need to explain the structure of my music library.
- I have .mp3 files saved in one single folder, no subdirectories.
- They use ID3 tags.
- The artist field is set for all of them.
- The album field is set for some of them.
- The album art field is set for some of them, including some that do not have the album field set.

Below are a list of my requirements.
Notice that some of them I put there because I noticed that some of the apps were missing the feature.
I don't have "can play music" as a requirement, because *all* of them can, and it's not helpful for comparison.


| Requirement             | Explanation
|-------------------------|------------------------------------------------------------------------------------------------|
| FOSS                    | Free and open-source                                                                           |
| Truncated filenames     | Show "Never Gonna Give You Up.mp3" instead of "/home/n/Music_New/Never Gonna Give You Up.mp3"  |
| Correct individual art  | For files that do not have an album tag set, but still have an album art, display it correctly |
| Correct album art       | Same as above, except for files that do belong to an album                                     |
| Hide unknown albums     | In the albums view, do not show "Unknown Album" albums for files that are not tagged           |
| Easy shuffle all        | Ideally a FloatingActionButton near the bottom of the screen. Half a point if it's at the top. |
| Easy search             | Search for individual songs                                                                    |
| Easy play next          | Make a song be the next one to play. Half a point if this requires a long press.               |
| Skip track from library | Skip to previous/next song while browsing others songs                                         |
| Whitelist folder        | Do not index folders outside the ones set                                                      |
| Lock screen album Art   | Display album art on lock screen                                                               |
| Good main UI            | Subjective, do I like the design                                                               |

Here are my results after trying out all these apps.
Most of these apps were recommended to me on my [Mastodon](https://fosstodon.org/@MNandor).


| .                       | Stock | Vanilla | VLC | Auxio | Simple | BlackPlayer |
|-------------------------|-------|---------|-----|-------|--------|-------------|
| FOSS                    | ✓     | ✓       | ✓   | ✓     | ✓      |             |
| Truncated filenames     | ✓     | ✓       | ✓   | ✓     | ✓      | ✓           |
| Correct individual art  |       |         | ✓   |       |        |             |
| Correct album art       | ✓     | ✓       | ✓   | ✓     | ✓      | ✓           |
| Hide unknown albums     | ✓     | ✓       |     |       | ✓      | ✓           |
| Easy shuffle all        | .     | .       | ✓   | ✓     |        | ✓           |
| Easy search             |       | ✓       | ✓   | ✓     | ✓      | ✓           |
| Easy play next          | ✓     | .       | ✓   | ✓     |        | ✓           |
| Skip track from library |       |         | ✓   | ✓     |        | ✓           |
| Whitelist folder        |       | ✓       | ✓   | ✓     |        | ✓           |
| Lock screen album Art   | ✓     | ✓       | ✓   | ✓     | ✓      | ✓           |
| Good main UI            | ✓     | ✓       | ✓   | ✓     | ✓      | ✓           |

VLC and Auxio both filled the Albums screen with a bunch of unlabeled albums.
For example, if I had a .mp3 file tagged with "Rick Astley" as an artist, but not tagged by any album, then Auxio would display a 1-song album with its name being the name of the folder I keep the music on.
VLC would do the same, except label it as Unknown Albums.
Both would display one of these albums for each unique artist.


However, they met every other expectation.
What set VLC apart is displaying the correct art even for the songs that didn't belong to any album.
This was a feature that was missing even in BlackPlayer, so I decided to go with VLC.


Alternatives:
- [BlackPlayer](https://play.google.com/store/apps/details?id=com.musicplayer.blackplayerfree) (closed source)
- [Vanilla Music](https://f-droid.org/de/packages/ch.blinkenlights.android.vanilla/)
- [Auxio](https://f-droid.org/en/packages/org.oxycblt.auxio/)
- [Simple Music Player](https://f-droid.org/en/packages/com.simplemobiletools.musicplayer/)


## File Manager - [Amaze](https://f-droid.org/en/packages/com.amaze.filemanager/)

A great file manager with multi-select, root mode, shortcuts to folders, and two tabs to move between.

## Gallery - [Simple Gallery Pro](https://f-droid.org/en/packages/com.simplemobiletools.gallery.pro/)

The team behind these "simple" apps does a great job at offering a coherent, non-bloated set of applications.
For my gallery app, I decided to go with what they offer.

## Youtube Client - [NewPipe](https://f-droid.org/en/packages/org.schabi.newpipe/)

Though a Google product, I can't deny that YouTube is useful.
Obviously I'm not going to use the first-party app, so my options are NewPipe or some fork of Vanced.
I've always been on Team NewPipe.

<!-- todo optional apps -->

# Conclusion

For things I didn't mention, such as Calendar, Clock, or Calculator (and anything else that doesn't start with a C), I just went with the default option.
Overall, I'm pretty happy with my new setup.

