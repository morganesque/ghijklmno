---
layout: post
status: publish
published: true
title: startActivity
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 659
wordpress_url: http://ghijklmno.net/startactivity/
date: '2009-01-29 11:51:00 +0000'
date_gmt: '2009-01-29 11:51:00 +0000'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>So now you want to move onto to another page of you application. You've created another Activity class and filled it with loads of lovely goodness. What you need to do is create a Intent. Intents seem to be used to get things done (nice naming). So the code you need to call to get there is this.
<pre>Intent i = new Intent(this, NextActivity.class);startActivity(i);</pre>You create your Intent object and pass in the current context (<span style="font-weight: bold;">this</span>) and the Activity class that you're wanting to move to. All good?Not quite, if you run the code like this you'll get an error? Why? You haven't added the new Activity class to the manifest? Huh? The manifest needs to be told about all Activities before it'll let you view them.This seems to be the opposite of the resources situation where things are picked up automatically. I'm sure there's a good reason but still... open up the AnroidManifest.xml and if you're using Eclipse (like me) there's nice easy interface for adding new Activities (under the Application tab).</p>

