export const socketConfiguration = {
  url: "ws://localhost:8080/OlympiaServer/game",
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
