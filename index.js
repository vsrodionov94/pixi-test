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
const sprite = PIXI.Sprite.from('./images/sphere-2.png');
sprite.anchor.set(0.5);
sprite.position.set(width / 2 - 150, height / 2 - 300);
sprite.scale.set(0.5);
app.stage.addChild(sprite);

const sprite2 = PIXI.Sprite.from('./images/sphere-2.png');
sprite2.anchor.set(0.5);
sprite2.position.set(width / 2 + 300, height / 2 + 200);
sprite2.scale.set(0.5);
app.stage.addChild(sprite2);

const sprite3 = PIXI.Sprite.from('./images/sphere-3.png');
sprite3.anchor.set(0.5);
sprite3.scale.set(0.7);
sprite3.position.set(0 - 100, height + 200);

app.stage.addChild(sprite3);

app.ticker.add((delta) => {
  sprite.x -= dX / 10;
  sprite.y -= dY / 10;
  sprite2.x -= dX / 20;
  sprite2.y -= dY / 20;
  sprite3.x -= dX / 30;
  sprite3.y -= dY / 30;
  dX = 0;
  dY = 0;
})

console.log(sprite)