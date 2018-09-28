

function getRandom(min,max) {
  let randomNumber = Math.floor(Math.random() * (max-min)) + 1;
  return randomNumber;
}

function boxesHeaderRandom() {
  let tl = new TimelineMax();
  for (var i = 0; i < 10; i++) {
    let randomId = getRandom(1,28);
    let elId = "#nameImage__container--box--" + randomId;
    tl.to(elId, 2, {opacity:0});
    tl.to(elId, 2, {opacity:1});
  }
  tl.eventCallback("onComplete", boxesHeaderRandom);
}

window.onload = function(){
  boxesHeaderRandom();
  pageTaglineLoop();
}

function boxesHeaderFade(id) {
  let tl = new TimelineMax();
  // console.log("yep");
  let elId = "#"+id;
  console.log(elId);
  tl.to(elId, 1.5, {opacity:0});
  tl.to(elId, 1.5, {opacity:1});
  // TweenMax.to(elId, 1.5, {opacity:0,repeat:1,repeatDelay:1, yoyo:true});
}

// window.onload = pageTaglineLoop;

function pageTaglineLoop() {
  let tagLines = ["I Tell Stories", "I Theme In Drupal", "I Take Pictures", "I Make Videos", "I Like Pizza", "I Build Websites"];
  let tl = new TimelineMax({repeat: -1});
  tl.delay(2);
  for (var i = 0; i < tagLines.length; i++) {
    let tagline = tagLines[i];
    // console.log(tagline);
    tl.to(".pageTagline", 1, {text:tagline, ease:Linear.easeNone, delay:2});

  }
  }
