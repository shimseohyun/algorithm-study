const input = require('fs').readFileSync('algorithm-study/park/20250218/input.txt')
    .toString()
    .trim()
    .split('');
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const counts = new Array(26).fill(0);
input.forEach(i => counts[alphabet.indexOf(i)]++);
console.log(counts.join(" "));