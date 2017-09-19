import {
  initSocket
} from './sockets/socketHandler';
import {
  socketConfiguration
} from './sockets/socketConfig';

$(document).ready(function() {
  var webSocket = initSocket(socketConfiguration.url,
    socketConfiguration.onMessage,
    socketConfiguration.onOpen,
    socketConfiguration.onClose,
    socketConfiguration.onError);
});
