import {
  initSocket
} from './sockets/socketHandler';
import {
  socketConfiguration
} from './sockets/socketConfig';
import {
  initialiseProgressBar
} from './gameRender/game.js';

initialiseProgressBar();

export const globals = {
  webSocket : initSocket(socketConfiguration.url,
   socketConfiguration.onMessage,
   socketConfiguration.onOpen,
   socketConfiguration.onClose,
   socketConfiguration.onError),
  GETParameters : getParameters(),
}



function getParameters() {
  let queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
  return queryDict;
}
