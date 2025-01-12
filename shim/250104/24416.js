// 동적 계획법
// 기본적인 아이디어로 하나의 큰 문제를 여러 개의 작은 문제로 나누어서 그 결과를 저장하여 다시 큰 문제를 해결할 때 사용
// 큰 문제를 작은 문제로 쪼개서 그 답을 저장해두고 재활용

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim();

const n = parseInt(input);

var finCount = 0;
const fin = (n) => {
  if (n === 1 || n === 2) {
    return 1;
  } else {
    finCount++;
    return fin(n - 1) + fin(n - 2);
  }
};

var fibonacciCount = 0;
const f = new Array(n);

const fibonacci = (n) => {
  f[0] = 1;
  f[1] = 1;

  for (let i = 2; i < n; i++) {
    fibonacciCount++;
    f[i] = f[i - 1] + f[i - 2];
  }
  return fibonacci;
};

fin(n);
fibonacci(n);

console.log(finCount + 1, fibonacciCount);

// fin
// 1 n = 5
// 1 [f(4) + f(3)]
// 2 [f(3) + f(2)] [f(2) + f(1)]
// 4 [f(2) + f(1)][2] [2] [1]
// 8번

// fibonacci
// n - 2 회 진행
// 3번

// ---
// 동적 계획법 방식에서는 이전에 계산한 값을 배열에 저장해 두고 재사용.
// 반복문을 사용하므로 중복 계산이 발생하지 않습니다.
