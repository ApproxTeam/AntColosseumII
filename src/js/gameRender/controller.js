import { doSend } from '../sockets/socketHandler';
import { makeToast } from './toaster';
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


export function tryRegister(nick, password, email) {
  doSend(JSON.stringify(new RegisterAction(nick, password, email)));
}

export const actionTypes = {
  register: "REGISTER"
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

class Response {
  constructor(type, description, notifyType, args) {
    this.type = type;
    this.description = description;
    this.notifyType = notifyType;
    this.args = args;
  }

  proceed() {
    makeToast(this.notifyType.state, this.description, this.notifyType.state.toLowerCase(), 3000, 'bottom-left');
  }
}
