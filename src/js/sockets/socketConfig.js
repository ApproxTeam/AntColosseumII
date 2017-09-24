import { initialiseGame, initialiseLoader } from '../gameRender/game.js';
import { recognizeEvent } from '../gameRender/controller.js';

export const socketConfiguration = {
  url: "ws://localhost:8080/AntColosseumServer/game",
  onOpen: function(event) {
    initialiseLoader();
  },
  onClose: function(event) {
    console.log(event);
  },
  onMessage: function(event) {
    recognizeEvent(event);
  },
  onError: function(event) {
    alert("Please try again later");
  }
}
