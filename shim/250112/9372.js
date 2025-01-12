const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

// 테스트 케이스의 수 T(T ≤ 100)

let i = 1;
const result = [];
while (i < input.length) {
  // 국가의 수 N(2 ≤ N ≤ 1 000)과 비행기의 종류 M(1 ≤ M ≤ 10 000)
  const [N, M] = input[i].split(" ").map(Number);

  result.push(N - 1);
  i = i + M + 1;
}

console.log(result.join("\n"));
