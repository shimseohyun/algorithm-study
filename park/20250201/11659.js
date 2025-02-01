/*
    11659 - 구간합 구하기 4
*/

const input = require('fs')
    .readFileSync("algorithm-study/park/20250201/input.txt")
    .toString()
    .trim()
    .split('\n');
const ans = [];
const [n,m] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
let index = 2;
const dp = Array(n+1).fill(0);
arr.forEach((v,i) =>{
    dp[i+1] = dp[i] + v;
})

// i ~ j 까지 부분합 = 1~j - 1~i-1 
for(let i = 0; i < m; i++){
    const [i,j] = input[index++].split(' ').map(Number);
    ans.push(dp[j] - dp[i-1]);
}

console.log(ans.join('\n'));