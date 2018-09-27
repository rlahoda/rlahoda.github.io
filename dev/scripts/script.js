
// function boxesHeaderLoop() {
//   let boxes = document.getElementsByClassName("nameImage__container--box");
//   console.log(boxes);
//   let boxesTL = new TimelineMax({repeat:2, repeatDelay:1});
//   for (var i = 0; i < boxes.length; i++) {
//     boxesTL.to(boxes[i], 1.5, {opacity:0});
//     console.log(i);
//   }
// }
//
// TweenMax.staggerFrom(".nameImage__container--box", 2, {opacity:1, yoyo:true, repeat:100, repeatDelay:1}, Math.random() * 2 );

// headerBoxes.addEventListener("click", boxesHeaderFade, false);

// Array.from(headerBoxes).forEach(function(element) {
//       element.addEventListener('click', boxesHeaderFade);
//     });

function getRandom(min,max) {
  let randomNumber = Math.floor(Math.random() * (max-min)) + 1;
  return randomNumber;
}

function boxesHeaderRandom() {
  console.log("yep");
  let randomNumber = getRandom(5,10);
  let tl = new TimelineMax();
  console.log(randomNumber);
  for (var i = 0; i < randomNumber; i++) {
    let randomId = getRandom(1,30);
    let elId = "#nameImage__container--box--" + randomId;
    tl.to(elId, 2, {opacity:0});
    tl.to(elId, 2, {opacity:1});
    console.log(randomId);
  }
}

window.onload = boxesHeaderRandom;

function boxesHeaderFade(id) {
  let tl = new TimelineMax();
  // console.log("yep");
  let elId = "#"+id;
  console.log(elId);
  tl.to(elId, 1.5, {opacity:0});
  tl.to(elId, 1.5, {opacity:1});
  // TweenMax.to(elId, 1.5, {opacity:0,repeat:1,repeatDelay:1, yoyo:true});
}
