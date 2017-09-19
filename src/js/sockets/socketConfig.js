import { initialiseGame } from '../gameRender/game.js';

export const socketConfiguration = {
  url: "ws://approxteam.ddns.net:7777/AntColosseumServer/game",
  onOpen: function(event) {
    initialiseGame();

  },
  onClose: function(event) {
    console.log(event);
  },
  onMessage: function(event) {
    console.log(event);
  },
  onError: function(event) {
    alert("Please try again later");
  }
}
