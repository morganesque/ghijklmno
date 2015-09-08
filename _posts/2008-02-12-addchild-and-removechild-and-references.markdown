---
layout: post
status: publish
published: true
title: addChild and removeChild and references.
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 645
wordpress_url: http://ghijklmno.net/addchild-and-removechild-and-references/
date: '2008-02-12 13:41:00 +0000'
date_gmt: '2008-02-12 13:41:00 +0000'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>I&#8217;ve just found a tricky little thing which I didn't know before which might be of help. I&#8217;ve declared a variable "img" which will be available from where ever I need it in my Document Class. It&#8217;s declared as a Loader and when I come to load the image into it I use the following code.
<pre>img = new Loader(firstUrlRequest);addChild(img);</pre>Then later on I want to replace the image. My idea was that I'd simply re-use the "img" variable and load a new image into it like so:
<pre>img = new Loader(secondUrlRequest);addChild(img);</pre>This seems to work fine and new images keep on appearing as I re-use this code at various times within the interface. Until I want there to be no image there. Then there is a problem. I use:
<pre>removeChild(img);</pre>and sure enough the last image I added is gone, but wait, what&#8217;s that? The image before that is still there. How the heck am I accidentally adding that back in?The problem goes back to the fact that the img variable isn't the same as the Loader I&#8217;ve added to the stage. It&#8217;s just a reference to that Loader. So what happens when I make the img variable reference a different Loader (i.e. the new one I&#8217;ve added)?What happens is I loose my control over the original image. It&#8217;s still sat there on the stage but now I have no way to connect to it (except perhaps by some iteration through the stage's children and possibly using removeChildAt).So the moral of the story: if you're reusing references to load different objects onto the stage (to replace each other) make sure you removeChild the referenced object first, that way you'll have nothing floating around in the background to surprise you later.</p>

