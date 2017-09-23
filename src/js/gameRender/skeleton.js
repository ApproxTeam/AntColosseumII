import { loadAnimateFrame } from './textures';


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
