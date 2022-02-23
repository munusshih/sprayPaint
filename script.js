let walker;
let c;
let sprayX;
let dwell;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  walker = new Walker();
}

function draw() {
  if (pmouseX != mouseX || pmouseY != pmouseY) {
    dwell = millis();
    background(255, 255, 255, 80);
  } else if ((millis() - dwell) < 5000) {
    background(255, 255, 255, 80);
  } else {
    walker.bounce();
    walker.draw();
  }
}

class Walker {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.width = 20;
    this.height = 20;
    this.xSpeed = random(5);
    this.ySpeed = this.xSpeed;
  }
  bounce() {
    if (this.x + this.width >= width) {
      this.xSpeed = -this.xSpeed;
      this.x = width - this.width;
    } else if (this.x <= 0) {
      this.xSpeed = -this.xSpeed;
      this.x = 0;
    }

    if (this.y + this.height >= height) {
      this.ySpeed = -this.ySpeed;
      this.y = height - this.height;
    } else if (this.y <= 0) {
      this.ySpeed = -this.ySpeed;
      this.y = 0;
    }
  }
  draw() {
    this.x += this.xSpeed + noise(frameCount / 100, 0) * 20 - 10;
    this.y += this.ySpeed + noise(frameCount / 100, 1) * 20 - 10;
    sprayPaint(this.x, this.y);
  }
}

function sprayPaint(posX, posY) {
  for (let step = 0; step < 50; step++) {
    for (let i = 0; i < 2 * PI; i += 0.1) {
      noStroke();

      fill(0, 0, 0, 20);
      sprayX = min(random(20), random(20));
      let sizer = map(sprayX, 0, 20, 5, 1);

      // outside circles
      if (random(100) < 0.1) {
        sprayX = (noise(frameCount / 100, i) + noise(frameCount / 100, i)) * 30;
        sizer = 1;
      }

      // 	accidents
      if (random(2000) < 0.1) {
        fill(random(0, 80));
        sprayX += random(10, 30);
        for (let j = 0; j < int(random(3)); j++) {
          circle(
            posX - sprayX * sin(i) + random(5),
            posY - sprayX * cos(i) + random(8),
            random(12)
          );
        }
      }

      circle(posX - sprayX * sin(i), posY - sprayX * cos(i), sizer);

      fill(0);
      circle(posX, posY, 2);
    }
  }
}
