const [, A, sign] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n")
  .map((line) => line.trim().split(" ").map(Number));

const N = A.length;

let min = Infinity;
let max = -Infinity;

const findPlace = (depth, currentNum) => {
  if (depth === N) {
    max = Math.max(max, currentNum);
    min = Math.min(min, currentNum);
    return;
  }

  const num = A[depth];

  for (let s = 0; s < 4; s++) {
    if (sign[s] > 0) {
      sign[s]--;

      // 연산자를 계산한 뒤
      // 다음 경우의 수를 찾는다
      switch (s) {
        case 0: // 더하기
          findPlace(depth + 1, currentNum + num);
          break;

        case 1: // 빼기
          findPlace(depth + 1, currentNum - num);
          break;

        case 2: // 곱하기
          findPlace(depth + 1, currentNum * num);
          break;

        case 3: // 나누기
          // 나눗셈은 정수 나눗셈으로 몫만 취한다
          // C++14의 기준을 따른다.
          // 즉, 양수로 바꾼 뒤 몫을 취하고, 그 몫을 음수로 바꾼 것과 같다.
          findPlace(
            depth + 1,
            currentNum < 0
              ? (result = Math.ceil(currentNum / num))
              : (result = Math.floor(currentNum / num))
          );
          break;
      }

      // 다른 연산자를 삽입하는 경우의 수를 찾기 위해 결과를 복구한다
      sign[s]++;
    }
  }
  return;
};

findPlace(1, A[0]);
console.log(`${max}\n${min}`);
