import { antTypes } from './ant';


export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export function randomBoolean() {
  return Math.random() >= 0.5;
}

export function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

export function randomAntType() {
  return antTypes[pickRandomProperty(antTypes)];
}


export function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
