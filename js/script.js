let font;
let points;

function preload() {
  font = loadFont("fonts/FaktPro-SemiBold.otf");
}

function setup() {
  createCanvas(1350, 600);

  points = font.textToPoints("digital divide", 100, 330, 180, {
    sampleFactor: 0.1,
    simplifyThreshold: 0,
  });
}

// draws circles first
// then draw the lines (vertex)
function draw() {
  // noise level
  const nl = 0.01;
  background("#000");

  //   fill for anything below this
  fill("white");
  noStroke();

  points.forEach((point) => {
    // how far away the point is from mouse
    const distance = createVector(point.x - mouseX, point.y - mouseY);
    // take distance and multiply it by 60 and magnify it
    const distortion = distance.mult(60 / distance.mag());

    circle(point.x + distortion.x, point.y + distortion.y, 5);
  });

  // this applies to the vertext below and
  // won't affect what's above
  noFill();
  stroke("white");

  beginShape();
  points.forEach((point) => {
    const distance = createVector(point.x - mouseX, point.y - mouseY);
    const distortion = distance.mult(60 / distance.mag());

    const nx = 40 * noise(nl * point.x, nl * point.y, nl * frameCount) - 20;
    const ny = 40 * noise(nl * point.x, nl * point.y, nl * frameCount) - 20;

    vertex(point.x + distortion.x + nx, point.y + distortion.y + ny);
  });
  endShape();
}
