With this update, I finally got everything working correctly to add a card and entry form! I was pretty excited to get to this point in the process because I had just gotten the card form to add dynamically. So I was feeling like this part would go pretty smoothly. As a whole it did. I put together the code (you can see it below) and was able to assemble the card pretty smoothly and cleanly. Everything was working perfectly. The text I type in the submission form was showing up correctly in the card and everything looked good. That is, until I clicked the card to flip to the back content. Instead of it switching over to the back content, it just did nothing. I clicked and clicked and nothing happened.

More on that in a sec, but first The code for building the card:

```javascript
var crdFrntSwapTxt = ["cardfront", i].join(""); //define the variables for passing to
//the script to switch between the front and back. This tells the script what the number
//is of the card that is supposed to be flipped
var crdBackSwapTxt = ["cardback", i].join("");
var cardNodeId = ["card", i].join(""); //define the variable to define the number
//of the card that will be used as the overall card id

var spanFrontNode = document.createElement("span"); //create a span
spanFrontNode.className = "card-unused"; //add a css class to the span
spanFrontNode.id = crdFrntTxt; //give the span the id for the script to reference
var spanFrontNodeText = document.createTextNode("Enter A Value"); //create text
//for the span
spanFrontNode.appendChild(spanFrontNodeText); //add the text to the span

var h2FrontNode = document.createElement("h2"); //create H2 tag
h2FrontNode.className = "cardtext"; //give the h2 tag a css class
h2FrontNode.appendChild(spanFrontNode); //add the span that was created above

var divFrontNode = document.createElement("div");
divFrontNode.className = "visible";
divFrontNode.id = crdFrntSwapTxt;
divFrontNode.appendChild(h2FrontNode);

var spanBackNode = document.createElement("span");
spanBackNode.className = "card-unused";
spanBackNode.id = crdBackTxt;
var spanBackNodeText = document.createTextNode("Enter A Value");
spanBackNode.appendChild(spanBackNodeText);

var h2BackNode = document.createElement("h2");
h2BackNode.className = "cardtext";
h2BackNode.appendChild(spanBackNode);

var divBackNode = document.createElement("div");
divBackNode.className = "hidden";
divBackNode.id = crdBackSwapTxt;
divBackNode.appendChild(h2BackNode);

var cardNode = document.createElement("div"); //create div to hold everything in
cardNode.className = "card";
cardNode.id = cardNodeId;
cardNode.onmouseup = function() {
  fnccardswap(crdFrntSwapTxt, crdBackSwapTxt);
};
//add the code that will trigger the function to swap the text
cardNode.appendChild(divFrontNode); //add the front of the card
cardNode.appendChild(divBackNode); //add the back of the card

document.getElementById("cardContainer").appendChild(cardNode); //add the whole
//card to the list of cards
```

So if you looked at the last few posts I've done about this project, you'll see that this code is very similar to what's already been done. It works in reverse to create the inmost part of the hierarchy then keeps adding it to the next element out and so on until everything is put together. So this isn't really what this post is about, though. This post is about one little line of code that took me a day and a half to get to work.

```javascript
cardNode.onmouseup = function() {
  fnccardswap(crdFrntSwapTxt, crdBackSwapTxt);
};
```

This code is what took so long to get working. You might look at it and say, oh, that's nothing that strange. I'm referencing the `cardNode` element that I had just created and adding this `onmouseup` action. What's the big problem? Well, it turns out, nothing was wrong with this code, but I didn't know that until I was so frustrated I wanted to scream.

So like I said above, I put this code in and everything looked perfect. The text was showing up correctly and everything looked good, until I tried to swap the front and back of the new card. Nothing happened. What was wrong? Well, whenever you try to troubleshoot something you have to tear everything apart and work through bit by bit until you figure out the problem. So I could see that everything was assembling ok, so was there a problem with my syntax or structure of that code? I searched a bunch of forums, checked some reference sites and everything came back the same. The structure was correct. I set up extra code to tell me exactly what was being generated by my code so I could see if the new card had all the information it was supposed to have. It appeared that the `mouseup` information wasn't coming through correctly. Was I not able to use `cardNode.onmouseup =` to add this code to my card? I looked for other methods. Nothing worked. I tried adding an event handler in the script to watch for the click and then trigger the function. Still wasn't working. Maybe the text that was being passed to the swap function wasn't coming through correctly. I first tried manually writing in the `cardfront3` and `cardback3` but it didn't change. So I tried to make sure it was even passing the correct information to the swap function.

```javascript
function ping(value, value2) {
  console.log(value + value2);
}
```

This little function takes 2 pieces of information from whatever is calling it and just prints the contents of those bits into the console so I can see if the correct data was being sent to the script. It showed that everything was working correctly. I spent hours going through and trying to figure out the problem. Finally after I couldn't find anything wrong with this new code, I thought maybe the swap function was spelled differently from what I had been referring to. Was there a typo in my function call? Nope. Turns out the problem was in the swap code all along.

So here's how the `textinput` function is written. This is the function that takes the text as the user types it and inserts it into the card.

```javascript
function textinput1(val , cardlocation) {
```

And here's how the swap function was written:

```javascript
document.fnccardswap = function(cardfront, cardback) {
```

Notice something? Yeah. The first one is written `function` then the name of the `function()`. The second one is `document.name` of the `function = function()`. So what was going on? I think that when I wrote the function for the swap I had found some code that I copied off stack overflow or somewhere and it was a different style of syntax. It's probably an older way of writing things our or something. So when I was setting up the function call in my code, it wasn't able to find the function. Turned out that all I had to do was rewrite `document.fnccardswap = function()` as function `fnccardswap()` and boom, it worked. After that I went back through and reverted my many attempts to "correct" my original button code back to the original way I had written it, because that was actually correct, and everything was working perfectly.

So the moral of the story is that persistence pays off. I wanted to run and scream multiple times because every time I thought I had gotten it figured out, nothing would change. Finally after a lot of work I was able to find the problem somewhere that didn't seem like it was a problem. Really, it worked just fine before, why would it be wrong now? Well, it came down to how the `onmouseup` was formatted.

So here it is. The app is now starting to feel more like an app. The user can add as many cards as they want instead of being bound to the number that I hand-coded originally. My next project will be to first clean up the add button into something nicer, probably an SVG icon, then look at allowing the user to delete cards they don't want. At some point I also want to go back through my code and see if there's a way to better organize it so it's simpler. Right now there's a lot of redundancy that I'm sure I can find ways to clean up and organize. Until next time, thanks for reading!

<p class="codepen" data-height="464" data-theme-id="0" data-slug-hash="wGXrdE" data-default-tab="js,result" data-user="rlahoda" data-embed-version="2">See the Pen <a href="http://codepen.io/rlahoda/pen/wGXrdE/">Flashcards v1.3.0</a> by Rob Lahoda (<a href="http://codepen.io/rlahoda">@rlahoda</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js" async=""></script>
