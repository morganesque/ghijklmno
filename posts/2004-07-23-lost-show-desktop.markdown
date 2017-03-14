---
layout: post
status: publish
published: true
title: Lost Show Desktop
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 615
wordpress_url: http://ghijklmno.net/lost-show-desktop/
date: '2004-07-23 09:08:00 +0100'
date_gmt: '2004-07-23 09:08:00 +0100'
categories:
- Old Blog
tags: []
comments: []
---
<!-- more -->

<p>I lost my Show Desktop icon from my taskbar in Windows. I don&#8217;t know how I lost it but I did. I must have deleted it at some point. What was I thinking?</p>

<p>After searching around in the windows menus and generally finding it slightly annoying for weeks I managed to find a simple solution, although one which I could never have come up with by myself.</p>

<p>The following is a quote form <a href="http://www.pcmag.com/article2/0,1759,1566686,00.asp">PC Magazine</a> (just in case it ever disappears) and is very much not my own work:</p>

<p class="firstpar" style="margin:10px 0px;font-size:smaller;color:black;">The Show Desktop icon in the Quick Launch toolbar isn&#8217;t a normal shortcut. If you accidentally delete it you can&#8217;t recreate it the way you would a shortcut to a program. Instead, launch Notepad and type these lines:</p>

<pre>
[Shell]
Command=2
IconFile=explorer.exe,3
[Taskbar]
Command=ToggleDesktop
</pre>
<p>Save the file with the name Show Desktop.scf in the folder C:\Documents and Settings\ username\Application Data\ Microsoft\Internet Explorer\ Quick Launch, where username is replaced by your actual user account name.</p>

<p>Maybe that&#8217;ll help someone, sometime.</p>

