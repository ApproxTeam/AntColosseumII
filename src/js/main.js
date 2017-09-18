import {
  initSocket
} from './sockets/socketHandler';
import {
  socketConfiguration
} from './sockets/socketConfig';

function GameViewModel() {
  var self = this;
  self.resources = ko.observableArray([{
      name: "Rocks",
      value: 0,
      icon: '<span class="fa fa-money"/>'
    },
    {
      name: "Wood",
      value: 0,
      icon: '<span class="fa fa-money"/>'
    },
    {
      name: "Bugs",
      value: 0,
      icon: '<span class="fa fa-bug"/>'
    }
  ]);

}

$(document).ready(function() {
  function onClick() {
    doSend(webSocket, "TEST");
  }


  var mainGameViewModel = new GameViewModel();
  ko.applyBindings(mainGameViewModel);



  var webSocket = initSocket(socketConfiguration.url,
    socketConfiguration.onMessage,
    socketConfiguration.onOpen,
    socketConfiguration.onClose,
    socketConfiguration.onError);
});
