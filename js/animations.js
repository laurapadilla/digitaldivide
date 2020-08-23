const carousels = document.querySelectorAll("header h1, footer h2");

const fadeInTimeline = gsap.timeline();

// fade in header on page load
fadeInTimeline
  // fadeout tags
  .set(carousels, { opacity: 0 })
  .to(carousels, { opacity: 1, delay: 1, stagger: 0.5, duration: 1 });

carousels.forEach((carousel) => {
  // get span tag width
  const spanTag = carousel.querySelector("span");
  const spanWidth = spanTag.clientWidth;

  // generate multiple span tags
  for (let i = 0; i < 50; i = i + 1) {
    carousel.appendChild(spanTag.cloneNode(true));
  }

  const movementTimeline = gsap.timeline({
    repeat: -1,
  });
  // making header text move
  movementTimeline
    .set(carousel, { x: 0 })
    .to(carousel, { x: spanWidth * -1, duration: 6, ease: "linear" });
});

function randomizePosition() {
  // get the dimensions of the viewport and remove the size of the div
  var h = $(window).height() - 40;
  var w = $(window).width() - 40;

  var newh = Math.floor(Math.random() * h);
  var neww = Math.floor(Math.random() * w);

  return [newh, neww];
}

// move that virus! using jQuery's animate function, plugging in new coordinates and speed
function animateDiv() {
  var newq = randomizePosition();
  var oldq = $(".virus").offset();
  var speed = calculateSpeed([oldq.top, oldq.left], newq);

  $(".virus").animate({ top: newq[0], left: newq[1] }, speed, function () {
    animateDiv();
  });
}

// speed modifier
function calculateSpeed(prev, next) {
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);
  var greatest = x > y ? x : y;
  var speedModifier = 0.1;
  var speed = Math.ceil(greatest / speedModifier);
  return speed;
}
animateDiv();
