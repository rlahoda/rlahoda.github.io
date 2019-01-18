[Back to blog posts](./blog.html)

After my [proof of concept](flashcard-site-update-6.HTML) came together to actually add a div to the DOM on-the-fly, it was time to get back into my actual project and put that into action. I decided to start by adding a new input form when the user clicks the little button I added. The first thing I did was delete most of the extra cards and input forms that I created initially since they would be added in dynamically through the script. Then I started working on the script. The first goal was to use the script to generate this:

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

I deliberately created the original code with the idea that it would be modular and repeatable so pasting this in over and over would create the row of input forms for the cards. The only things that need to be changed are in the `<h3>` tag where the card number would need to be incremented as the user adds new cards and in the `input` the `onkeyup` value `crdfrnt1` would need to be incremented as well.

My approach to this was fairly simple: create a variable that would be auto incremented every time the user adds a new card and use that variable value as the number for each place the number is needed. So I start the script out declaring a variable with the value of 1: `var i = 1;` Then I started working on the function. Like in my proof of concept, I used `document.createElement()` and `.appendChild()` to combine the elements inside each other to build up the full form.

```javascript
function addDiv() {

var crdFrntTxt = ["crdfrnt", i].join('');
var crdBackTxt = ["crdback", i].join('');

var h3Node = document.createElement("h3");      //create the h3 tag
var h3NodeText = document.createTextNode("Card " + i);    //create the text for the h3
  	h3Node.appendChild(h3NodeText);   //add the text to the h3

var pFrontNode = document.createElement("p");  //create the p tag
var pFrontNodeText = document.createTextNode("Card Front:");   //create the text for the p
  	pFrontNode.appendChild(pFrontNodeText);    //add the text to the p

var inputFrontNode = document.createElement("input");   //create input field
  	inputFrontNode.class = "cardinput";   //add the class to the field
  	inputFrontNode.onkeyup = function() { textinput1(this.value , crdFrntTxt); };
          //add the onkeyup function call to the input field for live text updating

var pBackNode = document.createElement("p");
var pBackNodeText = document.createTextNode("Card Back:");
  	pBackNode.appendChild(pBackNodeText);

var inputBackNode = document.createElement("input");
  	inputBackNode.class = "cardinput";
  	inputBackNode.onkeyup = function() { textinput1(this.value , crdBackTxt); };

var formNode = document.createElement("form");  //create the form element
  	formNode.appendChild(h3Node);  //add the h3 and h3 text to the form
  	formNode.appendChild(pFrontNode);  //add the first p tag and its text
  	formNode.appendChild(inputFrontNode);  //add the first input field
  	formNode.appendChild(pBackNode);  //add the second p tag with text
  	formNode.appendChild(inputBackNode);  //add the second input field

var inputNode = document.createElement("div");  //create the container div
    inputNode.className = "cardform";  //add the cardform css class
  	inputNode.appendChild(formNode);  //add the form and all the parts in it to the div
document.getElementById("inputcontainer").appendChild(inputNode); //add the assembled div to the document
```

So this worked great to create the form to enter the information. A couple things that I want to point out. At the top I declared two variables.

```javascript
var crdFrntTxt = ["crdfrnt", i].join("");
var crdBackTxt = ["crdback", i].join("");
```

These are used for the input field to tell it what card to pass the contents to. I'll explain in a moment but first...

**To break down the flow of information through this whole thing here's how it works:**

```javascript
onkeyup = "textinput1(this.value , 'crdfrnt1')";
```

Input field has a function called `textinput1` attached so whenever a user types, everything they type is captured. That function takes 2 pieces of information from the input field: the contents of the user's input (`this.value`) and the location of the card to insert that value into (`'crdfrnt1'`) .

```javascript
function textinput1(val , cardlocation) {
document.getElementById(cardlocation).innerHTML = val;}; <br>//note that this script is greatly simplified from what's actually in the project to make it more understandable
```

The function is looking for 2 variables that it will refer to as `val` and `cardlocation`. It uses `this.value` for the card text that will be added and uses the card value (`'crdfrnt1'`) to fill `cardlocation`. So when the function runs it uses `document.getElementById()` to search the DOM for an item with an ID that matches `cardlocation`, which in this case is `crdfrnt1`. It then uses `.innerHTML` to replace the html content of that item with `this.value`.

**So, back to where we are now.**

If a new card form is going to be generated, then I need to be able to tell it to look for a new card with a number that's going to be different for every card. So using the incrementing value of the variable I declared in the beginning I can take the text that doesn't change: `crdfrnt` and the variable `i` and combine them. In this case I put both of them into an array, denoted by the [] brackets but then used the `.join('')` at the end to just smoosh it all together. I actually could have used `var crdFrntTxt = "crdfrnt" + i;` and that would have worked also, but when I was troubleshooting early on it seemed like that wasn't working so I found out about this so it's just another way to generate the contents. The cool thing with this is that I learned another thing that I wouldn't have otherwise.

If you look at the code you'll notice that the variable is set to 1: `var i = 1;`. This was deliberate because I wanted to be sure that the data was passing correctly to the script. Since at this point I did not have a card div to point to I could point to the first two cards and if they respond correctly it would show the functions and everything were working correctly.

I did have the code set up to create a card, though it was just a blank one to have something there:

```javascript
var cardNode = document.createElement("div");
cardNode.className = "card";
document.getElementById("cardContainer").appendChild(cardNode);
```

In both the dummy card and the actual form I again used `document.getElementById()` to find the appropriate part of the DOM to insert the new piece and then `.appendChild();` to add it in place.

So that's all for this post. The next step is building the card and making sure the text is correctly flowing from the input form to the card itself. Thanks for reading!
