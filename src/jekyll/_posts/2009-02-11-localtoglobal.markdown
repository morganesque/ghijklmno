---
layout: post
status: publish
published: true
title: localToGlobal
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 650
wordpress_url: http://ghijklmno.net/localtoglobal/
date: '2009-02-11 14:41:00 +0000'
date_gmt: '2009-02-11 14:41:00 +0000'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>Right so you've got an hierarchy of nested movieclips (or sprites) and you're rotating each  separately to get a kind chain effect like the different moving parts of an arm or a leg. At the end of your leg you've got a foot (and maybe even toes) and there you are with your leg flailing around like a dervish on heat! Perfect.Now you need to workout the x and y coordinates of one of those toes, so you can... errr... make lasers fire out of it whenever the user sneezes, right? (am I right?).Anyway, if you want those coordinates you can't just say <span style="font-style: italic;">toe.x</span> and <span style="font-style: italic;">toe.y</span> that's not going to work, because those coordinates are local to those toes, or at least local to the foot movieclip you've attached them to. So what do you do? Well, you might find yourself iterating back through the hierarchy of movieclips finding out the x and y and adding them up and stuff. Phew! It's hard work, but do-able. But wait, then you've got to degotiate all that rotation. Gah! What was that stuff I read about coordinate rotation? Oh god please don't send me back to the dark place!!!Luckily you're saved all this by using the helpful function <span style="font-weight: bold;">localToGlobal</span>. It takes a <span style="font-weight: bold;">Point</span> which is local to your object and translates it to a <span style="font-weight: bold;">Point</span> which is relative the global object (let's call that the <span style="font-weight: bold;">Stage</span>).You use it like this:
<pre class="brush:as3; gutter:false; wrap-lines:false">var p:Point = new Point(toe.x,toe.y);var np:Point = toe.parent.localToGlobal(p);</pre>What I'm doing there is finding out the actual global position of the <span style="font-style: italic;">toe</span>. So I create a new <span style="font-weight: bold;">Point</span> and pass in the <span style="font-style: italic;">x</span> and <span style="font-style: italic;">y</span> coordinates of <span style="font-style: italic;">toe</span>. Then I can find out where actually it is on the stage by  passing that <span style="font-weight: bold;">Point</span> into the function <span style="font-weight: bold;">localToGlobal</span>.Remember the key point here is that it's the <span style="font-style: italic;">toe</span>'s parent (the <span style="font-style: italic;">foot</span>?) which has to call the function because of course the <span style="font-style: italic;">x</span> and <span style="font-style: italic;">y</span> coordinates of <span style="font-style: italic;">toe</span> are relative to the <span style="font-style: italic;">foot</span> aren't they.</p>

