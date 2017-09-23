import { gameGlobal } from '../game';
import { getAntSprite, antTypes } from '../ant';
import { getMainMenuAntsContainer, getMainMenuStage } from './mainMenuStage';
export const stages = {
  initialStage : new PIXI.Container(),
}

export function loadInitialStage() {
  stages.initialStage = getMainMenuStage();
  gameGlobal.app.stage.addChild(stages.initialStage);
}

export function getCenterOfWindow() {
  return [getRendererWidth() / 2, getRendererHeight() / 2]
}

export function getRendererWidth() {
  return gameGlobal.app.renderer.width;
}

export function getRendererHeight() {
  return gameGlobal.app.renderer.height;
}
