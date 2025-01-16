const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

// 첫째 줄에 수의 개수 N(2 ≤ N ≤ 11)가 주어진다.
const N = parseInt(input[0]);

// 둘째 줄에는 A1, A2, ..., AN이 주어진다. (1 ≤ Ai ≤ 100)
const A = input[1].split(" ").map(Number);

// 차례대로 덧셈(+)의 개수, 뺄셈(-)의 개수, 곱셈(×)의 개수, 나눗셈(÷)의 개수
const sign = input[2].split(" ").map(Number);
const ADD = 0;
const SUBTRACT = 1;
const MULTIPLICATION = 2;
const DIVISION = 3;

const getResult = (s, result, num) => {
  switch (s) {
    case ADD:
      return result + num;
    case SUBTRACT:
      return result - num;
    case MULTIPLICATION:
      return result * num;
    case DIVISION:
      // 나눗셈은 정수 나눗셈으로 몫만 취한다
      // C++14의 기준을 따른다.
      // 즉, 양수로 바꾼 뒤 몫을 취하고, 그 몫을 음수로 바꾼 것과 같다.

      if (result < 0) {
        return Math.ceil(result / num);
      } else {
        return Math.floor(result / num);
      }
  }
};

const getSignsArr = () => {
  const result = [];

  const findPlace = (signCount, arr) => {
    if (arr.length === N - 1) {
      result.push([...arr]);
    }

    for (let s = 0; s < 4; s++) {
      if (signCount[s] > 0) {
        signCount[s]--;
        arr.push(s);
        findPlace(signCount, arr);
        arr.pop();
        signCount[s]++;
      }
    }
  };

  findPlace(sign, []);
  return result;
};

const signsArr = getSignsArr();
let min = Infinity;
let max = -Infinity;

for (let signs of signsArr) {
  let result = A[0];

  for (let i = 0; i < N - 1; i++) {
    result = getResult(signs[i], result, A[i + 1]);
  }

  if (result > max) {
    max = result;
  }
  if (min > result) {
    min = result;
  }
}

console.log(`${max}\n${min}`);
