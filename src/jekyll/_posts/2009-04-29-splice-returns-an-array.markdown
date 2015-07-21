---
layout: post
status: publish
published: true
title: splice returns an array!
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 651
wordpress_url: http://ghijklmno.net/splice-returns-an-array/
date: '2009-04-29 20:42:00 +0100'
date_gmt: '2009-04-29 20:42:00 +0100'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>This one caught me out for a long time today.</p>

<p>I have an array of Objects which I want to jumble up a bit. AS3 doesn't come with a randomise (or randomize in the US!) function so I Googled around a bit to find one. The following came from some site somewhere and is no doubt a very well intentioned piece of code.</p>

<pre>function randomizeArray(array:Array):Array
{
    var newArray:Array = new Array();
    while(array.length > 0)
    {
         newArray.push(array.splice(Math.floor(Math.random()*array.length), 1));
    }
    return newArray;
}</pre>
So, you can kind of see what it&#8217;s doing right. Take an array. While your way through it removing one item at a time by choosing a random item using the length of the array. Each time the length of the array shortens by one. You add each item to a new array and once your old array is empty return your newly random array. Sweet!</p>

<p>Only splice returns an array! Splice returns an array!! Do you hear?</p>

<p>So your newly randomised array isn't full of your objects it&#8217;s full of lots of little arrays each containing one item which is your object. This is not fine. You try and do anything with those items (inside their arrays) and you can't. Cos they're inside arrays.</p>

<p>Which would be fine if you realised they were inside arrays... but I didn't.</p>

<p>Took me ages to work it out, because when you trace the blasted things out the way Flash traces single item arrays makes it look like it&#8217;s the object itself. You don't see that it&#8217;s inside an array.</p>

<p>*sigh*</p>

