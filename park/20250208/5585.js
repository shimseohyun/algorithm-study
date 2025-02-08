const fs = require('fs');
const input = fs.readFileSync('algorithm-study/park/20250208/input.txt')
    .toString()
    .trim()
    .split('\n');
const n = parseInt(input[0]);
const kind = [500,100,50,10,5,1];
let ans = 0;

let rest = 1000 - n;
for(const k of kind){
    ans += Math.floor(rest / k);
    rest = rest % k;
}
console.log(ans);