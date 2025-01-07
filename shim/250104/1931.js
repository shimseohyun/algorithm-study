const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(input[0]);

// 공백을 사이에 두고 회의의 시작시간과 끝나는 시간이 주어진다.
var list = input.slice(1).map((item) => item.split(" ").map(Number));
list = list.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

var result = 0;
var endTime = 0;

for (const [start, end] of list) {
  if (endTime <= start) {
    result++;
    endTime = end;
  }
}

console.log(result);
