import { stages, getCenterOfWindow, getRendererWidth, getRendererHeight } from './stage';
import { getAntSprite, antTypes } from '../ant';
import { preDefinedSounds } from '../soundUtils';
import { randomAntType, sleep, getRandomArbitrary } from '../randomUtils';

const mainMenuAnts = [];


export function getMainMenuStage() {
  let mainMenu = new PIXI.Container();
  let ant = getAntSprite(antTypes.fireAnt);
  ant.textures = ant.type.down;
  ant.loop = true;
  ant.play();
  ant.interactive = true;

  let center = getCenterOfWindow();
  ant.x = center[0];
  ant.y = center[1];
  ant.anchor.set(0.5);
  ant.scale.set(1.5, 1.5);
  mainMenu.addChild(ant);
  mainMenu.ticker = new PIXI.ticker.Ticker();
  preDefinedSounds.entryOfGladiatorsEntry.play();
  preDefinedSounds.entryOfGladiatorsEntry.once('end', function() {
    preDefinedSounds.entryOfGladiatorLooped.play();
    mainMenu.addChild(getMainMenuAntsContainer());
    mainMenu.ticker.add(moveMainMenuAnts);
  });
  mainMenu.ticker.stop();
  mainMenu.ticker.add((deltaTime) => {
    ant.y += 0.3;
  });
  mainMenu.ticker.start();
  let antColosseumText = new PIXI.Text('Ant Colosseum II', textStyle);
  antColosseumText.x = center[0];
  antColosseumText.y = center[1] - 300;
  antColosseumText.anchor.set(0.5);
  let registerText = createSmallerText("Register", center[0], center[1] - 200);
  let loginText = createSmallerText("Login", center[0], center[1] - 140);
  let helpText = createSmallerText("Help", center[0], center[1] - 80);

  mainMenu.addChild(antColosseumText);
  mainMenu.addChild(registerText);
  mainMenu.addChild(loginText);
  mainMenu.addChild(helpText);

  return mainMenu;
}

function createSmallerText(text, x, y) {
  let textSprite = new PIXI.Text(text, smallerTextStyle);
  textSprite.x = x;
  textSprite.y = y;
  textSprite.anchor.set(0.5);
  textSprite.interactive = true;
  textSprite.buttonMode = true;
  return textSprite;
}

export function getMainMenuAntsContainer() {
  let container = new PIXI.Container();
  let rendererWidth = getRendererWidth();
  let ants = rendererWidth / 128;
  for(let j = 0; j <= 2; j++) {
    for(let i = 0; i <= ants; i++) {
      let ant = getAntSprite(randomAntType());
      ant.x = i * 128;
      ant.y = j * -100 - 100;
      ant.textures = ant.type.down;
      ant.loop = true;
      ant.play();
      mainMenuAnts.push(ant);
      container.addChild(ant);
    }
  }
  return container;
}


let timePassed = 0;
let even = false;
let passedEven = false;
export function moveMainMenuAnts(deltaTime) {
  timePassed += 1;
  mainMenuAnts.forEach(function(ant) {
    ant.y += 0.5;
    if(even && timePassed <= 300) {
      if(!passedEven) {
        ant.y += 0.2;
      } else {
        ant.y += 0.4;
      }
    } else if(!even && timePassed > 300) {
      if(!passedEven) {
        ant.y += 0.4;
      } else {
        ant.y += 0.2;
      }
      if(timePassed >= 600) {
        timePassed = 0;
        passedEven = !passedEven;
      }
    }
    if(ant.y > getRendererHeight() - 200) {
      stages.initialStage.ticker.remove(moveMainMenuAnts);
      mainMenuAnts.forEach(function(ant) {
        sleep(getRandomArbitrary(100, 1000)).then(() => {
          ant.textures = ant.type.downIdle;
          ant.loop = true;
          ant.play();
        });
      });
    }
    even = !even;
  });
}

const textStyle = new PIXI.TextStyle({
    fontFamily: 'Impact',
    fontSize: 50,
    fill: ['#ffffff', '#FFFFFF'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#4a1850',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

const smallerTextStyle = new PIXI.TextStyle({
    fontFamily: 'Impact',
    fontSize: 36,
    fill: ['#ffffff', '#FFFFFF'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#4a1850',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});
