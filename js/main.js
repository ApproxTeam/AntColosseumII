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

function onClick() {
  doSend(webSocket, "TEST");
  console.log("LEO");

}

var mainGameViewModel = new GameViewModel();
ko.applyBindings(mainGameViewModel);


var socketHandler = {
  onOpen: function(event) {
    console.log(event);
  },
  onClose: function(event) {
    console.log(event);
  },
  onMessage: function(event) {
    console.log(event);
  },
  onError: function(event) {
    console.log(event);
  }
}

var webSocket = initSockets("ws://localhost:8080/OlympiaServer/game", socketHandler.onMessage, socketHandler.onOpen, socketHandler.onClose, socketHandler.onError);
