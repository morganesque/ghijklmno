---
layout: post
status: publish
published: true
title: Goodbye onEnterFrame
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 641
wordpress_url: http://ghijklmno.net/goodbye-onenterframe/
date: '2007-10-08 14:19:00 +0100'
date_gmt: '2007-10-08 14:19:00 +0100'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>Right so firstly I discover onEnterFrame() is gone. Bugger! What have they done with it? I used to use onEnterFrame() all the time. Probably too much. It was down to a lack of knowledge I'm sure, but there were few problems that I couldn't manage to onEnterFrame() my way around. A generous dollop of checking here and a few instructions there. Sometimes my onEnterFrame() function could become a long list of ifs waiting and waiting like Vladimir and Estragon. At first glance it&#8217;s simply been replaced (as with a number of other things) with the general addEventListener() function. This allows you to attach a bit of code to an "event" and then set it off when that event happens. That could be a mouse-click or a rollover, it could be a bitmap or some XML loading. For onEnterFrame() the event you're looking for is ENTER_FRAME and so before you know it you're back where you were only with a nice sloppy AS3 smile on your face!
<pre>addEventListener(Event. ENTER_FRAME, onEnterFrame);function onEnterFrame(e:Event):void{      trace("and another frame gone!");}</pre>... but wait! If I just insert that into my old code I&#8217;ve missed a trick. You see my old onEnterFrame() function with it&#8217;s long list of if statements was doing me no good. All those if's returning false most of the time, long and unwieldy and hard to decipher the day after tomorrow. What this new addEventListener() is actually encouraging me to do is use it for just that purpose. Instead of checking and checking and checking again, I need to attach my nugget of code to the event I'm waiting for. Then once it happens my code will get run. Not only that but I'm left with nice, clean, well organised actionscript which I can come back to in over a week and still understand. The thing which I'm still confused about right now is that apparently <q>the addEventListener() method can be called on any object that is part of the event flow</q>, but what is the event flow? And what objects are part of it?I must look into that.</p>

