---
layout: post
status: publish
published: true
title: The Stage is not the Document Class (or vice versa)
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 649
wordpress_url: http://ghijklmno.net/the-stage-is-not-the-document-class-or-vice-versa/
date: '2008-09-01 14:07:00 +0100'
date_gmt: '2008-09-01 14:07:00 +0100'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>Just a quick one but this caught me out today. If you want to make the stage clickable from your Document Class you might include the following in your Main function.
<pre>public function Main(){    addEventListener(MouseEvent.CLICK,handleClick);}</pre>To make any mouse click that happens anywhere on the stage trigger the handleClick function. However that's not going to work because although it's the top level class your Document Class isn't the same as your stage.In order to get mouse clicks to register from an empty stage you'll need to add the event listener to the stage itself. Like so:
<pre>public function Main(){    stage.addEventListener(MouseEvent.CLICK,handleClick);}</pre>I know this looks straightforward but it had me scratching my head for a while today. The stage is not the Document Class even though at that level you addChild to the Document Class to add it to the stage. I should find something technical regarding this to explain but I can't right now.</p>

