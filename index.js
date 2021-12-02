class Spere {
  constructor(key, radius, x, y) {
    this.key = key;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dX = 20;
    this.points = [];
    this.initPoints();
    this.initStrip();
    this.velocityX = 0;
    this.velocityY = 0;
    this.speed = 10;
    this.targetX = 0;
    this.targetY = 0;
    this.speed = 10;
    this.offset = 100;
  }

  initPoints() {
    for (let i = 0; i <= this.radius * 2; i += this.dX) {
      this.points.push(new PIXI.Point(i, this.y));
    }
  }

  initStrip() {
    this.strip = new PIXI.SimpleRope(PIXI.Texture.from(`images/${this.key}.png`), this.points);
    this.strip.x = this.x;
    this.strip.y = this.y;
  }

  incVelosityX(x) {
    this.velocityX += x;
  }

  incVelosityX(y) {
    this.velocityY += y;
  }

  update(delta, mouseX, mouseY) {
    // if (mouseX !== this.targetX) {
      this.targetX = mouseX;
      if (Math.abs(this.x - this.targetX) > this.offset) {
        const dX = Math.sign(this.targetX - this.x) * this.speed * delta;
        this.movementX(dX);
      }
    // }
    // if (mouseY !== this.targetY) {
      this.targetY = mouseY;
      if (Math.abs(this.y - this.targetY) > this.offset) {
        const dY = Math.sign(this.targetY - this.y) * this.speed * delta;
        this.movementY(dY);
      }
    // }
  }

  movementX(dX) {
    this.x += dX;
    if (dX > 0) {
      for (let i = 0; i < this.points.length; i += 1) {
        this.points[i].x += dX * (i / 10);
      }
    } else {
      for (let i = 0; i < this.points.length; i += 1) {
        this.points[i].x += dX * ((this.points.length - i) / 10);
      }
    }
    console.log(dX)
  };

  movementY(dY) {
    this.y += dY;
    if (dY > 0) {
      for (let i = 0; i < this.points.length; i += 1) {
        this.points[i].y += dY * (i / 10);
      }
    } else {
      for (let i = 0; i < this.points.length; i += 1) {
        this.points[i].y += dY * ((this.points.length - i) / 10);
      }
    }
  }
};

// const PIXI = require('./pixi');

const width = window.innerWidth;
const height = window.innerHeight;

let mouseX = width / 2;
let mouseY = height / 2;

let dX = 0;
let dY = 0;

document.addEventListener( 'mousemove', onDocumentMouseMove );

function onDocumentMouseMove({ clientX, clientY }) {
  dY = mouseX - clientX;
  dY = mouseY - clientY;
  mouseX = clientX;
  mouseY = clientY;
}

const app = new PIXI.Application({ width: width, height: height });
document.body.appendChild(app.view);


const sphere1 = new Spere('sphere-2', 800, 200, 300);
app.stage.addChild(sphere1.strip);
const sphere2 = new Spere('sphere-2', 800, width / 2 + 300, height / 2 + 200);
app.stage.addChild(sphere2.strip);
const sphere3 = new Spere('sphere-3', 800, 0 - 100, height + 200);
app.stage.addChild(sphere3.strip);
console.log(sphere1)
console.log(sphere2)
console.log(sphere3)

app.ticker.add((delta) => {
  sphere1.update(delta, mouseX, mouseY);
  // sphere1.movementX(-dX / 10);
  // sphere1.movementY(-dY / 10);
  // sprite2.x -= dX / 20;
  // sprite2.y -= dY / 20;
  // sprite3.x -= dX / 30;
  // sprite3.y -= dY / 30;
  // dX = 0;
  // dY = 0;
});
