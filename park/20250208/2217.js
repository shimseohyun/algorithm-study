const fs = require('fs');
const input = fs.readFileSync('algorithm-study/park/20250208/input.txt')
    .toString()
    .trim()
    .split('\n');
const n = parseInt(input[0]);
const rope = [];
for(let i = 1; i <= n; i++){
    rope.push(parseInt(input[i]));
}
rope.sort((a,b) => a-b);
let max = 0;

for(let i = 0; i < n; i++){
    const weight = rope[i] * (n-i);
    max = Math.max(max,weight);
}
console.log(max);