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

const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
document.body.appendChild(app.view);
const width = app.screen.width;
const height = app.screen.height;

const container = new PIXI.Container();
app.stage.addChild(container);

const sprite1 = PIXI.Sprite.from('./images/sphere-2.png');
sprite1.anchor.set(0.5);
sprite1.position.set(width / 2 - 150, -150);
sprite1.scale.set(0.5);
app.stage.addChild(sprite1);
container.addChild(sprite1);

const sprite2 = PIXI.Sprite.from('./images/sphere-2.png');
sprite2.anchor.set(0.5);
sprite2.position.set(width - 250, height / 2);
sprite2.scale.set(0.5);
app.stage.addChild(sprite2);
container.addChild(sprite2);

const sprite3 = PIXI.Sprite.from('./images/sphere-3.png');
sprite3.anchor.set(0.5);
sprite3.scale.set(0.7);
sprite3.position.set(200, height - 20);
app.stage.addChild(sprite3);
container.addChild(sprite3);

// const displacementSprite = PIXI.Sprite.from('./images/displace.png');
// const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
// app.stage.addChild(displacementSprite);
// container.filters = [displacementFilter];
// displacementFilter.scale.x = 110;
// displacementFilter.scale.y = 110;
// displacementSprite.anchor.set(0.5);


window.onresize = () => {
  app.resizeTo = window;
  app.resize();
  // console.log(app);
};

app.ticker.add((delta) => {
  // displacementSprite.position.set(mouseX, mouseY);
  sprite1.x += dX / 8;
  sprite1.y += dY / 8;
  sprite2.x -= dX / 8;
  sprite2.y -= dY / 8;
  sprite3.x += dX / 7;
  sprite3.y -= dY / 7;
  dX = 0;
  dY = 0;
});