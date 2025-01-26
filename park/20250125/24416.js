const input = require("fs")
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n');

const n = parseInt(input[0]);
let cnt = 0;
const ans = [];

// 재귀 방식으로 피보나치 계산
const fibo_re = (n) => {
    if (n === 1 || n === 2) {
        cnt++; 
        return 1;
    } else {
        
        return fibo_re(n - 1) + fibo_re(n - 2);
    }
};


cnt = 0; 
fibo_re(n);
ans.push(cnt); 

// 동적 프로그래밍 방식으로 피보나치 계산
const fibo_dp = (n) => {
    const dp = Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 1;
    cnt = 0; 
    for (let i = 3; i <= n; i++) {
        cnt++; 
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};


fibo_dp(n);
ans.push(cnt); 


console.log(ans.join(' '));
