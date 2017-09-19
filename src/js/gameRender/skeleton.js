import { loadAnimateFrame } from './game';

export const skeletonAppear = loadAnimateFrame("skeleton", "appear", 80, 10, 1);
export const skeletonIdle = loadAnimateFrame("skeleton", "idle", 80, 6, 1);
export const skeletonWalk = loadAnimateFrame("skeleton", "go", 80, 8, 1);
export const skeletonAttack = loadAnimateFrame("skeleton", "hit", 80, 8, 1);
export const skeletonDie = loadAnimateFrame("skeleton", "die", 80, 8, 1);

export function getSkeletonSprite() {
  let skeleton = new PIXI.extras.AnimatedSprite(skeletonAppear);
  skeleton.scale.set(0.5, 0.5);
  skeleton.play();
  skeleton.loop = false;
  skeleton.idle = function() {
    skeleton.textures = skeletonIdle;
    skeleton.loop = true;
    skeleton.play();
  }
  skeleton.onComplete = skeleton.idle;


  return skeleton;
}
