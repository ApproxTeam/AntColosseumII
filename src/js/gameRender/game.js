export function initialiseGame() {
  let mainCanvas = document.getElementById("mainGame");
  let app = new PIXI.Application(mainCanvas.width, mainCanvas.height, {view: mainCanvas});
  app.autoResize = true;
  app.backgroundColor = 0x061639;
}
