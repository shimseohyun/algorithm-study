const [, A, sign] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n")
  .map((line) => line.trim().split(" ").map(Number));

const N = A.length;

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
    switch (signs[i]) {
      case 0:
        result = result + A[i + 1];
        break;
      case 1:
        result = result - A[i + 1];
        break;
      case 2:
        result = result * A[i + 1];
        break;
      case 3:
        // 나눗셈은 정수 나눗셈으로 몫만 취한다
        // C++14의 기준을 따른다.
        // 즉, 양수로 바꾼 뒤 몫을 취하고, 그 몫을 음수로 바꾼 것과 같다.

        if (result < 0) {
          result = Math.ceil(result / A[i + 1]);
        } else {
          result = Math.floor(result / A[i + 1]);
        }
        break;
    }
  }

  if (result > max) {
    max = result;
  }
  if (min > result) {
    min = result;
  }
}

console.log(`${max}\n${min}`);
