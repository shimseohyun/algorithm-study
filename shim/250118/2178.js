const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

// 첫째 줄에 두 정수 N, M(2 ≤ N, M ≤ 100)이 주어진다.
const [N, M] = input[0].split(" ").map(Number);

const board = input.slice(1).map((line) => line.split("").map(Number));

const distances = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Infinity)
);

class Queue {
  constructor(size) {
    this.size = size;
    this.que = new Array(size);
    this.front = 0;
    this.back = 0;
  }

  push(value) {
    this.que[this.back++ % this.size] = value;
  }

  pushFront(value) {
    this.que[--this.front % this.size] = value;
  }

  popFront() {
    const value = this.que[this.front % this.size];
    this.que[this.front++ % this.size] = undefined;
    return value;
  }

  isEmpty() {
    return this.front % this.size === this.back % this.size;
  }
}

const checkRoot = (row, col, distance) => {
  // 좌
  if (col > 0) {
    if (distances[row][col - 1] > distance && board[row][col - 1] === 1) {
      que.pushFront([row, col - 1]);

      distances[row][col - 1] = distance;
    }
  }

  // 상
  if (row > 0) {
    if (distances[row - 1][col] > distance && board[row - 1][col] === 1) {
      que.pushFront([row - 1, col]);

      distances[row - 1][col] = distance;
    }
  }

  // 우
  if (col < M - 1) {
    if (distances[row][col + 1] > distance && board[row][col + 1] === 1) {
      que.pushFront([row, col + 1]);

      distances[row][col + 1] = distance;
    }
  }

  // 하
  if (row < N - 1) {
    if (distances[row + 1][col] > distance && board[row + 1][col] === 1) {
      que.pushFront([row + 1, col]);

      distances[row + 1][col] = distance;
    }
  }
};

const que = new Queue(N * M);

que.push([0, 0]);
distances[0][0] = 1;

while (!que.isEmpty()) {
  const [row, col] = que.popFront();
  checkRoot(row, col, distances[row][col] + 1);
}

console.log(distances[N - 1][M - 1]);
