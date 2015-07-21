---
layout: post
status: publish
published: true
title: Javascript, History, Resizing - Part 2
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 648
wordpress_url: http://ghijklmno.net/javascript-history-resizing-part-2/
date: '2008-04-03 13:57:00 +0100'
date_gmt: '2008-04-03 13:57:00 +0100'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>As <a href="http://missinginactionscript.blogspot.com/2008/04/javascript-history-resizing-part-1.html">mentioned</a>. I wanted to create a Flash site which acted like a normal HTML website.Two things I found are a problem when it comes to this. Resizing &amp; History.(I dealt with Resizing in <a href="http://missinginactionscript.blogspot.com/2008/04/javascript-history-resizing-part-1.html">Part 1</a>)History = the Back button. Flash tends to miss it as a rule, sending users back to the last HTML page they were viewing. Generally you'd get around this by making the interactions in your Flash site intuitive enough that the user is never stuck with that "I wanna hit Back!" instinct, but sometimes that&#8217;s not the aim.So we need to get the browser to record when a different "page" (i.e. set of content) is being viewed within the Flash site. Obviously it&#8217;s important at this stage to define, at least to yourself, what a different "page" is but that&#8217;s an interaction design issue and far too fuzzy to go into here.All we need to care about it that this is a "new page", when the user clicks the Back button they'll want to go back to what they saw before. How do we achieve that?Well it turns out that <b>ExternalInterface</b> is our friend here again although the solution this time is a little more complicated than before. Basically the HTML page hosting your swf needs to also include an iframe. Let&#8217;s call that iframe "history" and make it so tiny that&#8217;s it&#8217;s invisible.
<pre><iframe id="history" name="history" src="" border="0" height="0" width="0"></iframe></pre>What we do is load a new page in there each time we want to register a 'new page'in Flash. The browser thinks that it&#8217;s loaded a new page (well it has really) so hitting the back button simply reloads the previous page in the iframe. If we can get the iframe page to trigger the previous content in Flash we're laughing!So how do we do that? There are 3 things you must do.
<ol>
<li>Write a JavaScript function to pass the info into Flash.</li>
<li>Write a ActionScript function to accept that info a display the right content.</li>
<li>Write a JavaScript function (on each page you'll load into your iframe) that will call the function in 1. and pass info into the function in 2. telling Flash what content to display.</li></ol>1. JavaScript
<pre><script>function setPage(newPage){var m = document.getElementById('something');m.sendToActionScript(newPage);}</script></pre>OK things to note: '<span style="font-weight: bold;">something</span>' is the id given to the object/embed tags used to put the flash content into your HTML. I covered the use of SWFObject for this <a href="http://missinginactionscript.blogspot.com/2008/04/javascript-history-resizing-part-1.html">before</a>. <b>sendToActionScript</b> is an arbitary name for the function, you'll see below that it could have been anything, but that name seems to make sense. <span style="font-weight: bold;">newPage </span>is the info we're sending to ActionScript about what content to display.2. ActionScript
<pre>if (ExternalInterface.available){ExternalInterface.addCallback('sendToActionScript', fromJavascript);}</pre>This is where ActionScript picks up the fact that there's a function in JavaScript on your page called <b>sendToActionScript</b> and agrees to take some action when it is called. In fact it agrees to call another function called <b>fromJavascript</b> and pass whatever you&#8217;ve passed into the first, into the second.
<pre>function fromJavascript(contentName){// do something with contentName}</pre>There's no point me telling you about <b>fromJavascript</b>. This will be an ActionScript function which will display the content. The only thing really to mention is that you're going to be passing something new into it each time the iframe is changed so you'll have to find some way to trigger the displaying of different content based on what&#8217;s passed in. It could simply be a <i>switch</i> statement or it could be much much more complicated. The decision is yours!3. JavaScript
<pre><script>parent.setPage('thispage');</script></pre>Right here's the magic. In each of the HTML pages you're going to drag into your iframe you'll need to have the above JavaScript. So each time the iframe loads another bit of content something similar will be run.The <b>parent</b> bit is talking about the HTML page containing the iframe. The HTML page which also contains your swf. The <b>setPage</b> bit is obviously the JavaScript function we&#8217;ve mentioned before, which is also sat in that page. Finally the <b>'thispage'</b> is the info we want to pass to Flash about what should be displaying. The thing which will eventually fall into the lap of your <b>fromJavascript</b> function in your flash movie.So how do we get all this up and running? Well the point with this is now that you have this system for dealing with user going 'Back' the way to make it work is to use it as the system for user going 'Forward'. So each time you load a new bit of content in your Flash (or at least a new bit you feel is worthy of being treated as a 'page') you should trigger it via the iframe.In order to do this you'll actually need 2 more bits of code.
<ol start="4">
<li>A JavaScript function to load a new page into the iframe</li>
<li>A bit of ActionScript to trigger this function and pass in the page to load.</li></ol>4. JavaScript
<pre><script>function changeiFrame(url){var h = document.getElementById('history');h.src = url;}</script></pre>This simply takes a URL and loads it into the iframe. Simple as that.5. ActionScript
<pre>ExternalInterface.call('changeiFrame',url);</pre>This is what calls the above JavaScript from within Flash.And there you have it. When you want to change your content you call JavaScript, which changes the iframe, which calls some JavaScript, which calls some ActionScript which triggers the Flash content to change in some way.The problem with all this is obviously making the stuff which is passed around here unique enough to mean that the exact right bit of Flash is displayed each time. You'll need to take account of all the parameters which make your Flash content display a certain way and make sure that all that is able to be triggered through this mechanism. That&#8217;s not always easy, but it&#8217;s certainly far from impossible.BTW much of the above is taken from or at least inspired by the following list of websites. I hope I&#8217;ve added enough (making it specifically AS3, and explaining it in my own inimitable style) to warrant rehashing it here. As usual this is mainly for my own records and on the off-chance that someone else might find it useful. "Shoulders of giants" I think is the phrase, 'twas always thus.<a href="http://www.robertpenner.com/experiments/backbutton/backbutton.html">penner</a><a href="http://www.contentwithstyle.co.uk/Articles/38/">stenhouse</a><a href="http://www.actionscript.org/resources/articles/142/1/Enabling-a-back-button-within-flash/Page1.html">hendershot </a></p>

