---
layout: post
status: publish
published: true
title: Xmas Game Motion Capture
author:
  display_name: Tom
  login: admin
  email: tsmorgan@gmail.com
  url: ''
author_login: admin
author_email: tsmorgan@gmail.com
wordpress_id: 638
wordpress_url: http://wordpress/blog/?p=3
date: '2008-12-18 13:38:24 +0000'
date_gmt: '2008-12-18 13:38:24 +0000'
categories:
- Uncategorized
tags: []
comments: []
---
<!-- more -->

<p>Movement detection with a webcam, just how do we do it? Well, in the immortal words of Dr Seuss "it's really quite simple, there's nothing much to it".
It turns out that combining a couple of elements of Flash you can pretty swiftly get up and running with a movement detection system which whilst perhaps not the most sophisticated is easily enough to allow a small snowy man to dodge a few snowballs.
So where do we start? Well we're going to approach this by creating a Document Class. This seems like a good approach for a demonstration but all the code below could just as easily be abstracted into a reusable Class elsewhere (as we actually did for the game).
So without boring you with all the details of creating a Document Class I'll start with a number of variables that we want to set up first.</p>

<pre lang="actionscript">
var w:Number = 550;
var h:Number = 400;
var xi = w / 50;
var yi = h / 50;
var xs = xi / 2;
var ys = yi / 2;
var wcam:BitmapData;
var snap:BitmapData;
var diff:BitmapData;
var bitmap:Bitmap;
var video:Video;
</pre>
The first ones there are <em>w</em> and <em>h</em>. These are simply the width and height that you want things to be. I've set them to be the size of my SWF so everything I do will fill the whole of my movie. You could have them whatever you like but it's important that you reuse the variable further down so everything lines up right!
Next there's a bit of mathematical shenanigans which is basically setting up a few values which effect how we'll analyze the webcam image later on. All you really need to know is that the number 50 is saying '<em>split the image up into a grid which is 50x50' </em>this means that instead of looking at each pixel individually we'll skip some of them for the sake of speed. That 50 could be anything up to the value of w or h respectively.
Finally a few global vars which we'll be using. Three lots of <strong>BitmapData</strong>, one <strong>Bitmap</strong> and one <strong>Video</strong> object. Tidy!
<p>Now to the webcam. We need to get access to the user's camera using the following lines of code (this will be in the constructor of our Document Class).</p>

