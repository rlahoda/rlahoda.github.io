[Back to blog posts](./blog.html)

I've always wanted to really get some more usable information out of my analytics reports. So far, all I've really ever done is just paste in the basic Google Analytics (GA) code and call it a day. I poke around the reports and kinda think I know what's going on, but getting the really helpful information out if it has been a bit of a mystery still. So a couple weeks ago I had lunch with an awesome guy from Lullabot, [Wes Ruvalcaba](https://www.lullabot.com/about/wes-ruvalcaba). He's been doing web development for a long time and I met him at DrupalCamp PA last summer...which reminds me, I was going to write a post about that but forgot... So anyway, he gave me a couple really good tips that have helped me get started on the path of learning more about Google Analytics.

He was telling me about some UX stuff he had worked on and how he had figured out a way to track how far down a page users read on a website. I mentioned that I had tried to find information online about this but nothing I had ever found was very useful. He said that I shouldn't try to find a pre-fab script since most of them are pretty lousy. Instead, he recommended that I try to come up with something myself by measuring the overall page height and then figuring out how far the user scrolls and set up JavaScript triggers to happen at various intervals. Then I should figure out how to trigger GA events and tie them into the JS triggers.

So then I did some research. Step 1 was to find some JavaScript that would measure the total height of the page in pixels. I searched around and found some JQuery code that would measure the height of a page, but I wasn't looking for JQuery, just straight JavaScript. So I finally came across an [answer on Stack Overflow](http://stackoverflow.com/questions/11077475/how-to-get-exact-height-of-body-of-the-webbrowser-window) that explained the vanilla JS equivalent of the JQuery code.

```javascript
var height = documentHeight();
function documentHeight() {
  return Math.max(
    document.documentElement.clientHeight,
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight
  );
}
```

So this function uses `Math.max` to check through different document size checks and take the biggest one. Depending on the browser, these values can be different so `Math.max` takes each of these values and figures out which was the largest and uses that as the value for `height`.

Now that I have the `height` of the overall page, I take that value and divide it by 4 to figure out how big a quarter of the page is and create a variable with this value, in my case called `hQuarter`. This part is customizable depending on how many segments you want to divide it by. So I set variables at the value of `hQuarter*2` and `hQuarter*3` to determine the 1/2 and 3/4 values.

Next I have to figure out where the window is scrolled at. To find this I use `window.scrollY`. From MDN:

> Returns the number of pixels that the document has already been scrolled vertically.

This means that it figures out where the top of the page has scrolled to. So the initial value is 0 if the user is at the top of the screen. As they scroll down, though, this value never reaches the equivalent of the total height of the page because it doesn't take into account the height of the user's window. So to compensate, I needed to measure the user's window. This was accomplished using `window.innerHeight` From the [MDN description](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight) this is:

> Height (in pixels) of the browser window viewport including, if rendered, the horizontal scrollbar.

By adding that to the `window.scrollY` value, I can see where the bottom of the user's window has scrolled to. So if they scroll to the bottom of the page the value will equal the total `height` value.

So now I know how tall the page is overall and I know how much the user has scrolled and I know the values for the 1/4, 1/2, and 3/4 heights of the page. So all that's left is to set up some kind of trigger when the scroll value matches the various points along the way. This is accomplished through some simple if statements.

My first instinct was to say if the scroll value is equal to the 1/4 value, then do something. But I noticed that, in practice, the value would not usually register. The scroll value would jump by 2, 5, 10, 20 pixels or more depending on how fast I scrolled. So then I thought a range would be good. So maybe up to 100px past the 1/4 value, but that still didn't seem to trigger consistently. So finally I decided to do anything that's equal to or between the 1/4 and 1/2 values. So the actual statement looks like this:

```javascript
if (scroll >= hQuarter && scroll <= hHalf) {
}
```

So now when I scroll past the 1/4 point it's registering correctly, but I don't want to have my analytics filled with tons of indications that someone was scrolling around in the 1/4 section or any of the other sections, I just want 1 indicator. So I put in a small boolean variable to indicate if the scroll value has already passed the 1/4 point and been registered. Then I added into the if statement another condition to check to see if that variable was set to false. If it is, then it will run the action inside the if statement. if it's true, nothing happens. So here's the whole chunk of code I've come up with so far:

```javascript
if (scroll >= hQuarter && scroll <= hHalf && hQuarterMarker == false) {
  console.log("quarter");
  hQuarterMarker = true;
}
```

On the 2nd line you can see the `console.log()` that I was using to verify that my data was going through correctly. This code is repeated for the other values except for the 100% one. For that one, I decided that if someone scrolls almost all the way to the bottom, they might stop before they get to the absolute bottom, but they pretty much read the entire page. So I set that one as giving a 100px buffer before the absolute bottom to capture those people who almost read the whole thing.

So where am I at now? Taking this and transposing it out to the 1/2, 3/4 and full page height values I can now see a message pop up in my console when I scroll past the 1/4, 1/2, 3/4 and at the bottom of the page. So the measurement part is done, time to figure out the GA event code.

This part was actually easier than I thought it would be. I searched a little and found the [Google Analytics Event Tracking page](https://developers.google.com/analytics/devguides/collection/analyticsjs/events).

> Event hits can be sent using the send command and specifying a hitType of event. The send command has the following signature for the event hit type:
> `ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);`

An alternative way of writing out the code which I found more readable and understandable is:

```javascript
ga("send", {
  hitType: "event",
  eventCategory: "Videos",
  eventAction: "play",
  eventLabel: "Fall Campaign"
});
```

_(this is the example code from the GA site so not relevant to my page)_

So using this template I put together my own event code:

```javascript
ga("send", {
  hitType: "event",
  eventCategory: "Blog Posts",
  eventAction: "User Read",
  eventLabel: "Read 25 Percent",
  eventValue: 1
});
```

I also decided to add in the `eventValue`. This is an integer value and I noticed that in the GA interface you can plot out the values on a graph so I figured this would help seeing how users progress through the pages. So it's 1 for 25%, 2 for 50%, 3 for 75% and 4 for 100%.

So there you go! I put the whole thing on my [github page](https://github.com/rlahoda/google-analytics-page-read-amount) so please feel free to take a look at the whole code and let me know any improvements that can be made. I'm still learning this so I'm sure there are many opportunities for improvements as I go.

Another thing he told me about was [Google Analytics Academy](https://analytics.google.com/analytics/academy/). This free course is a series of training videos and interactive trainings that walk you through the process of learning about how GA works and how to understand all the information listed there. I'm through a few of the trainings and it's been really helpful so far. Just with the first few levels I've gone through I'm learning more and understanding with better clarity how GA works and some of the features I never thought about before. So I'm looking forward to getting more understanding and expertise in how to work with compiling and interpreting my site analytics.

So that's what I learned so far. As I continue to learn more I'll try to add more updates on here and get better about updating my blog here.
