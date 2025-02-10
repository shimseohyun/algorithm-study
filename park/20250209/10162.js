const fs = require('fs');
const input = fs.readFileSync('algorithm-study/park/20250209/input.txt')
    .toString()
    .trim()
    .split('\n');

let t = parseInt(input[0]);
const sec = [300, 60, 10];
const result = [];

for (const s of sec) {
    const count = Math.floor(t / s);
    result.push(count);
    t %= s;
}

if (t !== 0) {
    console.log(-1);
} else {
    console.log(result.join(' '));
}
