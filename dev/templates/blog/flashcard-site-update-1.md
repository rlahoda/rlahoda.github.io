My next update for the flashcard site is up. I'm calling it version 0.2.1 because the first version was really just the styling and layout. This one introduces actual interactivity. The first goal was to add in the basic ability to hide and show each side of the card. I did some searching around and found that I can use a button to change the CSS visibility style value applied to the text in the div. So to just achieve the basic functionality I was looking for, I created 4 buttons. Each button changed the visibility to either visible or collapse for either the front or the back text of the div.

Here you can see the code for the "Hide Front" button. You can see there's the click detection: "onclick" then it looks for the element based on the ID, in this case it's "cardfront1". Then it changes the style visibility to "collapse".

```Javascript
<input type="button" value="Hide Front" onclick="document.getElementById('cardfront1').style.visibility='collapse'">
```

This is using Javascript inline with the HTML to trigger the function. I think of it as four toggle switches stepping through each state. The first one hides the front then the second one shows the back. To switch it back you first hide the back, then show the front. Obviously, this kind of clunky scripting won't work as a long-term solution, but it's a good start and I can see that I'm able to create the basic functionality that I'm looking for. The other big problem with this approach is that it's definitely not scalable. I can't have a page that's covered in buttons where I'm asking users to click so much to see the contents of each card. So the goal for the next version is to consolidate the scripting into something that's more streamlined and lets the user click once and the transition happens.
