---
templateKey: blog-post
title: Getting Greensock Animation (GSAP) Running With React Hooks
date: 2020-01-26T20:59:38.188Z
description: >-
  I recently have been working on moving my website from my own twig-based build
  system to Gatsby.js with Netlify CMS. I'm working on a separate blog post for
  a recap on that, but one of the challenges I had with the switch was moving
  the Greensock Animation Platform (GSAP) animations I had set up over to work
  in React.
tags:
  - React
  - Learning
  - GSAP
---
I recently have been working on moving my website from my own twig-based build system to [Gatsby.js](https://www.gatsbyjs.org/) with [Netlify CMS](https://www.netlifycms.org/). I'm working on a separate blog post for a recap on that, but one of the challenges I had with the switch was moving the [Greensock Animation Platform (GSAP)](https://greensock.com/gsap/) animations I had set up over to work in [React](https://reactjs.org/). Since React has its own way of doing some things compared to straight Javascript, I did some digging around to find a good solution for what the differences would be. 

_**Please Note:** This post assumes you have a knowledge of working with GSAP. If not, it will be best to first learn about the platform in a standard Javascript project before moving it into a React project_

The first major difference is that React doesn't let you directly access the document object model (DOM) to directly interact with elements on the page. To get around this, GSAP suggests that you use refs to do this direct manipulation. The other thing I learned was that if you create a timeline normally, new timelines will continue to be added every time the page refreshes, which will lead to memory issues. To get around this will mean using some of the lifecycle features in React to only load the code once.

## React Hooks

Since I've been doing most of my work in functional components, I need to use [React Hooks](https://reactjs.org/docs/hooks-intro.html) to replicate some of the necessary lifecycle capabilities. The main one is creating [refs](https://reactjs.org/docs/hooks-reference.html#useref). The other one is using [useEffect()](https://reactjs.org/docs/hooks-reference.html#useeffect) to take the place of [componentDidMount()](https://reactjs.org/docs/state-and-lifecycle.html).

## Using Refs

The process of creating a ref is very simple. Just use `let tl=useRef();` at the top of the component to add a ref. According to the documentation, the `.current` property of the ref is usable to store information that won't change when the component is reloaded, so it's perfect for keeping the timeline in place despite other data changing.

In this case, the ref, in this case we've named it `tl` for "timeline", will be used to store the timeline for the animation:
```js
tl.current = new TimelineMax();
``` 
Then it will be referenced to add the ongoing parameters and information necessary:
```javascript
tl.current.delay(2);
tl2.current.to(id, 1.5, { opacity: 0 });
```
## useEffect()

To make sure that the code is only loaded once, the `useEffect()` hook is used. Since `useEffect()` can cover most of the lifecycle steps, there's a specific way to format it to only load once:
```javascript
  useEffect(() => {
       // code goes here
  }, []);
```
The empty array parameter ( `[]` ) at the end is what is used to ensure that the hook won't be called repeatedly as the component updates. 

## Putting it together

So how this all works together is you need to start by importing GSAP just like you would import any other package:
```Javascript
import gsap from "gsap";
```
**However**, depending on what you're doing, you might only need to import the specific feature you're using, such as `TimelineMax`:
```Javascript
import { TimelineMax } from "gsap";
```
Then you can write your code for the timeline as you normally would, using the `tl.current` ref to store everything and either writing the code directly in `useEffect()` or referencing a function containing it in `useEffect()`. 

This code is running the boxes fading on the front page of this site. It gets a random ID number from 1-28 (there are 28 boxes) and adds a timeline to them to fade out and in at different times. At the end of adding a timeline to a box, it uses the callback to start over again and add a timeline to another box.
```Javascript
// This function just generates a random number between 1 and 28
  function getRandom(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min)) + 1;
    return randomNumber;
  }

// This function chooses a random box and adds the fade out / fade in timeline to it
  function boxesHeaderRandom() {
    tl.current = new TimelineMax();
    for (var i = 0; i < 10; i++) {
      let randomId = getRandom(1, 28);
      let elId = "#nameImage__container--box--" + randomId;
      tl.current.to(elId, 2, { opacity: 0 });
      tl.current.to(elId, 2, { opacity: 1 });
    }
    tl.current.eventCallback("onComplete", boxesHeaderRandom);
  }

// The useEffect() hook is used here to start the sequence once when the component is loaded
  useEffect(() => {
    boxesHeaderRandom();
  }, []);
```
I found that if I didn't import `TimelineMax` directly and tried to just use `gsap.TimelineMax` I got errors, so be sure to import each feature directly. 

## Tying the animation to an element

To take the animation created and actually tie it to one of your elements, the `ref` needs to be referenced by that object. This is done by just adding a `ref` prop to the element in the `return` statement:
```javascript
 return (
      <h2 ref={tl} id="indexTagline" className="pageTagline">
        I Build Websites
      </h2>
  );
}
```
In this instance, the `h2` element has the `ref={tl}` prop added to it to tie the `h2` to the timeline `ref` created earlier.

## Using GSAP Plugins

In one of the animations, I use both the `TextPlugin` and `EasePack` plugins. To get access to the basic plugins that come standard with GSAP, the first step is to import them as you would with any other React project. Most of these can be found by just looking in the `gsap` folder of the `node_modules` directory. There's also an `all` file that is available to export from as well. Some more information can be found at the NPM section on the [GSAP installation page](https://greensock.com/docs/v3/Installation#npm). *Note: I did find more information that was more helpful on the [v2 docs NPM page](https://greensock.com/docs/v2/NPMUsage) but be aware that some things might have changed between v2 and v3 so you might need to double check if you're having issues.*

```javascript
// individual imports

import TextPlugin from "gsap/TextPlugin";
import EasePack from "gsap/EasePack";

// using the "all" file for importing

import {TextPlugin, EasePack} from "gsap/All";
```

Once the plugins are imported, the next step is to register them with GSAP:
```javascript
gsap.registerPlugin(TextPlugin, EasePack);
```
Now they're ready to be used as normal inside the code. No special references are needed like `TextPlugin.text` or something.
```javascript
 tl.current.to("#indexTagline", {
        text: tagline,
        ease: Linear.easeNone,
        delay: 2
      });
```
In the code above, the `text: tagline` reference is using the `TextPlugin` plugin and `ease: Linear.easeNone` references the `EasePack` plugin. So registering the plugins with GSAP is all that's needed to make these function as they would otherwise outside of React.

## Event-based animations

To add an animation based on some kind of event, 

## Finished Component
The finished component takes all of this and pulls it together:
```Javascript
import React, { useRef, useEffect } from "react";

// importing the main GSAP package and the specific feature being used
import gsap, { TimelineMax } from "gsap";
// importing individual plugins
import TextPlugin from "gsap/TextPlugin";
import EasePack from "gsap/EasePack";

function Tagline() {
  // create a ref to be used to store the timeline
  let tl = useRef(); 

  // register plugins with GSAP
  gsap.registerPlugin(TextPlugin, EasePack); 

  let tagLines = [
    "I Tell Stories",
    "I Theme In Drupal",
    "I Take Pictures",
    "I'm A Visual Storyteller",
    "I Make Videos",
    "I Develop In React",
    "I Like Pizza",
    "I Build Websites"
  ];

  useEffect(() => {
    // create the timeline in .current 
    tl.current = new TimelineMax({ repeat: -1 }); 

    // add to the timeline as normal referencing the ref.current
    tl.current.delay(2);
    for (var i = 0; i < tagLines.length; i++) {
      let tagline = tagLines[i];
      // use the plugins as normal
      tl.current.to("#indexTagline", {
        text: tagline,
        ease: Linear.easeNone,
        delay: 2
      });
    }
  }, []);

  return (
    <div className="pageTagline__container">

      {// add the ref to the individual element it needs to tie into}
      <h2 ref={tl} id="indexTagline" className="pageTagline">
        I Build Websites
      </h2>
    </div>
  );
}

export default Tagline;

```
I hope this has been helpful for understanding how to add some GSAP animations to a React project. 

