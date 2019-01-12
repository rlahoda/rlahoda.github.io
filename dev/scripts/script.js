function getRandom(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min)) + 1;
  return randomNumber;
}

function boxesHeaderRandom() {
  let tl = new TimelineMax();
  for (var i = 0; i < 10; i++) {
    let randomId = getRandom(1, 28);
    let elId = "#nameImage__container--box--" + randomId;
    tl.to(elId, 2, { opacity: 0 });
    tl.to(elId, 2, { opacity: 1 });
  }
  tl.eventCallback("onComplete", boxesHeaderRandom);
}

window.onload = function() {
  boxesHeaderRandom();
  pageTaglineLoop();
  arrowWiggle();
  addIcons();
};

function boxesHeaderFade(id) {
  let tl = new TimelineMax();
  let elId = "#" + id;
  tl.to(elId, 1.5, { opacity: 0 });
  tl.to(elId, 1.5, { opacity: 1 });
}

function pageTaglineLoop() {
  let tagLines = [
    "I Tell Stories",
    "I Theme In Drupal",
    "I Take Pictures",
    "I'm A Visual Storyteller",
    "I Make Videos",
    "I Build In React",
    "I Like Pizza",
    "I Build Websites"
  ];
  let tl = new TimelineMax({ repeat: -1 });
  tl.delay(2);
  for (var i = 0; i < tagLines.length; i++) {
    let tagline = tagLines[i];
    tl.to("#indexTagline", 1, {
      text: tagline,
      ease: Linear.easeNone,
      delay: 2
    });
  }
}

function arrowWiggle() {
  var tl = new TimelineMax({ repeat: -1 });
  tl.to("#navList__menuLink--arrow", 0.1, {
    opacity: 0,
    ease: "easeIn",
    delay: 1
  });
  tl.yoyo(true);
}

function navListAnimate() {
  let direction = document.getElementById("navList__menuLink");
  let tl = new TimelineMax();

  if (direction.classList.contains("navList_in")) {
    tl.staggerTo(
      ".navList__navItem",
      0.5,
      { opacity: 1, width: "auto", margin: "10px 25px" },
      0.1
    );
    tl.to("#navList__menuLink--arrow", 0.4, { text: "⇨" });
    direction.classList.remove("navList_in");
    direction.classList.add("navList_out");
  } else if (direction.classList.contains("navList_out")) {
    tl.staggerTo(
      ".navList__navItem",
      0.5,
      { opacity: 0, width: 0, margin: "10px 0" },
      0.1
    );
    tl.to("#navList__menuLink--arrow", 0.4, { text: "⇦" });
    direction.classList.remove("navList_out");
    direction.classList.add("navList_in");
  }
}
