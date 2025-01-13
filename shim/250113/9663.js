const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd();

// 첫째 줄에 N이 주어진다. (1 ≤ N < 15)
const N = parseInt(input);

// N이 1이면 조건을 만족하는 보드는 1개.
if (N === 1) {
  console.log(1);
  return 0;
}

// N이 2나, 3일때는 조건을 만족하는 보드가 없다.
if (N === 2 || N === 3) {
  console.log(0);
  return 0;
}

let result = 0;
const board = new Array(N);

const isRightPosition = (row, col) => {
  for (let r = 0; r < row; r++) {
    const c = board[r];

    const isSameCol = c === col;

    // y =  x + a (a는 정수)
    // -> a가 같다면 같은 오른쪽 대각선에 있음
    // y - x = a
    const isSameRightDiagonal = col - row === c - r;

    // y = -x + a (a는 정수)
    // -> a가 같다면 같은 왼쪽 대각선에 있음
    // y + x = a
    const isSameLeftDiagonal = col + row === c + r;

    if (isSameCol || isSameRightDiagonal || isSameLeftDiagonal) {
      return false;
    }
  }
  return true;
};

const placeQueen = (row) => {
  // 모든 퀸을 놓은 경우
  if (row === N) {
    result++;
    return;
  }

  for (let col = 0; col < N; col++) {
    if (isRightPosition(row, col)) {
      board[row] = col;
      placeQueen(row + 1);
      board[row] = undefined;
    }
  }
};

placeQueen(0);

console.log(result);
