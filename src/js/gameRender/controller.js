import { doSend } from '../sockets/socketHandler';
import { makeToast, makeDefaultToast } from './toaster';
import { globals } from '../main';

export function recognizeEvent(event) {
  if(event.type === 'message') {
    recognizeMessage(event);
  }
}

function recognizeMessage(event) {
  let obj = JSON.parse(event.data);
  if(obj.className !== 'undefined') {
    recognizeClass(obj);
  }
}

function recognizeClass(object) {
  if(object.className === 'Response') {
    let response = new Response(object.type, object.description, object.notifyType, object.args);
    response.proceed();
  }
}

export function conditionallySendActivate() {
  let GETParameters = globals.GETParameters;
  if(GETParameters.token !== 'undefined' && GETParameters.nickname !== 'undefined') {
    if(GETParameters.token.length !== 0 && GETParameters.nickname.length !== 0) {
      doSend(JSON.stringify(new ActivateAction(GETParameters.token, GETParameters.nickname)));
    }
  }
}


export function tryRegister(nick, password, email) {
  doSend(JSON.stringify(new RegisterAction(nick, password, email)));
}

export function tryLogin(nick, password) {
  doSend(JSON.stringify(new LoginAction(nick, password)));
}

export const actionTypes = {
  register: "REGISTER",
  login: "LOGIN",
  activate: "ACCOUNTACTIVATION",
}

export class Action {
  constructor(type) {
    this.type = type;
  }
}

export class RegisterAction extends Action {
  constructor(login, password, email) {
    super(actionTypes.register);
    this.registerDivisor = {
      login: login,
      password: password,
      email: email
    }
  }
}

export class LoginAction extends Action {
  constructor(login, password) {
    super(actionTypes.login);
    this.loginDivisor = {
      login: login,
      password: password,
    }
  }
}

export class ActivateAction extends Action {
  constructor(token, nickname) {
    super(actionTypes.activate);
    this.activateDivisor = {
      token: token,
      nickname: nickname,
    }
  }
}

class Response {
  constructor(type, description, notifyType, args) {
    this.type = type;
    this.description = description;
    this.notifyType = notifyType;
    this.args = args;
  }

  proceed() {
    makeDefaultToast(this.notifyType.state, this.description, this.notifyType.state.toLowerCase());
  }
}
