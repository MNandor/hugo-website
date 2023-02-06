---
title: "How to Create Your Website for Free"
date: 2022-11-10T11:37:29+02:00
---

There can be many good reasons to create a website.
It can act as a professional portfolio, inform visitors about an event, host a comic series, or any of the other endless possibilities.

Though much of the modern web is bloated with tracking and cookie popups, it doesn't have to be this way.
There is still a place for simple, functional websites.

This blog post will detail how I created [my own website](https://nandor.ml).
The best part about it?
It's completely free!

# Static Site - Hugo

A static website is essentially a website that's readable.
It doesn't require a login, doesn't manage a database, and serves the same content rather than dynamically adjusting it to the visitor.

It's simpler.

There's an even simpler alternative to what I'm presenting here called [Gemini](http://geminiquickst.art/), but for now let's go with the widespread World Wide Web variant.
Say that three times in a row.

## Hugo

Hugo is a static site generator.
Once set up, it converts source files in the easily-writable Markdown format into HTML pages.
[Luke Smith's Guide](https://www.youtube.com/watch?v=ZFL09qhKi5I) on Hugo is extremely helpful for a beginner.
My own website's [source](https://github.com/MNandor/hugo-website) is also written in the Hugo framework.

After running the `hugo new site` command and configuring the website either following a tutorial or the [docs](https://gohugo.io/documentation/), running `hugo` will generate a static HTML website in the `public` subdirectory. We can simply host this directory on the web.

Pro tip: `hugo serve --noHTTPCache` is great for development as it automatically refreshes the website as it's being edited.
I'm running this right now as I'm writing this!

# Hosting

Hosting a website will always cost some money, whether it's a {{% abbr "Virtual Private Server" %}}VPS{{% / abbr %}} or electricity.
Luckily, there are some services that offer hosting of static sites for free.
[GitHub Pages](https://pages.github.com/) is one such host. Those trying to get away from Microsoft might also try [SourceHut](https://srht.site/).

# Domain

A domain name is what lets the user visit a web address rather than an IP address.
GitHub pages allows for custom domain addresses to be linked to our static site.

A great way to get free domains is [Freenom](https://freenom.com) where `.tk` and `.ml` domains can be rented and renewed for free.

