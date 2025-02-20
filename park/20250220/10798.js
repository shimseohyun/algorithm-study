const input = require('fs').readFileSync('algorithm-study/park/20250220/input.txt')
    .toString()
    .trim()
    .split("\n");


let ans = '';

for (let j = 0; j < 15; j++) {
    for (let i = 0; i < 5; i++) {
        if (input[i][j] === undefined) continue;
        ans += input[i][j];
    }
}
console.log(ans);