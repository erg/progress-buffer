const sleep = require('sleep');

const nums = "⓪①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿";

function printBuffer(buffer) {
  var wrote = 0;
  let len = Object.keys(buffer).length;
  for (var key in buffer) {
    let col = buffer[key];
    let line = ' '.repeat(col) + nums[Math.min(col, nums.length - 1)];
    process.stdout.write(line + '\n');
    wrote += 1;
  }
  return wrote;
}

function eraseBuffer(buffer, wrote) {
  var erase = '';
  if(wrote == 0) {
    erase = '\33[2K\r'; // necessary
  } else {
    erase = '\33[2K\033[F'.repeat(wrote);
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
    buffer[i] = randomInt(0, nums.length);
  }

  do {
    var wrote = printBuffer(buffer);
    sleep.usleep(20000);
    eraseBuffer(buffer, wrote);
    var len = Object.keys(buffer).length;
    for (var key in buffer) {
      if(buffer[key] == process.stdout.columns - 2) {
        delete buffer[key];
      } else {
        buffer[key] = buffer[key] + 1 % 10;
      }
    }
  } while(Object.keys(buffer).length > 0)
}

main();
