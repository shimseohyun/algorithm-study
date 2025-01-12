const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim();

const n = parseInt(input);

const getResult = () => {
  result = new Array(n + 2);

  result[0] = 1;
  result[1] = 2;

  // 마지막 타일이 1로 끝나는 경우, 그 앞에는 dp[n-1] 인 수열이 온다
  // dp[4]의 마지막 타일이 1로 끝나는 경우
  // dp[4-1] = {001, 100, 111}
  // dp[4] = {0011, 11000, 1111}

  // 마지막 타일이 00으로 끝나는 경우, 그 앞에는 dp[n-2] 인 수열이 온다
  // dp[4]의 마지막 타일이 00로 끝나는 경우
  // dp[4-2] == {00, 11}
  // dp[4] = {0000, 1100}

  // dp[n] = dp[n-1] + dp[n-2]

  for (let i = 2; i < n; i++) {
    result[i] = (result[i - 1] + result[i - 2]) % 15746;
  }
  console.log(result[n - 1]);
};

getResult();
