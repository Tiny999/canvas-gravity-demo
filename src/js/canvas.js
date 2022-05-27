import utils, { randomIntFromRange } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

const gravity = 1;
const friction = 0.95;

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Ball {
  constructor(x, y, dy, dx, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx * friction;
    }

    // Friction on x axis
    if (this.y + this.radius >= canvas.height) {
      this.x -= this.dx * friction
    }



    this.y += this.dy;
    this.x += this.dx;
    this.draw();
  }
}

// Implementation
const ballArray = [];
let ball;
function init() {
  for (let i = 0; i < 400; i++) {
    const radius = utils.randomIntFromRange(10, 30);
    const color = utils.randomColor(colors)
    const x = utils.randomIntFromRange(radius, canvas.width - radius);
    const y = utils.randomIntFromRange(0, canvas.height - radius);
    const dx = utils.randomIntFromRange(-2, 2);
    const dy = utils.randomIntFromRange(-2, 2);
    ballArray.push(new Ball(x, y, dy, dx, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.fillText('HTML CANVAS GRAVITY DEMO', mouse.x, mouse.y)

  ballArray.forEach((ball) => {
    ball.update();
  });
}

init();
animate();
