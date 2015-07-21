---
layout: post
status: publish
published: true
title: 'Twitter Migration to v1.1 API. My code breaks. I mend it. '
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 829
wordpress_url: http://ghijklmno.net/?p=829
date: '2013-06-18 09:35:07 +0100'
date_gmt: '2013-06-18 09:35:07 +0100'
categories:
- Uncategorized
tags:
- php
- api
- twitter
comments: []
---
<!-- more -->

<p>Blueargh! All you wanted to do was grab your own twitter timeline to display on your own website using a bit of PHP to grab the data as JSON. You were even willing to cache it fairly aggressively in order to spare Twitter a load of unneccesary requests. But now they&#8217;ve migrated to v1.1 there's no way to get this without authentication! And you don't understand authentication. What&#8217;s a poor boy/girl to do?</p>
<!-- more -->
<p><span style="font-size: 1.5em;">1. Create an application</span></p>

<blockquote>In version 1.1, we're requiring applications to authenticate all of their requests with&nbsp;<a href="https://dev.twitter.com/docs/auth/oauth">OAuth 1.0a</a>&nbsp;or&nbsp;<a href="https://dev.twitter.com/docs/auth/application-only-auth">Application-only authentication</a>.</blockquote>
<p>As they say you need to authenticate now. What I found was that Application-only authentication was enough for what I wanted to do. So the first thing I did was create a new application. I had to sign in to twitter and then go to my&nbsp;<a href="https://dev.twitter.com/apps">apps page</a>. Once there I clicked the "Create a new application" button.</p>

<p>I had to give my app a <strong>name</strong>, <strong>description</strong> and <strong>website URL</strong> so I just filled these in with my website's name, a description of "my website" and the URL ... of my website. I didn't fill in the&nbsp;<strong>Callback URL</strong> and everything was fine, so I guess for my purposes it wasn't needed.</p>

<h3>2. Secret Key</h3>
<p>Next I had to grab my <strong>Consumer Key</strong> and my <strong>Consumer Secret,&nbsp;</strong>these are needed to move to the next step. They're displayed on your App page (for the app you&#8217;ve just created). Twitter helpfully explains on <a href="https://dev.twitter.com/docs/auth/application-only-auth">this page</a> what you needed to do with them. Now, this is the point where things get weird. I found that page very hard to understand. I'm no security expert or API expert or auth expert so a lot of the language there was confusing.</p>

<p>I did manage to glean that I had to combine my Consumer Key and Consumer Secret in a single string (with a colon : in between) this is called the&nbsp;<strong>Bearer token credentials</strong>. Then I had to <strong>base64encode</strong> that string.</p>

<pre>$bearer_token_credentials = $consumer_key.":".$consumer_secret;
$b64_bearer_token_credentials = base64_encode($bearer_token_credentials);</pre>
I then had to post this string to the Twitter API at this URL:
<pre>$url = &#039;https://api.twitter.com/oauth2/token&#039;;</pre>
<p>I used CURL via PHP to do this. It took a bit of trial and error to get the CURL right but here's what I ended up with:</p>

<pre>$headers = array(
&#039;Authorization: Basic &#039;.$b64_bearer_token_credentials,
&#039;Content-Type: application/x-www-form-urlencoded;charset=UTF-8&#039;
);
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_USERAGENT, &#039;Morganesque&#039;);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, &#039;grant_type=client_credentials&#039;);
curl_setopt($ch, CURLINFO_HEADER_OUT, 0);
$output =  curl_exec($ch);
$data = json_decode($output);</pre>
<p>I'm not entirely sure what all those options are. The $headers are clearly what Twitter states you need to include and the POSTFIELDS option is again stated as a requirement. It took me a while to get all of my ducks in a line here but I'm pretty sure this is cool. Oh... and the user-agent is just the name of the app I created, I don't think it&#8217;s necessarily vital.</p>

<h3>3. Bearer Token</h3>
<p>What I got back from that request was a tiny piece of JSON which had two values.</p>

<pre>{&quot;token_type&quot;:&quot;bearer&quot;,&quot;access_token&quot;:&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&quot;}</pre>
<p>It&#8217;s the <strong>access_token</strong> there that&#8217;s important. That&#8217;s what I need to be able to send more general requests to the Twitter API from now on. Now one thing I'm not entirely sure about here is how long this <strong>access_token</strong> lasts. I think it lasts a while. Maybe not forever but quite a long time (assuming you don't piss twitter off!) so the above code probably only needs to be run once. Once you&#8217;ve got the <strong>access_token</strong> you're ready to go (I think).</p>

<h3>4. Get My Twitter Feed</h3>
<p>So finally I could now sent a request to the Twitter API to retrieve my timeline data. As before I needed to create a CURL request.</p>

<pre>$url = &#039;https://api.twitter.com/1.1/statuses/user_timeline.json?count=100&amp;amp;screen_name=morganesque&#039;;</pre>
<p>And then ... Kablammo!</p>

<pre>$tw = curl_init($url);
$headers = array(&#039;Authorization: Bearer &#039;.$access_token);
curl_setopt($tw, CURLOPT_HTTPHEADER, $headers);
curl_setopt($tw, CURLOPT_USERAGENT, &#039;Morganesque&#039;);
curl_setopt($tw, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($tw, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($tw, CURLOPT_RETURNTRANSFER, 1);
$output =  curl_exec($tw);
$data = json_decode($output);
var_dump($data);</pre>
<p>As before the output is JSON but as far as I could see this was as similar to the output of the V1 API as I needed to make everything else work fine. I haven't tried any other calls to the API and I don't know whether you need to authenticate differently if you're posting to timelines or reading direct messages (I'm guessing you do). But for that basic "grab a few tweets" type of thing which I'm guessing a few people want, and if you're not content to cede all control and use Twitter's suggested <a href="https://twitter.com/settings/widgets">embed</a>&nbsp;solution, maybe this will be of help.</p>

<h3>5. Cache Yo!</h3>
<p>Finally it might be worth sticking those tweets into a file and only going back to the API when that file is a bit old. Again I don't know exactly how many requests Twitter will accept before it starts getting sad about you, but unless you're updating your timeline every second and don't have too many visitors to your site, going back to the API for each and every request probably isn't a good idea.</p>

