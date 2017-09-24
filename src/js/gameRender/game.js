import { getSkeletonSprite, skeletonAttack } from './skeleton';
import { getAntSprite, antTypes } from './ant';
import { doSend } from '../sockets/socketHandler';
import { getSoundAsset, preDefinedSounds } from './soundUtils';
import { loadAnimateFrame, initTexturesPreloader } from './textures';
import { getRandomArbitrary, randomBoolean, sleep } from './randomUtils';
import { stages, loadInitialStage } from './stages/stage';

export const gameGlobal = {
  app: initApplication(),
  soundsLoaded: false,
  loader: PIXI.loader,
  progressBar: null,
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
  updateProgressBar(10);
  updateProgressLabel("Loading sounds...");
  soundsLoader();
}

export function initialiseProgressBar() {
    gameGlobal.progressBar = $( "#progressbar" );
    gameGlobal.progressBar.label = $("#progressLabel");
    gameGlobal.progressBar.progressbar({
        value: 0
    });
    updateProgressBar(0);
    updateProgressLabel("Connecting...");
}


export function updateProgressBar(percent) {
  gameGlobal.progressBar.progressbar("value", percent);
}

export function updateProgressLabel(label) {
  gameGlobal.progressBar.label.text(label);
}


export function hidePreloaderAndStartGame() {
  jQuery("#progressbar").fadeOut();
  jQuery(".preLoader").fadeOut();
  jQuery("#mainGame").fadeIn();
  initialiseGame();
}

function gameLoader() {
  updateProgressLabel("Loading textures...");
  initTexturesPreloader();
}

function soundsLoader() {
  sleep(100).then(() => {
    isSoundsLoaded();
    if(!gameGlobal.soundsLoaded) {
      soundsLoader();
    } else {
      updateProgressBar(30);
      updateProgressLabel("Sounds loaded.");
      gameLoader();
    }
  });
}

export function initialiseGame() {
  loadInitialStage();
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



function isSoundsLoaded() {
  for(var property in preDefinedSounds) {
    if(preDefinedSounds[property].state() !== 'loaded') {
      gameGlobal.soundsLoaded = false;
    }
  }
  gameGlobal.soundsLoaded = true;
}
