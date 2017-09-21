import { loadAnimateFrame } from './game';

export const antMoveLeft = loadAnimateFrame("ant/iceant", "iceant", 70, 255, 0);

export function getAntSprite() {
  let ant = new PIXI.extras.AnimatedSprite(antMoveLeft);
  ant.play();
  ant.loop = false;
  ant.idle = function() {
    ant.textures = antMoveLeft;
    ant.loop = true;
    ant.play();
  }
  ant.onComplete = ant.idle;


  return ant;
}
