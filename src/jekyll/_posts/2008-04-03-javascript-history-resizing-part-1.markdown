---
layout: post
status: publish
published: true
title: Javascript, History, Resizing - Part 1
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 647
wordpress_url: http://ghijklmno.net/javascript-history-resizing-part-1/
date: '2008-04-03 11:27:00 +0100'
date_gmt: '2008-04-03 11:27:00 +0100'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>OK here's a good one. I wanted to create a Flash site which acted like a normal HTML website. Why I would want to do this? You can only guess.Two things I found are a problem when it comes to this. Resizing &amp; History.(I'll deal with History in Part 2)Resizing means getting the browser to react to changes in the size of your Flash as it does to different HTML pages within a normal website (i.e. including and resizing scrollbars at the side of the page). Seeing as your swf is going to be the only thing on this page in order to achieve this we have to resize the swf within the HTML.I'm happy to tell you that all this can be achieved via the wonder which is ExternalInterface. This is the AS3 class which can act as a bridge between Actionscript in your swf and JavaScript in the HTML page. It&#8217;s also a cinch to use!<span style="font-weight: bold;">context</span>: <span style="font-style: italic;">I use SWFObject.js as a way to embed my swf's into HTML pages. I don't know whether it&#8217;s peculiar in this respect, but it means in the HTML the &lt;embed&gt; or &lt;object&gt; tags used always have a nice id="something" which identifies the swf within the page. That id="something" is going to be important.</span>I&#8217;ve embedded my swf in the HTML with the following code:
<pre>
&lt;script&gt;var so = new SWFObject(&quot;Something.swf&quot;, &quot;something&quot;, &quot;100%&quot;, &quot;700&quot;, &quot;8&quot;, &quot;#FFFFFF&quot;);so.addParam(&quot;scale&quot;, &quot;noscale&quot;);so.addParam(&quot;salign&quot;, &quot;t&quot;);so.write(&quot;flashcontent&quot;);&lt;/script&gt;
</pre>
I won't explain how to use SWFObject here. There's lots of help out on the web. But the important bits to note are:
<ul>
<li>the width is 100% but the <span style="font-weight: bold;">height </span>is 700 - this height will be changing, so set it to something sensible to start with.</li>
<li>the <span style="font-weight: bold;">id </span>is going to be "something" that&#8217;s the second parameter for SWFObject.</li>
<li>I&#8217;ve set <span style="font-weight: bold;">scale </span>to "noscale" this will keep the actual flash content looking normal.</li>
<li>I&#8217;ve set <span style="font-weight: bold;">salign </span>to "t" which will align the Flash movie top-centre.</li></ul><span style="font-size:85%;">(If you wanted to align your movie differently then top-left should be "tl" and top-right should be "tr". I'd have thought you'd want to keep it top-something.)</span>For resizing you'll need the following JavaScript in your HTML.
<pre>
&lt;script&gt;function resizePage(height){var d = document.getElementById(&#039;something&#039;);d.height = height;}&lt;/script&gt;
</pre>
This takes a height value and resizes your Flash movie to fit (using that <span style="font-weight: bold;">id</span> &lsquo;something&rsquo; which we passed to SWFObject).You'll then need the following ActionScript in your Flash.
<pre>
function resizePage(){ExternalInterface.call(&#039;resizePage&#039;,this.height);}
</pre>
This must be placed at the <span style="font-weight: bold;">root</span> of your Flash movie, and called from there. I tend to use an Event or something to trigger it from elsewhere. The point here is that ExternalInterface is able to call the JavaScript function <span style="font-style: italic;"><span style="font-weight: bold;">resizePage</span> </span>and pass in the value <span style="font-style: italic; font-weight: bold;">this.height</span>. Because it&#8217;s at the root of the swf <span style="font-weight: bold; font-style: italic;">this</span> refers to the entire movie and therefore will expand and contract depending on the stuff you&#8217;ve added to it.Again I won't go into how and why you might call this function because this post is long enough already but still, I&#8217;ve found the above works pretty well, so I'm happy.</p>

