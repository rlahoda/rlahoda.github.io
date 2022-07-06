Welcome to version 0.2.3! In 0.2.2 I was able to get the basic card contents swapping to function, but there was one hitch: it removed any classes applied to the text. If you go back and try it, click on the first card. When it loads initially, it's got a green background behind the text. Once you click it, though, the background goes away, then you click again and it swaps the contents. The first click removes the `.cardfront` class that's on the card then the second actually swaps the contents. After that initial click, the green background never reappears and the card just keeps switching from the front text to the back. So with this version the goal was to get the other class to stay, and any additional classes I would want to have in the future.

So the core of how this works starts in the if statement of the function.

```Javascript
document.getElementById(cardfront).className.match(/(?:^|\s)visible(?!\S)/) ){
```

So the start is the same:

```javascript
document.getElementById(cardfront);
```

The function is checking the document for an element with an Id that matches the value stored in the
`cardfront` variable. Where it gets a little different is after this point when it checks for a `.className`.

```javascript
.className.match(/(?:^|\s)visible(?!\S)/) ){
```

So it looks at the class names and matches the contents of the string. I'm not going to pretend I knew what this was all about until I googled it, so I'm going to direct you to the real source on [StackOverflow](http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript).

So the poster says:

> An explanation of this regex is as follows:
> `(?:^|\s)#` match the start of the string, or any single whitespace character MyClass # the literal text for the classname to remove `(?!\S)#` negative lookahead to verify the above is the whole classname # ensures there is no non-space character following # (i.e. must be end of string or a space)

So the important thing, for me, is that I'm able to insert my class in the middle of the string and it's able to find the class and work with it instead of just doing a blanket removal of all classes to add a single specific class. At some point I need to understand more of the regex string that the original poster used but for now, I'm just thankful (again) that there are other people who are smarter than me and understand that specifically more than I do.

The next goal is probably to start working on the input capabilities. Once I get to the point of having the ability to input text and swap front and back, I think I'll call that version 1. So hopefully soon I'll be able to reach that point.
