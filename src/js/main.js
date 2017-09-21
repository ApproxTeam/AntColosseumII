import {
  initSocket
} from './sockets/socketHandler';
import {
  socketConfiguration
} from './sockets/socketConfig';

export const globals = {
  webSocket : initSocket(socketConfiguration.url,
   socketConfiguration.onMessage,
   socketConfiguration.onOpen,
   socketConfiguration.onClose,
   socketConfiguration.onError)
}
