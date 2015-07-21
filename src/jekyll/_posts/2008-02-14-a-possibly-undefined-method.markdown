---
layout: post
status: publish
published: true
title: a possibly undefined method
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 646
wordpress_url: http://ghijklmno.net/a-possibly-undefined-method/
date: '2008-02-14 13:05:00 +0000'
date_gmt: '2008-02-14 13:05:00 +0000'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>It's undefined... possibly.Maybe it's undefined or maybe it's actually defined. We don't know.Given that calling a method is quite a common thing to do how is this better than "there's something wrong" in terms of helping you fix it.
<pre>1061: Call to a possibly undefined method X througha reference with static type Y</pre>Well, possibly a bit. Possibly.Anyway here's where I went wrong.Variable at the top of my (so I can access it everywhere) like so - it's using a class I wrote for a different project (do you hear that? reusable code. I like totally rool!).
<pre>var thing:ClassA;</pre>I've not assigned anything to it yet I'll be doing that in the class somewhere. In fact here I am doing it now.
<pre>thing = new ClassA(var1, var2);</pre>So all is well and good until I realise that despite the joys and karmic benefits of reusable code ClassA just isn't going to cut it with this new project. It's got the juice but I'm going to be needing biscuits with that juice if you know what I mean (tell me if I'm loosing you here).So a quick new class.
<pre>class ClassB extends ClassA{ /* new stuff */}</pre>and a change to the code
<pre>thing = new ClassB(var1, var2);</pre>and I'm away using the new stuff and making good things happen. But no... I get that error above there. I'm scratching my head because as far as I know the whole thing with this class based OOP based programming shizzle is to do just that kind of thing.And the method is there. It's fucking there. Look I extended ClassA and WROTE A NEW METHOD! Here it is! Aaaaarrgh!Anyway turns out (as usual) I'd missed something. You see at the top of the class there when I defined the variable (but didn't assign anything to it) the variable was still being given a type of ClassA.
<pre>var thing:ClassA;</pre>and it seems that because of that, even though I assigned an object of type ClassB to it later on. It never really got over being a ClassA. In fact it as so attached to it's status as a ClassA varaible it kind of ignored everything about ClassB that it didn't already know.Hence when I come to call on one of my new methods, they "officially" didn't exist.Possibly.</p>

