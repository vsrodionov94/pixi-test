const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const randomSign = () => randomInteger(0, 1) > 0 ? 1 : -1;

let mouseX;
let mouseY;

let dX = 0;
let dY = 0;

document.addEventListener( 'mousemove', onDocumentMouseMove );

function onDocumentMouseMove({ clientX, clientY }) {
  if (mouseX && mouseY) { 
    dX = mouseX - clientX;
    dY = mouseY - clientY;
  }
  mouseX = clientX;
  mouseY = clientY;
}

const app = new PIXI.Application({ width: 2488, height: 1400});
document.body.appendChild(app.view);
const width = app.screen.width;
const height = app.screen.height;

const container = new PIXI.Container();
app.stage.addChild(container);

const createSprite = (type, x, y, scale = 1) => {
  const sprite = PIXI.Sprite.from(`./images/${type}.png`);
  sprite.anchor.set(0.5);
  sprite.scale.set(scale);
  sprite.position.set(x, y);
  sprite.startX = x;
  sprite.startY = y;
  sprite.alpha = 0.8;
  sprite.target = {
    x: x,
    y: y,
  }
  app.stage.addChild(sprite);
  container.addChild(sprite);
  return sprite;
};
const sprite1 = createSprite('sphere-2', width / 2 - 250, -50, 0.7);
const sprite2 = createSprite('sphere-2', width - 700, height / 2);
const sprite3 = createSprite('sphere-3', 400, height - 80);

const randomMovement = (sprite, delta) => {
  const { x, startX, y, startY, target } = sprite;
  const check = Math.ceil(target.x - x) === 0 && Math.ceil(target.y - y) === 0;
  if (check) {
    const newTarget = {
      x: startX + randomInteger(100, 250) * randomSign(),
      y: startY + randomInteger(100, 250) * randomSign(),
    };
    sprite.target = newTarget;
  } else if (Math.ceil(target.x - x) !== 0) {
    const sign = Math.sign(target.x - x);
    sprite.x += sign * delta / (randomInteger(20, 30) / 10);
  } else if (Math.ceil(target.y - y) !== 0) {
    const sign = Math.sign(target.y - y);
    sprite.y += sign * delta / (randomInteger(20, 30) / 10);
  }
};

app.ticker.add((delta) => {
  randomMovement(sprite1, delta)
  randomMovement(sprite2, delta)
  randomMovement(sprite3, delta)
  sprite1.x += dX / (randomInteger(12, 25));
  sprite1.y += dY / (randomInteger(12, 25));
  sprite2.x -= dX / (randomInteger(12, 25));
  sprite2.y -= dY / (randomInteger(12, 25));
  sprite3.x += dX / (randomInteger(12, 25));
  sprite3.y -= dY / (randomInteger(12, 25));
  dX = 0;
  dY = 0;
});



function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  app.view.style.width = w + 'px';
  app.view.style.height = h + 'px';
}
window.onresize = resize;

resize();