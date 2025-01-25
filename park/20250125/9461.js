const input = require("fs")
    .readFileSync("algorithm-study/park/20250125/input.txt")
    .toString()
    .trim()
    .split('\n');

const t = parseInt(input[0]);
let index = 1;
const ans = [];
// 점화식 an = an-2 + an-3
for(let i = 0; i < t; i++){
    const n = parseInt(input[index++]);
    const dp = Array(n+1).fill(0);
    dp[1] = 1;
    dp[2] = 1;
    dp[3] = 1;
    for(let k = 4; k <= n; k++)
        dp[k] = dp[k-2] + dp[k-3];
    ans.push(dp[n]);
}
console.log(ans.join('\n'));