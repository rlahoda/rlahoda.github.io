[Back to blog posts](./blog.html)

Ok, this update is a big one, I'm calling this update version 1.0 of the project! In previous versions I established the basic functionality for the front/back information swap, but there was no way to input the contents without going into the code. With this update I hit the point where the user is able to enter the contents themselves. There is code for 7 cards but it would just take some copying and pasting with a little changing of numbers along the way to add more cards. There are also a few additional bits that I added in to snaz it up a little. One is that when the page loads each card has the text "Enter a value" on it and it's at 20% opacity. When the user starts to type something in, that disappears and the new text is shown at full opacity. You'll notice that, unlike the front/back swapping function, I didn't iterate through buttons or something to create the process of adding the text into each card. That's because I'm getting a little more comfortable with the scripting so I was able to work things out better as I went.

So getting into the code a bit, the first big feature was that I added a function that adds the text a user writes to the corresponding card. First the HTML for the input:

```html
<input
  class="cardinput"
  onkeyup="textinput2(this.value , 'crdfrnt1')"
  type="text"
/>
```

So I used the

```html
<a
  href="http://www.w3schools.com/jsref/event_onkeyup.asp"
  target="_blank"
  rel="noopener noreferrer"
  >onkeyup</a
>
```

event to trigger the function `textinput2` (it's called "2" because I had tried a different method that didn't work correctly so I tried this way and it worked). As I learned in a previous version of this project, I was able to pass information to populate variables in the function by putting it inside the parenthesis. So for this function, the first value was the value of the key press, noted by `this.value`. The second refers to a span ID that tells the function where to add the content. One thing I want to point out, if you're a newb at JS like I am you might not realize that there's a reason why I put the single quotes around `'crdfrnt1'` but not around `this.value`. The reason is that I want the actual word `'crdfrnt1'` to be passed into the function variable but `this.value` is actually a variable itself, pointing to the value that was entered each keystroke.

Next is the function itself:

```javascript
  function textinput2(val , cardlocation) {
    document.getElementById(cardlocation).innerHTML = val;
```

In this case the function again uses `getElementById` to find the specified element with the Id that matches whatever value is passed to that variable. Based on the HTML above, the value for that would be `crdfrnt1`. In this case it uses the `innerHTML` property which inserts HTML into wherever you specify. In my case, I've used the variable `val` to pass the information for each keystroke. So the chain of events starts with typing in the input, which triggers the function and populates the variables with the contents of each keystroke and the id of the span where the information is going to be inserted. Then function takes those values and finds the span in the HTML and inserts the information into it. Below you can see the span that this is being pointed at.

```html
<h2 class="cardtext">
  <span class="card-unused" id="crdfrnt1">Enter a Value</span>
</h2>
```

So the next part I'm going to talk about refers to that span and the initial contents of it. To increase the user experience I wanted users to see what a card would look like with a value in it. This would allow for the initial card layout to look nicer since there would be content in the cards to begin with. I also wanted it to be obvious that those were just unused cards so I pulled back the opacity on the text by adding a new class: `.card-unused` to the span. This meant that if left untouched the user-added text would retain this class so I added to the function a line that would replace the new class with nothing. To do this I reused the code from the card front/back swap and changed some values. For code efficiency, I reused the variable `cardlocation` that points to the span id. This meant that I needed to apply the class to the span instead of the `<div>` or even the `<h2>` tag but it kept things simple because I could reuse a variable instead of having to add an ID to each h2 tag and another variable to the function.

```javascript
document.getElementById(cardlocation).className = document.getElementById(cardlocation).className.replace( /(?:^|\s)card-unused(?!\S)/g , '' );
}
```

As I think about it, I probably could have the text "enter a value" be in the function somehow and add in an if/then statement that would detect if there's anything in the input box and if there isn't, it would put the text in, but that can be for a later version.

So other goals for upcoming versions of this are having the div with the input fields slide up to the top of the screen so it's hidden when the user wants it to be. There would be a button or something that would stay visible to ensure that users are able to pull the window back down and enter/change cards. I also want the ability to add additional cards and possibly delete cards if you don't want them all. Maybe have a delete button for each card so the user can delete a button that they don't want. The big stretch goal is that I want to have a way to add the contents of the cards into the URL so the user is able to bookmark a page and when it loads it auto populates with the contents of the cards they have already created. I want to do this instead of using a database or something because it would get around any need for users to create logins or anything else.
