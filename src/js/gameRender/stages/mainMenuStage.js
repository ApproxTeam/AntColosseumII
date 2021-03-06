import { stages, getCenterOfWindow, getRendererWidth, getRendererHeight } from './stage';
import { getAntSprite, antTypes } from '../ant';
import { preDefinedSounds } from '../soundUtils';
import { randomAntType, sleep, getRandomArbitrary } from '../randomUtils';
import { tryRegister, tryLogin } from '../controller';
import { makeToast, iconTypes} from '../toaster';

const mainMenuAnts = [];

export function getMainMenuStage() {
  let mainMenu = new PIXI.Container();
  let ant = getAntSprite(antTypes.fireAnt);
  ant.textures = ant.type.down;
  ant.loop = true;
  ant.play();
  ant.interactive = true;

  let center = getCenterOfWindow();
  ant.x = center[0];
  ant.y = center[1];
  ant.anchor.set(0.5);
  ant.scale.set(1.5, 1.5);
  mainMenu.addChild(ant);
  mainMenu.ticker = new PIXI.ticker.Ticker();
  preDefinedSounds.entryOfGladiatorsEntry.play();
  preDefinedSounds.entryOfGladiatorsEntry.once('end', function() {
    preDefinedSounds.entryOfGladiatorLooped.play();
    mainMenu.addChild(getMainMenuAntsContainer());
    mainMenu.ticker.add(moveMainMenuAnts);
  });
  mainMenu.ticker.stop();
  mainMenu.ticker.add((deltaTime) => {
    ant.y += 0.3;
  });
  mainMenu.ticker.start();
  let antColosseumText = new PIXI.Text('Ant Colosseum II', textStyle);
  antColosseumText.x = center[0];
  antColosseumText.y = center[1] - 300;
  antColosseumText.anchor.set(0.5);
  let registerText = createSmallerText("Register", center[0], center[1] - 200);
  let loginText = createSmallerText("Login", center[0], center[1] - 140);
  let helpText = createSmallerText("Help", center[0], center[1] - 80);

  mainMenu.viewModel = new MainMenuViewModel();
  mainMenu.registerDialog = getRegisterDialog(mainMenu);
  mainMenu.loginDialog = getLoginDialog(mainMenu);

  registerText.on('click', function(event) {
    mainMenu.registerDialog.dialog("open");
  });

  loginText.on('click', function(event) {
    mainMenu.loginDialog.dialog("open");
  });
  mainMenu.addChild(antColosseumText);
  mainMenu.addChild(registerText);
  mainMenu.addChild(loginText);
  mainMenu.addChild(helpText);

  return mainMenu;
}

function createSmallerText(text, x, y) {
  let textSprite = new PIXI.Text(text, smallerTextStyle);
  textSprite.x = x;
  textSprite.y = y;
  textSprite.anchor.set(0.5);
  textSprite.interactive = true;
  textSprite.buttonMode = true;
  return textSprite;
}

export function getMainMenuAntsContainer() {
  let container = new PIXI.Container();
  let rendererWidth = getRendererWidth();
  let ants = rendererWidth / 128;
  for(let j = 0; j <= 2; j++) {
    for(let i = 0; i <= ants; i++) {
      let ant = getAntSprite(randomAntType());
      ant.x = i * 128;
      ant.y = j * -100 - 100;
      ant.textures = ant.type.down;
      ant.loop = true;
      ant.play();
      mainMenuAnts.push(ant);
      container.addChild(ant);
    }
  }
  return container;
}

function MainMenuViewModel() {
  this.nickName = ko.observable("");
  this.email = ko.observable("");
  this.password = ko.observable("");
}


let timePassed = 0;
let even = false;
let passedEven = false;
export function moveMainMenuAnts(deltaTime) {
  timePassed += 1;
  mainMenuAnts.forEach(function(ant) {
    ant.y += 0.5;
    if(even && timePassed <= 300) {
      if(!passedEven) {
        ant.y += 0.2;
      } else {
        ant.y += 0.4;
      }
    } else if(!even && timePassed > 300) {
      if(!passedEven) {
        ant.y += 0.4;
      } else {
        ant.y += 0.2;
      }
      if(timePassed >= 600) {
        timePassed = 0;
        passedEven = !passedEven;
      }
    }
    if(ant.y > getRendererHeight() - 200) {
      stages.initialStage.ticker.remove(moveMainMenuAnts);
      mainMenuAnts.forEach(function(ant) {
        sleep(getRandomArbitrary(100, 1000)).then(() => {
          ant.textures = ant.type.downIdle;
          ant.loop = true;
          ant.play();
        });
      });
    }
    even = !even;
  });
}

const textStyle = new PIXI.TextStyle({
    fontFamily: 'Impact',
    fontSize: 50,
    fill: ['#ffffff', '#FFFFFF'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#4a1850',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

const smallerTextStyle = new PIXI.TextStyle({
    fontFamily: 'Impact',
    fontSize: 36,
    fill: ['#ffffff', '#FFFFFF'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#4a1850',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});


function getRegisterDialog(stage) {
  return $( "#registerForm" ).dialog({
      autoOpen: false,
      height: 400,
      width: 450,
      modal: true,
      buttons: {
        "Create an account": getAccountFunction(stage, stage.viewModel),
        Cancel: function() {
          stage.registerDialog.dialog( "close" );
        }
      },
      close: function() {
      }
    });
}

function getLoginDialog(stage) {
  return $( "#loginForm" ).dialog({
      autoOpen: false,
      height: 400,
      width: 450,
      modal: true,
      buttons: {
        "Login": getLoginFunction(stage, stage.viewModel),
        Cancel: function() {
          stage.loginDialog.dialog( "close" );
        }
      },
      close: function() {
      }
    });
}

function getAccountFunction(stage, viewModel) {
  return function() {
    let nickName = viewModel.nickName();
    let password = viewModel.password();
    let email = viewModel.email();
    let validate = validateRegisterForm(nickName, password, email);
    if(validate) {
      tryRegister(nickName, sha256(password), email);
      stage.registerDialog.dialog("close");
    } else {

    }
  }
}

function getLoginFunction(stage, viewModel) {
  return function() {
    let nickName = viewModel.nickName();
    let password = viewModel.password();
    if(validateLoginForm(nickName, password)) {
      tryLogin(nickName, sha256(password));
      stage.loginDialog.dialog("close");
    }
  }
}

//makeToast(heading, text, icon, hideAfter, position)
function validateRegisterForm(nickName, password, email) {
  let result = true;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let time = 3000;
  if(nickName.length <= 3) {
    makeToast("Nickname", "Nickname length have to be more than 3.", iconTypes.warning, time, 'bottom-left');
    time = time + 500;
    result = false;
  }
  if(password.length <= 5) {
    makeToast("Password", "Password length have to be more than 5.", iconTypes.warning, time, 'bottom-left');
    time = time + 500;
    result = false;
  }
  if(!re.test(email)) {
    makeToast("E-mail", "E-mail is incorrect.", iconTypes.warning, time, 'bottom-left');
    time = time + 500;
    result = false;
  }

  return result;
}

function validateLoginForm(login, password) {
  let result = true;
  let time = 3000;
  if(login.length <= 3) {
    makeToast("Nickname", "Nickname length have to be more than 3.", iconTypes.warning, time, 'bottom-left');
    time = time + 500;
    result = false;
  }
  if(password.length <= 5) {
    makeToast("Password", "Password length have to be more than 5.", iconTypes.warning, time, 'bottom-left');
    time = time + 500;
    result = false;
  }
  return result;
}
