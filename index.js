class Sphere {
  constructor(key, radius, x, y) {
    this.key = key;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.deltaPoints = 50;
    this.points = [];
    this.initPoints();
    this.initStrip();
    this.speed = 10;
    this.targetX = 0;
    this.targetY = 0;
    this.speed = 2;
    this.offset = 100;
    this.movementCountX = 0;
    this.movementCountY = 0;
    this.count = 0;
    this.compressCount = 0;
    this.isCompress = false;
    this.compressOffest = 100;
  }

  initPoints() {
    for (let i = 0; i <= this.radius; i += this.deltaPoints) {
      this.points.push(new PIXI.Point(i, this.y));
    }
    console.log(this.points)
  }

  initStrip() {
    this.strip = new PIXI.SimpleRope(PIXI.Texture.from(`images/${this.key}.png`), this.points);
    this.strip.x = this.x;
    this.strip.y = this.y;
  }

  incMovementCount(x, y) {
    this.movementCountX += x;
    this.movementCountY += y;
  }

  update(delta) {
    const speedX = Math.abs(this.movementCountX) + 100
    const dX = Math.sign(this.movementCountX) * this.speed * delta;
    const dY = Math.sign(this.movementCountY) * this.speed * delta;
    this.movementX(dX);
    this.movementY(dY);
    this.compress(delta);
  }

  movementX(dX) {
    if (Math.ceil(this.movementCountX) === 0) return;
    this.x += dX;
    for (let i = 0; i < this.points.length; i += 1) {
      this.points[i].x += dX;
    }
    this.movementCountX -= dX;
  }

  compress(delta) {
    if (this.compressCount < this.compressOffest && !this.isCompress) {
      this.compressCount += 1;
    } else if (this.compressCount >= this.compressOffest && !this.isCompress) {
      this.isCompress = true;
    } else if (this.isCompress && this.compressCount > 0) {
      this.compressCount -= 1;
    } else if (this.isCompress && this.compressCount <= 0) {
      this.isCompress = false;
    }
    for (let i = 0; i < this.points.length; i += 1) {
      if (!this.isCompress) {
        this.points[i].x += 0.5 * delta;
      } else if (this.isCompress) {
        this.points[i].x -= 0.5 * delta;
      }
    }
  }

  movementY(dY) {
    if (Math.ceil(this.movementCountY) === 0) return;

    this.y += dY;
    for (let i = 0; i < this.points.length; i += 1) {
      this.points[i].y += dY;
    }
    this.movementCountY -= dY;
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
  dX = mouseX - clientX;
  dY = mouseY - clientY;
  mouseX = clientX;
  mouseY = clientY;
}

const app = new PIXI.Application({ width: width, height: height });
document.body.appendChild(app.view);


const sphere1 = new Sphere('sphere-2', 1600, 200, 300);
app.stage.addChild(sphere1.strip);

app.ticker.add((delta) => {
  sphere1.incMovementCount(dX / 10, dY / 10);
  sphere1.update(delta);
  // sphere1.movementX(-dX / 10);
  // sphere1.movementY(-dY / 10);
  // sprite2.x -= dX / 20;
  // sprite2.y -= dY / 20;
  // sprite3.x -= dX / 30;
  // sprite3.y -= dY / 30;
  // dX = 0;
  // dY = 0;
});
