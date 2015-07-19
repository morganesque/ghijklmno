---
layout: post
status: publish
published: true
title: TextField and buttonMode
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 644
wordpress_url: http://ghijklmno.net/textfield-and-buttonmode/
date: '2007-12-07 11:32:00 +0000'
date_gmt: '2007-12-07 11:32:00 +0000'
categories:
- Uncategorized
tags: []
comments:
- id: 37
  author: Yannock
  author_email: ''
  author_url: ''
  date: '2010-02-12 14:47:55 +0000'
  date_gmt: '2010-02-12 14:47:55 +0000'
  content: Thanks, that&#39;s what I searched !
- id: 213
  author: Maducanyk
  author_email: 58jyzocagb@yahoo.com
  author_url: http://www.facebook.com/profile.php?id=100003452277232
  date: '2014-01-15 00:01:02 +0000'
  date_gmt: '2014-01-15 00:01:02 +0000'
  content: I just wanted to cnemmot and say that I really enjoyed reading your blog
    post here. It was very informative and I also digg the way you write! Keep it
    up and I&rsquo;ll be back to read more in the future
---
<p>Right so you want to create a click-able bit of text. So you create a TextField and stick your text in there and then you'll be wanting to addEventListener on that. Excellent, you've made your text click-able.You might be thinking "that's great, but why doesn't my mouse pointer change when I hover over the text". Well, that's because you need to define the buttonMode to be true, to tell Flash that this thing you're creating is going to be a bit like a button.However, TextFields can't have a buttonMode. Only descendants of Sprite can have buttonMode. So what you need to do is create a Sprite and add the TextField to that before adding the Sprite to the stage."But my mouse pointer still doesn't change when I hover over the text!?!"Well that's because the Sprite you've created is empty apart from TextField and the TextField is still dealing with the MouseEvent.MOUSE_OVER by itself. We need to tell Flash that anything contained in the Sprite should be ignored in terms of what the mouse is doing.That's where mouseChildren comes in.
<pre>sprite.mouseChildren = false;</pre>... and your mouse pointer should now change when it's over the text.</p>