<pre lang="actionscript">video = new Video(w,h);
var camera = Camera.getCamera();
if (camera !== null)
{
    camera.addEventListener(StatusEvent.STATUS, camStatus);
    video.attachCamera(camera);
    addChild(video);
}</pre>
Firstly you need to create a video object. This is a kind of <strong>DisplayObject</strong> and so it is especially for showing video on the stage. We'll be piping the video from your webcam into this in a second.
<p>Next there is the <strong>getCamera</strong> function which tells Flash Player to grab your webcam (this function is static so you don't need to create a <strong>Camera</strong> object before calling it). As you can probably guess from the next line, if no webcam is found on your machine the value null is passed back so you'd better check for that before continuing (just include an <em>else </em>section below).</p>

<p>If you have an available webcam there's two things you need to do. I'll take it backwards because the first is a consequence of the second. The function <strong>attachCamera</strong> tells flash to start piping the data from your webcam into the video object we created before. It is at this point (not at <strong>getCamera</strong>) where Flash checks for permission and when you might see a little popup saying something like "This website is requesting access to your Webcam and Microphone". When the user chooses Allow or Deny an <strong>StatusEvent</strong> is thrown by Flash with one of two codes.</p>

<pre lang="actionscript">Camera.Unmuted</pre>
<p>or</p>

<pre lang="actionscript">Camera.Muted</pre>
<p>You can guess what they mean and it's worth setting a listening function in order to deal with both scenarios, or you may end up with some users hitting a dead end. Next we add the video object to the stage with <strong>addChild</strong> and you should see your self smiling back via the magic of webcam.
OK next we'll get into the motion detection. First we need a <strong>Bitmap</strong> and for a <strong>Bitmap</strong> we need <strong>BitmapData</strong>.</p>

<pre lang="actionscript">var diff:BitmapData = new BitmapData(w,h,true,0x00000000);</pre>
You may have noticed that I used the variables w and h in the video object before. It doesn't matter what they are but here I want the video and this <strong>BitmapData</strong> to have the same values. You'll see why later. The 3rd parameter there says that the <strong>BitmapData</strong> will be transparent, and the final one is the colour to fill the <strong>BitmapData</strong> to start with. You can see that it looks like a normal hex-value colour only with one extra pair of values (the extra pair here refer to the alpha value of the colour, 00 means completely transparent).
<p>Now for the <strong>Bitmap</strong>:</p>

<pre lang="actionscript">var bm:Bitmap = new Bitmap(diff);
addChild(bm);</pre>
We pass <strong>BitmapData</strong> into the <strong>Bitmap</strong> and add it to the stage. We see nothing yet because it's still all empty and transparent but that's fine for now.
<p>Next we'll use the other two <strong>BitmapData</strong> objects. There are the ones which will actually be doing the work, but due to that fact they're not actually going to be used to display anything (incidentally during development I did pipe both these into <strong>Bitmap</strong> objects and displayed them on the stage in order to get a better idea of what was happening).</p>

<pre lang="actionscript">wcam = new BitmapData(w,h,false);
snap = new BitmapData(w,h,false);
snap.draw(video);</pre>
I'm setting these up the same way as the other one (size-wise) but these don't need to be transparent so the third parameter is false and I'm not passing a colour. Also you'll notice that I'm callling a function in the second one (<em>snap</em>). This is the bitmap which is taking a 'snapshot' of the webcam and which we'll be comparing against later. The <strong>draw</strong> function simply copies the visual contents of the <strong>DisplayObject</strong> <em>video</em> into the <strong>BitmapData</strong>.</p>

<p>The final thing I do in the Document Class constructor is to set an event listener to trigger a function on every frame. So let's do that next.</p>

<pre lang="actionscript">addEventListener(Event.ENTER_FRAME, onEnter);</pre>
<p>Right so we're all set up with our objects in place and a webcam (hopefully) attached to a DisplayObject for showing. We've set a function to trigger every frame, this is going to be the place where the motion is actually detected so let's look at that next.</p>

<pre lang="actionscript">public function onEnter(e:Event):void
{
    wcam.draw(video);
    for(var bx = xs; bx &lt; w; bx += xi)
    {
        for(var by = ys; by &lt; h; by += yi)
        {
            var s = snap.getPixel(bx,by);
            var c = wcam.getPixel(bx,by);
            var col = Math.abs(s-c);
            if (col &lt; 0x333333) col = 0x00FFFFF;
            else col = 0xFFFFFFFF;
            diff.fillRect(new Rectangle(bx, by, 5, 5), col);
        }
    }
    snap.draw(video);
}</pre>
<p>Right let's start at the top. The first thing we do is we <strong>draw</strong> the current contents of <em>video</em> into the <strong>BitmapData</strong><em> wcam</em>, this is the same as what we did with <em>snap</em> above but we're expecting there to have been a change between when we did that (in reality this first time it happens there might not be, but as this function is only (!) called once every frame there soon will be).</p>

<p>Now for the loops. Here we're using those variables from the top of the class. There's two loops, one for colomns and one for rows. In this way we'll be working out the coordinates for the centre pixel in each square of a 50x50 grid which covers the surface of our <em>video</em>. Still with me? Good. Jumping into the middle of those loops then, we have two values <em>bx</em> and <em>by</em>, these are what direct us at the pixel we're after.</p>

<p>Here we use another function from <strong>BitmapData</strong> which is <strong>getPixel</strong>. This function looks at a pixel and returns the colour of that pixel as a <em>uint</em>. These are basically numbers which within the world of Flash can also represent colours (I won't go into all that here) and so they are perfect for the kind of comparison we're wanting to do here. Notice we're using <strong>getPixel</strong> to get the same pixel from both of our <strong>BitmapData</strong> objects <em>snap</em> and <em>wcam</em>.&nbsp; You're probably a step ahead of me here but you can see that it's a simple step from here to finding a kind of value for the amount of numerical difference between the two colours we find. So that's what we do.</p>

<p>We take one from the other and put the result into a variable <em>col</em> (notice we're using Math.abs() here so it doesn't matter if one is bigger than the other or vice versa it's the magnitude of difference we're interested in). Then we check whether it's value is higher than a certain pre-defined value and if it is we decide we have found motion. The <strong>if</strong> statement as written above does a couple of things (but as I said before you might want to do differently) if there is no motion it sets the value of col to a transparent color, if there is motion it sets the colour to <em>white</em>, thereby turning the range of values we might get back into a binary (on/off) representation. Finally we draw a small rectangle into your <strong>BitmapData</strong> <em>diff</em> (using another <strong>BitmapData</strong> function <strong>fillRect</strong>) which has up till now been completely transparent, and colour it with the new binary value of <em>col</em> meaning that either you'll get a little white rectangle appearing or a little transparent rectangle ... errr ... not appearing. Theseloops continue until all the pixels have been checked and all rectangles drawn.</p>

<p>The final quick thing that we do is <strong>draw</strong> the current contents of <em>video</em> into the <strong>BitmapData</strong><em> snap. </em>This updates <em>snap</em> and means that next time we check we're only noticing motion that has happens since we did the last check.<em>
</em></p>

<p>At this point you can run your Document Class and see the movie. What you should see it that where ever motion is detected little white rectangles will appear. These are the rectangles described in the previous paragraph which are drawn into the otherwise completely transparent <strong>Bitmap</strong> which is sitting in front of the video object showing your webcam.</p>

<p>Working? Woohoo!</p>

<p>OK so there's a few more things we might want to do here because obviously you'll need to do more than simply drawing white boxes on the screen. So next up is a new and slightly different version of that function above. Spot the difference!</p>

<pre lang="actionscript">public function onEnter(e:Event):void
{
    wcam.draw(video);
    var xcoords = new Array();
    var ycoords = new Array();
    for(var bx = xs; bx &lt; w; bx += xi)
    {
        for(var by = ys; by &lt; h; by += yi)
        {
            var s = snap.getPixel(bx,by);
            var c = wcam.getPixel(bx,by);
            var col = Math.abs(s-c);
            if (col &lt; 0x333333) col = 0x00FFFFF;
            else {
                col = 0xFFFFFFFF;
                xcoords.push(bx);
                ycoords.push(by);
            }
            diff.fillRect(new Rectangle(bx, by, 5, 5), col);
        }
    }
    snap.draw(video);
}</pre>
<p>First thing is that we set up two <strong>Array</strong> vars at the top. These are going to store the coordinates of any movement we detect. There's one for x values and one for y because later on we're going to want to arrive at a single [x,y] coordinate for the centre of movement. Obviously if your needs are different you may find you need to diverge a bit from here on.</p>

<p>Secondly we've added a couple of lines which are triggered by the pixel having motion. Basically it's not too hard to see that if the pixel does have motion we pass it's x and y coordinate into the appropriate array and save it for later.</p>

<p>OK so time for a bit of a recap, a quick list of what we're doing so far.</p>

<ol>
<li>we take a snap shot of the video.</li>
<li>a bit later (next frame) we take another snap.</li>
<li>Using these 2 we compare a grid of pixels to detect change.</li>
<li>If the change is great enough we store the pixel's coordinates.</li>
</ol>
At this point I have to reiterate that it's really up to you what you do with this information, there are so many possibilities, but for our purposes here I'll assume that you want the detected motion to be used to control an object (in our case the snowman).</p>

<p>In order to do this what you need is to somehow translate those arrays of coordinates into a single value. Once you have this value you can apply it to your snowman either as a coordinate, a speed or perhaps even an acceleration. In our case we were only ever interested in the <em>xcoords</em> array because it was only horizontal movement we wanted to generate but all the following could be done perfectly well for the <em>ycoords</em> too.</p>

<p>There are many ways to turn a list of values into a single representative value,. The most obvious is to simply find the average, but there are others. We tried out a few different approaches before landing on something known as a "trimmed mean". This basically is like an average but instead of taking the entire list you kind of trim away values at either end to avoid your average getting distorted by the odd extreme value or two.</p>

<p>Lets dive in.</p>

<pre lang="actionscript">if (xcoords.length &lt; 5)
{
    xcoords.sort();
    var start = xcoords.length/2 - 10/2;
    var section = xcoords.slice(start, start+10);
    var sum=0,i=0;
    while (i &lt; section.length)
    {
        sum += section[i];
        i++;
	}
	var averageX = ( sum / section.length );
}</pre>
<p>First we check the length of the array. We've decided that if there are less that 5 items (i.e. 5 pixels registering motion) then we're going to ignore the motion, if there's that little it's probably incidental and not worth considering.</p>

<p>Next we sort the array so we know that the middle values really are the middle in size. Next we're going to extract a <em>section</em> from the array (this is the trimming bit) we've decided we'll take ten values and we'll do this using the <strong>Array.slice()</strong> method. This method takes two values which define a starting and end point for your section&nbsp; so we find the starting point by finding the centre of the array and couning back 5. Then our<em> section</em> will be 10 items long so the second value is naturally <em>start+10</em>.</p>

<p>Next we whizz through the new <em>section</em> array adding up all the values to create a <em>sum</em> of them all. Once we have the sum of those values we can easily find the average of them by dividing by the number of them (in this case it's 10 but more generically it would be <em>section.length</em>).</p>

<p>So now we have an <em>averageX</em> variable containing a kind of central point for where motion was detected. At first I used this as the x coordinate of the snowman but this created a very jerky movement as the point was often moving around erratically so I started experimenting with moving the snowman towards this point more smoothly and with a bit of speed and acceleration.</p>

<p>So there you have it. Motion detection and snowman control with a webcam. It's not perfect and could probably be improved here and there but it worked for us.</p>

<p>We hope it works for you. ;-)</p>

