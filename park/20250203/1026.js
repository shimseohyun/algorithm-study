const input = require("fs")
    .readFileSync("algorithm-study/park/20250203/input.txt")
    .toString()
    .trim()
    .split('\n');
const n = parseInt(input[0]);
//큰거 x 작은거 해야 최소
const A = input[1].split(' ').map(Number).sort((a,b) => a-b);
const B = input[2].split(' ').map(Number).sort((a,b) => b-a);

let sum = 0;
for(let i = 0; i < n; i++)
    sum += A[i]*B[i];
console.log(sum);


