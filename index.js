const createSphere = (key, radius, x, y) => {
  const points = [];

  // for (let i = 0; i <= 360; i += 30) {
  //   const x = Math.round(radius * Math.cos(i * Math.PI / 180));
  //   const y = Math.round(radius * Math.sin(i * Math.PI / 180));
  //   points.push(new PIXI.Point(x, y));
  // }

  const dX = 20
  for (let i = 0; i <= radius * 2; i += dX) {
    points.push(new PIXI.Point(i, y));
  }

  const strip = new PIXI.SimpleRope(PIXI.Texture.from(`images/${key}.png`), points);
  strip.x = x;
  strip.y = y;

  const movementX = (dX) => {
    for (let i = 0; i < points.length; i += 1) {
      points[i].x += dX;
    }
  };

  const movementY = (dY) => {
    for (let i = 0; i < points.length; i += 1) {
      points[i].y += dY;
    }
  }
  return { points, strip, movementX, movementY };
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


const sphere1 = createSphere('sphere-2', 800, 200, 300);
app.stage.addChild(sphere1.strip);
const sphere2 = createSphere('sphere-2', 800, width / 2 + 300, height / 2 + 200);
app.stage.addChild(sphere2.strip);
const sphere3 = createSphere('sphere-3', 800, 0 - 100, height + 200);
app.stage.addChild(sphere3.strip);
console.log(sphere1)
console.log(sphere2)
console.log(sphere3)

app.ticker.add((delta) => {
  sphere1.movementX(dX / 10);
  sphere1.movementY(dY / 10);
  // sprite2.x -= dX / 20;
  // sprite2.y -= dY / 20;
  // sprite3.x -= dX / 30;
  // sprite3.y -= dY / 30;
  // dX = 0;
  // dY = 0;
});
