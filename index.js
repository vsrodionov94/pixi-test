let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let dX = 0;
let dY = 0;

document.addEventListener( 'mousemove', onDocumentMouseMove );

function onDocumentMouseMove({ clientX, clientY }) {
  dX = mouseX - clientX;
  dY = mouseY - clientY;
  mouseX = clientX;
  mouseY = clientY;
}

const app = new PIXI.Application({ width: 1920, height: 1080});
document.body.appendChild(app.view);
const width = app.screen.width;
const height = app.screen.height;

const container = new PIXI.Container();
app.stage.addChild(container);

const createSprite = (type, x, y, scale = 1) => {
  const sprite = PIXI.Sprite.from(`/images/${type}.png`);
  sprite.anchor.set(0.5);
  sprite.scale.set(scale);
  sprite.position.set(x, y);
  sprite.startX = x;
  sprite.startY = y;
  sprite.alpha = 0.7;
  app.stage.addChild(sprite);
  container.addChild(sprite);
  return sprite;
};
const sprite1 = createSprite('sphere-2', width / 2 - 150, - 150, 0.8);
const sprite2 = createSprite('sphere-2', width - 250, height / 2);
const sprite3 = createSprite('sphere-3', 200, height - 150);

const randomMovement = sprite => {

};

app.ticker.add((delta) => {
  sprite1.x += dX / 8;
  sprite1.y += dY / 8;
  sprite2.x -= dX / 8;
  sprite2.y -= dY / 8;
  sprite3.x += dX / 7;
  sprite3.y -= dY / 7;
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