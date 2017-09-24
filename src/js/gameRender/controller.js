import { doSend } from '../sockets/socketHandler';

export function recognizeEvent(event) {
  //
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
