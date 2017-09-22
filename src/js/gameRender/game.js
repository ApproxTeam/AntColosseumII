import { getSkeletonSprite, skeletonAttack } from './skeleton';
import { getAntSprite, antTypes } from './ant';
import { doSend } from '../sockets/socketHandler';
import { getSoundAsset, preDefinedSounds } from './soundUtils';

export const gameGlobal = {
  app: initApplication(),
  soundsLoaded: false,
  loader: PIXI.loader,
}

function initApplication() {
  let mainCanvas = document.getElementById("mainGame");
  let rendererOptions = {
    antialiasing: false,
    transparent: false,
    resolution: window.devicePixelRatio,
    autoResize: true,
  }
  let ratio = window.innerWidth / window.innerHeight;
  let app = new PIXI.Application(window.innerWidth, window.innerHeight, {view: mainCanvas}, rendererOptions);
  window.onresize = function(event) {
      resize(app.renderer, ratio);
  };
  return app;
}

export function initialiseLoader() {
  soundsLoader();
}

function hidePreloaderAndStartGame() {
  jQuery(".preLoader").fadeOut();
  jQuery("#mainGame").fadeIn();
  initialiseGame();
}

function gameLoader() {
  hidePreloaderAndStartGame();
  gameGlobal.loader.onLoad.add(() => {
    hidePreloaderAndStartGame();
  });
}

function soundsLoader() {
  sleep(100).then((() => {
    isSoundsLoaded();
    if(!gameGlobal.soundsLoaded) {
      soundsLoader();
    } else {
      gameLoader();
    }
  }));
}

export function initialiseGame() {
  let ant = getAntSprite(antTypes.fireAnt);

  ant.interactive = true;

  ant.on('pointerdown', (event) => {
    ant.play();
    ant.loop = false;
    ant.onComplete = ant.idle;
  });
  ant.x = 300;
  ant.y = 300;
  gameGlobal.app.stage.addChild(ant);
  preDefinedSounds.entryOfGladiatorsEntry.play();
  gameGlobal.app.ticker.add(function(deltaTime) {
  });
}

function getAnt() {
  let ant = undefined;
  if(randomBoolean()) {
    ant = getAntSprite(antTypes.iceAnt);
  } else {
    ant = getAntSprite(antTypes.fireAnt);
  }
  ant.x = getRandomArbitrary(0, window.innerWidth);
  ant.y = getRandomArbitrary(0, window.innerHeight);
  return ant;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function randomBoolean() {
  return Math.random() >= 0.5;
}

export function loadAnimateFrame(assetFolder, assetPrefix, assetTime, assetMax, assetMin, viceVersa) {
  viceVersa = (typeof viceVersa === 'undefined') ? false : true;
  let frameSet = [];
  for (let i = assetMin; i <= assetMax; i++){
    let frame = {
        texture: PIXI.Texture.fromImage(`./assets/${assetFolder}/${assetPrefix}_${i}.png`),
        time: assetTime
    };
    frameSet.push(frame);
  }
  if(viceVersa) {
    for (let i = assetMax; i >= assetMin; i--){
      let frame = {
          texture: PIXI.Texture.fromImage(`./assets/${assetFolder}/${assetPrefix}_${i}.png`),
          time: assetTime
      };
      frameSet.push(frame);
    }
  }
  return frameSet;

}

function resize(renderer, ratio) {
    if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }
    renderer.view.style.width = w + 'px';
    renderer.view.style.height = h + 'px';
}


export function gameEventRecognizer(event) {
  if(event === "ENTRYEND") {
    preDefinedSounds.entryOfGladiatorLooped.play();

    for(var j = 0; j < 100; j++) {
      sleep(getRandomArbitrary(0, 1000)).then(() => {
          gameGlobal.app.stage.addChild(getAnt());
      });
    }

  }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function isSoundsLoaded() {
  for(var property in preDefinedSounds) {
    if(preDefinedSounds[property].state() !== 'loaded') {
      gameGlobal.soundsLoaded = false;
    }
  }
  gameGlobal.soundsLoaded = true;
}
