import { getSkeletonSprite, skeletonAttack } from './skeleton';

export function initialiseGame() {
  let mainCanvas = document.getElementById("mainGame");
  let rendererOptions = {
    antialiasing: false,
    transparent: false,
    resolution: window.devicePixelRatio,
    autoResize: true,
  }
  let app = new PIXI.Application(1000, 1000, {view: mainCanvas}, rendererOptions);
  let skeletonAppear = loadAnimateFrame("skeleton", "appear", 80, 10, 1);
  let skeleton = getSkeletonSprite();

  skeleton.interactive = true;

  skeleton.on('pointerdown', (event) => {
    skeleton.textures = skeletonAttack;
    skeleton.play();
    skeleton.loop = false;
    skeleton.onComplete = skeleton.idle;
  });
  skeleton.x = 300;
  skeleton.y = 300;
  app.stage.addChild(skeleton);
  app.ticker.add(function() {
  });
}

export function loadAnimateFrame(assetFolder, assetPrefix, assetTime, assetMax, assetMin) {
  let frameSet = [];
  for (let i = assetMin; i <= assetMax; i++){
    let frame = {
        texture: PIXI.Texture.fromImage(`./assets/${assetFolder}/${assetPrefix}_${i}.png`),
        time: assetTime
    };
    frameSet.push(frame);
  }
  return frameSet;

}
