const input = require("fs")
    .readFileSync("algorithm-study/park/20250125/input.txt")
    .toString()
    .trim();
const n = parseInt(input);

//풀어보니 점화식 -> an = an-1 + an-2

const dp = Array(n+1).fill(0);
dp[1] = 1;
dp[2] = 2;
for(let i = 3; i <= n; i++){
    dp[i] = (dp[i-1] + dp[i-2]) % 15746;
}
console.log(dp[n]);