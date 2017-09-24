import { gameGlobal } from '../game';
import { getAntSprite, antTypes } from '../ant';
import { getMainMenuAntsContainer, getMainMenuStage } from './mainMenuStage';
export const stages = {
  initialStage : new PIXI.Container(),
}

export function loadInitialStage() {
  stages.initialStage = getMainMenuStage();
  switchStage(stages.initialStage);
}

export function switchStage(newStage) {
  if(gameGlobal.app.currentStage !== 'undefined') {
    gameGlobal.app.stage.removeChild(gameGlobal.app.currentStage);
  }
  gameGlobal.app.currentStage = newStage;
  gameGlobal.app.stage.addChild(newStage);
  if(newStage.viewModel !== 'undefined') {
    ko.applyBindings(newStage.viewModel);
  }
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
