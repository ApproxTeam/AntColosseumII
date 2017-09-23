import { loadAnimateFrame } from './textures';

export const antFrames = {
  idle : 3,
  walk: 7,
  attack: 7,
  die: 11
}

const helper = {};

export let antTypes = {

}

export function loadAnts() {
  antTypes = {
      fireAnt : {
        leftIdle: loadAssetsforAnt("fireant", 70, antFrames.idle, true),
        left : loadAssetsforAnt("fireant", 70, antFrames.walk),
        leftAttack : loadAssetsforAnt("fireant", 70, antFrames.attack),
        leftDie: loadAssetsforAnt("fireant", 70, antFrames.die),
        leftUpIdle: loadAssetsforAnt("fireant", 70, antFrames.idle, true),
        leftUp: loadAssetsforAnt("fireant", 70, antFrames.walk),
        leftUpAttack: loadAssetsforAnt("fireant", 70, antFrames.attack),
        leftUpDie: loadAssetsforAnt("fireant", 70, antFrames.die),
        upIdle: loadAssetsforAnt("fireant", 70, antFrames.idle, true),
        up: loadAssetsforAnt("fireant", 70, antFrames.walk),
        upAttack: loadAssetsforAnt("fireant", 70, antFrames.attack),
        upDie: loadAssetsforAnt("fireant", 70, antFrames.die),
        rightUpIdle: loadAssetsforAnt("fireant", 70, antFrames.idle, true),
        rightUp: loadAssetsforAnt("fireant", 70, antFrames.walk),
        rightUpAttack: loadAssetsforAnt("fireant", 70, antFrames.attack),
        rightUpDie: loadAssetsforAnt("fireant", 70, antFrames.die),
        rightIdle: loadAssetsforAnt("fireant", 70, antFrames.idle, true),
        right: loadAssetsforAnt("fireant", 70, antFrames.walk),
        rightAttack: loadAssetsforAnt("fireant", 70, antFrames.attack),
        rightDie: loadAssetsforAnt("fireant", 70, antFrames.die),
        rightDownIdle: loadAssetsforAnt("fireant", 70, antFrames.idle, true),
        rightDown: loadAssetsforAnt("fireant", 70, antFrames.walk),
        rightDownAttack: loadAssetsforAnt("fireant", 70, antFrames.attack),
        rightDownDie: loadAssetsforAnt("fireant", 70, antFrames.die),
        downIdle: loadAssetsforAnt("fireant", 70, antFrames.idle, true),
        down: loadAssetsforAnt("fireant", 70, antFrames.walk),
        downAttack: loadAssetsforAnt("fireant", 70, antFrames.attack),
        downDie: loadAssetsforAnt("fireant", 70, antFrames.die),
        leftDownIdle: loadAssetsforAnt("fireant", 70, antFrames.idle, true),
        leftDown: loadAssetsforAnt("fireant", 70, antFrames.walk),
        leftDownAttack: loadAssetsforAnt("fireant", 70, antFrames.attack),
        leftDownDie: loadAssetsforAnt("fireant", 70, antFrames.die),
      },
      iceAnt : {
        leftIdle: loadAssetsforAnt("iceant", 70, antFrames.idle, true),
        left : loadAssetsforAnt("iceant", 70, antFrames.walk),
        leftAttack : loadAssetsforAnt("iceant", 70, antFrames.attack),
        leftDie: loadAssetsforAnt("iceant", 70, antFrames.die),
        leftUpIdle: loadAssetsforAnt("iceant", 70, antFrames.idle, true),
        leftUp: loadAssetsforAnt("iceant", 70, antFrames.walk),
        leftUpAttack: loadAssetsforAnt("iceant", 70, antFrames.attack),
        leftUpDie: loadAssetsforAnt("iceant", 70, antFrames.die),
        upIdle: loadAssetsforAnt("iceant", 70, antFrames.idle, true),
        up: loadAssetsforAnt("iceant", 70, antFrames.walk),
        upAttack: loadAssetsforAnt("iceant", 70, antFrames.attack),
        upDie: loadAssetsforAnt("iceant", 70, antFrames.die),
        rightUpIdle: loadAssetsforAnt("iceant", 70, antFrames.idle, true),
        rightUp: loadAssetsforAnt("iceant", 70, antFrames.walk),
        rightUpAttack: loadAssetsforAnt("iceant", 70, antFrames.attack),
        rightUpDie: loadAssetsforAnt("iceant", 70, antFrames.die),
        rightIdle: loadAssetsforAnt("iceant", 70, antFrames.idle, true),
        right: loadAssetsforAnt("iceant", 70, antFrames.walk),
        rightAttack: loadAssetsforAnt("iceant", 70, antFrames.attack),
        rightDie: loadAssetsforAnt("iceant", 70, antFrames.die),
        rightDownIdle: loadAssetsforAnt("iceant", 70, antFrames.idle, true),
        rightDown: loadAssetsforAnt("iceant", 70, antFrames.walk),
        rightDownAttack: loadAssetsforAnt("iceant", 70, antFrames.attack),
        rightDownDie: loadAssetsforAnt("iceant", 70, antFrames.die),
        downIdle: loadAssetsforAnt("iceant", 70, antFrames.idle, true),
        down: loadAssetsforAnt("iceant", 70, antFrames.walk),
        downAttack: loadAssetsforAnt("iceant", 70, antFrames.attack),
        downDie: loadAssetsforAnt("iceant", 70, antFrames.die),
        leftDownIdle: loadAssetsforAnt("iceant", 70, antFrames.idle, true),
        leftDown: loadAssetsforAnt("iceant", 70, antFrames.walk),
        leftDownAttack: loadAssetsforAnt("iceant", 70, antFrames.attack),
        leftDownDie: loadAssetsforAnt("iceant", 70, antFrames.die),
      }
    }
}


export function getAntSprite(antType) {
  let ant = new PIXI.extras.AnimatedSprite(antType.downIdle);
  ant.play();
  ant.loop = false;
  ant.type = antType;
  return ant;
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}


function loadAssetsforAnt(antType, time, frames, viceVersa) {
  if(helper[antType] === undefined) {
    helper[antType] = 0;
  }
  let min = helper[antType];
  let max = min + frames;
  helper[antType] = max + 1;
  console.log(min + " " + max + " " + antType);
  if(viceVersa) {
    return loadAnimateFrame(antType, time, max, min, true);
  } else {
    return loadAnimateFrame(antType, time, max, min);
  }
}
