const sleep = require('sleep');

// https://stackoverflow.com/questions/24531751/how-can-i-split-a-string-containing-emoji-into-an-array
var emojiStringToArray = function (str) {
  split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
  arr = [];
  for (var i = 0; i < split.length; i++) {
    char = split[i]
    if (char !== "") {
      arr.push(char);
    }
  }
  return arr;
};

const nums = "⓪①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿";
const moons = emojiStringToArray("🌑🌒🌓🌔🌕🌝🌕🌖🌗🌘🌑🌚");
const moons2 = emojiStringToArray("🌑🌒🌓🌔🌕🌖🌗🌘");
const smilies = emojiStringToArray("😶😐🙂😀😃😄😁😆");
const clocks =  emojiStringToArray("🕛🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚")
const clocks2 = emojiStringToArray("🕧🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦")
const chicken = emojiStringToArray("🥚🐣🐥🐓🍗");

const theme = chicken;

function printBuffer(buffer) {
  var linesWritten = 0;
  let len = Object.keys(buffer).length;
  for (var key in buffer) {
    let [col, state] = buffer[key];
    let line = ' '.repeat(col) + theme[state % theme.length];
    process.stdout.write(line + '\n');
    linesWritten += 1;
  }
  return linesWritten;
}

function eraseBuffer(linesWritten) {
  var erase = '';
  if(linesWritten == 0) {
    erase = '\33[2K\r'; // necessary
  } else {
    erase = '\33[2K\033[F'.repeat(linesWritten);
  }
  process.stdout.write(erase);
}

// [a,b)
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function main() {
  var buffer = {};
  
  for (var i = 0; i < process.stdout.rows - 2; i++) {
    let col = randomInt(0, process.stdout.columns - 2);
    let state = randomInt(0, theme.length);
    buffer[i] = [0, state]
  }

  do {
    var linesWritten = printBuffer(buffer);
    sleep.usleep(50000);
    eraseBuffer(linesWritten);
    var len = Object.keys(buffer).length;
    for (var key in buffer) {
      let [col, state] = buffer[key];
      if(col == process.stdout.columns - 2) {
        delete buffer[key];
      } else {
        let r = randomInt(0, 2);
        buffer[key] = [col + r, state + 1]
      }
    }
  } while(Object.keys(buffer).length > 0)
}

main();
