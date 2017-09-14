function GameViewModel() {
    var self = this;
    self.resources = ko.observableArray([
      {name: "Rocks", value: 0, icon: '<span class="fa fa-money"/>'},
      {name: "Wood", value: 0, icon: '<span class="fa fa-money"/>'},
      {name: "Bugs", value: 0, icon: '<span class="fa fa-bug"/>'}
    ]);

}

var mainGameViewModel = new GameViewModel();
ko.applyBindings(mainGameViewModel);
