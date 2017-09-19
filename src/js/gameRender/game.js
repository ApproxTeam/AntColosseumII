export function initialiseGame() {
  let mainCanvas = document.getElementById("mainGame");
  let app = new PIXI.Application(mainCanvas.width, mainCanvas.height, {view: mainCanvas});
  app.autoResize = true;
  PIXI.loader.add('blob', './assets/blob.png').load(function(loader, resources) {
    var blob = new PIXI.Sprite(resources.blob.texture);
    blob.x = app.renderer.width / 2;
    blob.y = app.renderer.height / 2;
    blob.anchor.x = 0.5;
    blob.anchor.y = 0.5;
    app.stage.addChild(blob);

    app.ticker.add(function() {
        blob.rotation += 0.01;
    });
  });
}
