[Back to blog posts](../blog.html)

It's been a little while since I wrote an update on my project. As I was working on the last one I realized I needed to get a better understanding of what JavaScript is all about. I've been working through Code Academy's free JavaScript course and I'm just about done with that. Once that's done I'm going to continue with some more books and stuff for learning more about JS.

So on to the update.

The first update was 1.1.1 and it's a pretty minor one just adding some user experience improvement. I found in 1.1.0 that if the user put the number 0 in as their value for the card, it would not register as having anything in it. So on the `textinput` function I updated the code from this:

```javascript
function textinput1(val , cardlocation) {
if (val == 0 ){
```

to this:

```javascript
function textinput1(val , cardlocation) {
if (!val || /^\s*$/.test(val)){
```

That regex string tests to make sure that the input field is completely blank and not containing a 0 or even a string of 0's.

<p class="codepen" data-height="266" data-theme-id="0" data-slug-hash="greKwB" data-default-tab="html,result" data-user="rlahoda" data-embed-version="2">See the Pen <a href="http://codepen.io/rlahoda/pen/greKwB/">Flashcards v1.1.1</a> by Rob Lahoda (<a href="http://codepen.io/rlahoda">@rlahoda</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js" async=""></script>

The next update was 1.1.2 and this is where things started getting more interesting. My goal at this point was to start on the path to my next big feature point: the ability to add more cards. This goal is one that's more daunting for me because it involves adding to the [DOM (Document Object Model)](http://www.w3schools.com/js/js_htmldom.asp) which I haven't done up to this point. I've done some minor stuff with changing CSS classes and stuff, but nothing like actually adding things. So in this one I started learning about adding elements and children and appending them to each other. I created a button that would trigger the function to add element and gave my first try at the function. It didn't work.

Here's what I was trying to generate:

```html
<div class="cardform">
  <form>
    <h3>Card 1</h3>
    <p>Card Front:</p>
    <input
      class="cardinput"
      onkeyup="textinput1(this.value , 'crdfrnt1')"
      type="text"
    />
    <p>Card Back:</p>
    <input
      class="cardinput"
      onkeyup="textinput1(this.value , 'crdback1')"
      type="text"
    />
  </form>
</div>
```

So the basic idea was to create a `div` with a `class='cardform'`. Inside that would be nested a form. Inside that would be nested an `<h3>`, 2 `<p>` tags and 2 `<input>` tags. I'm not going to embed the full 1.1.2 pen but if you want to view it, [I'm putting the link to it here](http://codepen.io/rlahoda/pen/EKLBOp?editors=1010). I realized pretty quickly that I needed to step back and first work on a proof of concept to ensure that I actually was able to get this to work at all before I jumped in so deep. So I created a small, simple, ugly proof of concept. The basic concept was to create a script that would add a div with text to the container div. I wanted to have some css classes appended to the div when it was added and be able to auto increment some numbers to line up with the scripts for the live update of text and the hiding and showing of the front and back of the cards. Here's the function I came up with:

```javascript
var i = 1; //declare a variable that will be used as the auto increment value
function myFunction() {
  var node = document.createElement("div"); //create the div to hold everything
  node.className = "visible cardfront" + i; //add the css classes to the div.
  //The second class is cardfront and the + i adds the auto increment value to it
  var textnode = document.createTextNode(
    "This text and div were added by the script " + i
  );
  node.appendChild(textnode); //add the text for the contents of the div
  document.getElementById("container").appendChild(node); //find the "container"
  //div in the DOM, add the "node" variable contents to it at the end of the div
  console.log(node); //write the contents of the "node" variable which contains
  //all of the contents for the div construction in it into the console so I
  //can verify that it's working correctly
  i++; //increment the variable by +1
}
```

I've added a bunch of comments to the code to explain how it works so I won't try to get into that too much more. The basic idea is to use `document.createElement()` to create what you want and then find the location you want it to go with `document.getElementById()` and use `.appendChild()` to put your element in the right place. The end result is a really ugly looking stack of red and green divs that contain a small block of text and an incrementing number to show that it does indeed increment correctly. If you open the console for the pen you can also see that the generated div has all the correct information that I wanted: the css classes including the class with the incrementing number and the text with the incrementing number.

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="rlahoda" data-slug-hash="EKRZjv" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="JS Adding content test">
  <span>See the Pen <a href="https://codepen.io/rlahoda/pen/EKRZjv/">
  JS Adding content test</a> by Rob Lahoda (<a href="https://codepen.io/rlahoda">@rlahoda</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

[Back to blog posts](../blog.html)
