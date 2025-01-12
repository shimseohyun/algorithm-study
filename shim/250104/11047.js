const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

// n = 동전 종류
// k = 가치의 합
const [n, k] = input[0].split(" ").map(Number);
const valueList = input.slice(1).map(Number);

var count = 0;
var left = k;

for (let i = n - 1; i >= 0; i--) {
  if (valueList[i] <= left) {
    count += Math.floor(left / valueList[i]);
    left = left % valueList[i];
  }
}

// k원을 만듣는데 필요한 동전 개수의 최솟값은?
console.log(count);
