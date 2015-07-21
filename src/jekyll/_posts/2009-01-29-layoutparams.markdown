---
layout: post
status: publish
published: true
title: LayoutParams
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 658
wordpress_url: http://ghijklmno.net/layoutparams/
date: '2009-01-29 10:28:00 +0000'
date_gmt: '2009-01-29 10:28:00 +0000'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>Right now we've got an image on the screen (or some other kind of View) and you want to move it around. There's two things here, firstly the method you use for doing this and secondly the context you're in. This is the code you need:</p>

<pre>LayoutParams params = new LayoutParams(100,100,100,200);
 image.setLayoutParams(params);</pre>
The parameters you pass into that object are width,height,x,y so this is quite straight forward right? What you need to remember though is that there are different versions of LayoutParams depending on the type of ViewGroup you're using.</p>

<p>Above I was using a AbsoluteLayout so that LayoutParams object is imported from within this class.</p>

<pre>import android.widget.AbsoluteLayout.LayoutParams;</pre>
If you import (and therefore pass) the wrong kind of LayoutParams object to a View that's within a different kind of ViewGroup this would cause problems (your app crashing). Eclipse isn't clever enough to sort this out for you so watch out! ;-)</p>

