---
layout: post
status: publish
published: true
title: getResources getDrawable
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 657
wordpress_url: http://ghijklmno.net/getresources-getdrawable/
date: '2009-01-28 16:07:00 +0000'
date_gmt: '2009-01-28 16:07:00 +0000'
categories:
- Uncategorized
tags: []
comments: []
---
<p class="note">This was one of a series of posts I wrote on a short lived android dev blog I had during a period where I did a tiny bit of android app development.</p>
<p>OK here's one which seems fairly big. Most of the time you refer to your resources (images, xml layouts etc) using this handy class called <span style="font-weight: bold;">R</span>. This is great in Eclipse (another thing I'm new to) because this <span style="font-weight: bold;">R</span> class is created automatically from files you drop in folders so Eclipse's auto-complete function can be used to pick up the resources (via this class) without you needing to look in your folder and check filenames etc. Coming from text-editor style web development this seems very nice. However when I actually want to pick up one of those images and use it in an Activity (e.g. in an ImageView) the <span style="font-weight: bold;">R</span> class doesn't get me there because all it returns is the ID of the resource. So what I have to use is another method.
<pre>getResources().getDrawable(R.drawable.image);</pre>I know I'm going to be coming back to this one time and again.</p>

