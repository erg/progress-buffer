const sleep = require('sleep');

const nums = [..."⓪①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿"];
const moons = [..."🌑🌒🌓🌔🌕🌝🌕🌖🌗🌘🌑🌚"];
const moons2 = [..."🌑🌒🌓🌔🌕🌖🌗🌘"];
const smilies = [..."😶😐🙂😀😃😄😁😆"];
const clocks =  [..."🕛🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚"];
const clocks2 = [..."🕧🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦"];
const chicken = [..."🥚🐣🐥🐓🍗"];

const theme = nums;

function printBuffer(buffer) {
  let linesWritten = 0;
  const len = Object.keys(buffer).length;
  for (const key in buffer) {
    const [col, state] = buffer[key];
    const line = ' '.repeat(Math.max(0, col)) + theme[state % theme.length];
    process.stdout.write(line + '\n');
    linesWritten += 1;
  }
  return linesWritten;
}

function eraseBuffer(linesWritten) {
  const erase = (linesWritten == 0) ? '\33[2K\r': '\33[2K\033[F\33[2K\r'.repeat(linesWritten);
  process.stdout.write(erase);
}

// [a,b)
function randomInt(min_in, max_in) {
  const min = Math.ceil(min_in);
  const max = Math.floor(max_in);
  return Math.floor(Math.random() * (max - min)) + min;
}

function main() {
  const buffer = {};
  
  for (let i = 0; i < process.stdout.rows - 2; i++) {
    const col = randomInt(0, process.stdout.columns - 2);
    const state = randomInt(0, theme.length);
    buffer[i] = [0, state];
  }

  do {
    const linesWritten = printBuffer(buffer);
    sleep.usleep(100000);
    eraseBuffer(linesWritten);
    const len = Object.keys(buffer).length;
    for (const key in buffer) {
      const [col, state] = buffer[key];
      if(col >= process.stdout.columns - 2) {
        delete buffer[key];
      } else {
        const r = randomInt(0, 5);
        buffer[key] = [Math.min(col + r, process.stdout.columns - 2), state + 1];
      }
    }
  } while(Object.keys(buffer).length > 0);
}

main();
