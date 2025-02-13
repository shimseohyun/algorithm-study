const input = require('fs')
    .readFileSync("algorithm-study/park/20250212/input.txt")
    .toString()
    .trim()
    
const [n,k] = input.split(' ').map(Number);
const arr = [];
for (let i = 2; i <= n; i++) {
  arr.push(i);
}
let cnt = 0;
let prime;
let answer;

while (cnt < k) {
  prime = arr[0];
  arr.some((v) => {
    if (v % prime == 0) {
      // 배수 제거
      arr.splice(arr.indexOf(v), 1);
      answer = v;
      cnt++;
    }
    if (cnt === k) {
      return true;
    }
  });
}

console.log(answer);