[Back to blog posts](./blog.html)

Now that I've passed version 1, I'm at the place where I can start adding UX enhancements that will make the app more usable and intuitive. The first and most important one is hiding the card entry form. It defeats the point of a flashcard app if you can see what the front and back of the cards say because the form to enter the information is visible at the top. So I needed a way to hide the form so users can enter their information, then hide the cards and get practicing. I also wanted to enhance the experience of hiding and showing by having a button that you click with an arrow pointing up when the top is extended and one pointing down when it's hidden.

The first part of hiding the top was to create a small button to sit below the entry form. (If the code looks strange to you, it's because I'm coding in HAML, feel free to view the compiled code in the pen below)

```haml
#updown
    .upDownBtn{:onmouseup => "fncHideTop('inputcontainer')"}
```

First I set the container div with the `id="updown"` to `display: flex`. This allows me to take advantage of the `justify-content` setting in flexbox and set that to `center`. Now my button div inside this container will be nicely centered. Next up is some styling to make it look like a little tab under the form.

```scss
#updown {
  display: flex;
  justify-content: center;
}
.upDownBtn {
  height: 30px;
  width: 60px;
  border-radius: 0 0 30px 30px;
  background-color: $light-neutral;
  display: flex;
  justify-content: center;
}
```

The button itself uses the `border-radius` settings to make it look like a little half-circle tab sticking out from the top. The `background-color` uses a SASS variable to ensure it's the same color as the top entry form and I'll explain the rest a little later.

The next part was to create the actual action of hiding and showing the form. I did this by adding a couple classes called `.slide` and `.slidedown` to the `#inputcontainer` div.

```haml
#inputcontainer.slide.slidedown
```

The `.slide` class adds the actual transition information to the div while the `.slidedown` is used by the script to actually raise and lower the div.

```scss
.slide {
  max-height: 500px;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: linear;
}
.slidedown {
}
```

In this case, the transition specifically is using the `max-height`property to control the div animation. The normal setting is for the div to be at a `max-height: 500px`. You can see that the `.slidedown` style actually doesn't do anything. The script swaps out the `.slidedown` style for an accompanying `.slideup` style that is what actually collapses the div.

```scss
.slideup {
  max-height: 0;
  overflow-y: hidden;
}
```

So the style changes the `max-height` to `0` meaning that it won't take up any space. The `overflow-y` is set to hidden so any content in the div that spills out of the div now that it's collapsed will be hidden. When this style is removed, the div resizes back up to the `max-height` of 500px. Using this technique of the `max-height` might not work in many situations since the div needs a specifically defined height to work correctly, but in this case, I don't want it to get too big because if a user has a ton of cards, the entry form could stretch way farther than I want it to go. So I'm happy to define a max height for this instance.

Now that the button is styled and the appropriate classes are defined and applied, the next step is the script that will trigger the transition. To do this, I basically want the same action to happen that has been happening with most of the rest of this project. I take a class that exists on a div and replace it with a different class. In this case, I'm taking the `.slidedown` class and swapping it for the `.slideup` class and then doing the reverse.

```javascript
window.fncHideTop = function() {
  if (
    document
      .getElementById("inputcontainer")
      .className.match(/(?:^|\s)slidedown(?!\S)/)
  ) {
    document.getElementById(
      "inputcontainer"
    ).className = document
      .getElementById("inputcontainer")
      .className.replace(/(?:^|\s)slidedown(?!\S)/g, " slideup");
    document.getElementById("iconbox").className = document
      .getElementById("iconbox")
      .className.replace(/(?:^|\s)point-up(?!\S)/g, " point-down");
  } else {
    document.getElementById(
      "inputcontainer"
    ).className = document
      .getElementById("inputcontainer")
      .className.replace(/(?:^|\s)slideup(?!\S)/g, " slidedown");
    document.getElementById("iconbox").className = document
      .getElementById("iconbox")
      .className.replace(/(?:^|\s)point-down(?!\S)/g, " point-up");
  }
};
```

