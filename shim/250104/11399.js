const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(input[0]);
const timeList = input[1].split(" ").map(Number);

timeList.sort((a, b) => a - b);
var result = 0;

for (let i = 0; i < n; i++) {
  result = result + timeList[i] * (n - i);
}

console.log(result);
