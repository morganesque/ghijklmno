---
layout: post
status: publish
published: true
title: Embedding fonts
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 643
wordpress_url: http://ghijklmno.net/embedding-fonts/
date: '2007-11-29 11:36:00 +0000'
date_gmt: '2007-11-29 11:36:00 +0000'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>Right, bare in mind this is using Flash CS3 Professional and AS3 so it might be different for different people out there, but this is my description of the damned nightmare I had trying to get fonts to embed in a that version of Flash and Actionscript. Basically I didn't get much out of the docs so I was left fumbling around by myself. I'm using a Document Class (keeping the AS separate) so I wanted a way to embed a font directly from there. The things I found seemed to be targeted at Flex users and as far as I could see don't work within the Flash CS3 environment. I'll happily be corrected on this if anyone knows different. So I went back into the .fla and embedded a font directly into the Library using the (old fashioned) 'right click' -> 'new Font' method. Which is fine. You have to give your font a name which then appears in the library. Let&#8217;s call it the Library Name. I'm using Verdana so I use 'Verdana' as the Library Name. Seems fair enough. Secondly like any good little flash boy I right clicked on the Font itself in the Library and chose the Linkage option (don't forget linkage, right?). I 'Export for Actionscript'. I also need to give the font a Class Name. It looks like this then involves the flash.text. Font class.  Well, I don't really know what that means but fine. I'm guessing I'll be using that Class Name to get at the font from within Actionscript. So I make it memorable but slightly shorter than the real font name ('Verd').So far I have a Library Name which I can see, and a Class Name which is something to do with Actionscript. I'm thinking I'm set. I get into my Document Class create a TextField. I set embedFonts to 'true'. Then I create a TextFormat and give it a colour, size etc. This is where I should be setting the font value. This is the Actionscript part of the process so naturally I use the Class Name for the font.
<pre>textformat.font = 'Verd';</pre>WRONG!OK that didn't work. No text appears. Well what else then maybe I should try the Library Name. It&#8217;s a long shot but it just might..... oooh it worked! How strange. So from within Actionscript I need to use the Library Name to access the font. Oh well now I know....A bit later I'm doing something similar and user Helvetica 55 Roman as the font. I happily create everything exactly as before and confidently use the Library Name as the identifier. WRONG!Nothing happens. No text. Huh? I try the Class Name. Nothing. I try changing these names. Nothing. I go back to my previous file using Verdana. I check the Font. Check the Linkage. Everything looks the same. Why isn't it working? I copy the Verdana script (and font) into this new .fla - it works! Why won't the Helvetica font work!?!?!?Well if you know the answer then you're probably already laughing at my stupidity. What I finally worked out is that although you need to embed the font into the library of your .fla giving it a Library Name, and you really need to then make sure the Linkage settings are right, giving it a Class Name, in fact the only name you need for the TextFormat is the actual font name. Just the one you know it by. The one it&#8217;s actually called. My trouble with Verdana was that I'd "accidentally" used that name as the Library Name so it "unfortunately" worked fine. For the Helvetica I'd not used the right name for either the Library Name or Class Name and therefore it wasn't until I tried
<pre>textformat.font  = 'Helvetica 55 Roman';</pre>that anything showed up. I won't forget this. Hopefully someone else can learn from it too ;-)</p>