So this function, called `fncHideTop`, follows the same pattern as the other functions I've created. I realize I'm not doing anything really surprising or different and I'm sure there are much quicker and easier ways to create code to do what I want, but for now, this works and as I continue to learn more about JavaScript I can come back and refine these scripts some more.

So in the script it is looking for the `#inputcontainer` div and the class `.slidedown`. If that class is present, it will replace it with `.slideup`. If it is not present, it will replace `.slideup` with `.slidedown`.

The next part of the improvements I added with this update go back to the overall user experience. I have been reading some articles about SVG icons. They look pretty awesome and there are ways to implement your own custom icon set. So I got into Illustrator and created a quick arrow icon for my raise/lower button. I actually created a couple icons, one for up and one for down but I decided to change how the icon would be used so I don't need both. Since there are already great tutorials for how to create your own SVG icon set, I won't rewrite it, but I'll direct you to the [CSS Tricks article](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) that I got the information from. So first there's the `#updown` div that holds the `.upDownBtn` div and inside that is another div `#iconbox`. Inside that div is where the SVG is located. This is the icon in the set that I created that's called `#arrows-up`.

```haml
#updown
    upDownBtn{:onmouseup =&gt; "fncHideTop()"}
        #iconbox.point-up
            %svg.icon
                %use{"xlink:href" =&gt; "#arrows-up"}/</pre>
```

So the function continues the same pattern as before with replacing classes on a div to trigger changes.

```javascript
document.getElementById("iconbox").className = document
  .getElementById("iconbox")
  .className.replace(/(?:^|\s)point-up(?!\S)/g, " point-down");
```

In this case the function is looking for the
`#iconbox` div and then swapping the `.point-up` class with a `.point-down` class. Looking at these classes, you can see that the `.point-up` class is again just a blank class that's used as a counterpoint to swap with for the `.point-down` class.

```scss
#iconbox {
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  transition-delay: 0.7s;
}
.point-up {
}
.point-down {
  transform: rotate(180deg) translateY(5px);
}
```

So `#iconbox` is defining the transition settings with the `transition-duration` and `transition-delay`. Then on `.point-down` I used the transform property to rotate the arrows 180 degrees. Initially the idea was that when the form collapsed or expanded the arrows would just switch from up to down but I liked the idea of adding in a little motion to ensure that the user could see the arrows changing direction. The delay is there because when I had it without a delay the arrows would rotate first then the form would collapse or expand. So I added in the delay and now it's a little more balanced.

Finally, there was one more user experience update I added to this. In my previous update I got the code working so that as a user types it is added on-the-fly to the card. One thing that bothered me was that the text I had on the card before it was written: "Enter a Value", would disappear when the user started typing, but if they deleted the contents of the card it wouldn't reappear, the card would just turn blank. So I wanted to modify my function to have the text reappear, with the proper class in place as well so that it would be slightly greyed out. So here's the updated textinput1 function.

```javascript
function textinput1(val, cardlocation) {
  if (val == 0) {
    document.getElementById(cardlocation).innerHTML = "Enter a Value";
    document.getElementById(cardlocation).className = document
      .getElementById(cardlocation)
      .className.replace(/(?:^|\s)card-used(?!\S)/g, " card-unused");
  } else {
    document.getElementById(cardlocation).innerHTML = val;
    document.getElementById(cardlocation).className = document
      .getElementById(cardlocation)
      .className.replace(/(?:^|\s)card-unused(?!\S)/g, " card-used");
  }
}
```

The additions to the function that make the difference are the addition of an if/then step. Originally the function just added the contents of `val` into the html but now it first detects what the contents of `val` are. So `if (val == 0)` the function knows that the entry is blank and it inserts the text "Enter a Value" as well as changing the class to `card-unused`. If the function detects that `val` is not empty, it puts the contents of the variable into the html and changes the class to `card-used`.
