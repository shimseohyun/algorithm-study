const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

// 첫 번째 줄에는 지도의 크기 N(정사각형이므로 가로와 세로의 크기는 같으며 5≤N≤25)이 입력되고
const N = parseInt(input[0]);
const board = input.slice(1).map((row) => Array.from(row).map(Number));

const apartment = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => undefined)
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

  pop() {
    const value = this.que[this.front % this.size];
    this.que[this.front++ % this.size] = undefined;
    return value;
  }

  isEmpty() {
    return this.front % this.size == this.back % this.size;
  }
}
const checkApartment = (row, col, currentApartment, que) => {
  // 상
  if (row - 1 >= 0 && apartment[row - 1][col] === undefined) {
    if (board[row - 1][col] === 1) {
      apartment[row - 1][col] = currentApartment;
      que.push([row - 1, col]);
    }
  }

  // 하
  if (row + 1 < N && apartment[row + 1][col] === undefined) {
    if (board[row + 1][col] === 1) {
      apartment[row + 1][col] = currentApartment;
      que.push([row + 1, col]);
    }
  }

  // 좌
  if (col - 1 >= 0 && apartment[row][col - 1] === undefined) {
    if (board[row][col - 1] === 1) {
      apartment[row][col - 1] = currentApartment;
      que.push([row, col - 1]);
    }
  }

  // 우
  if (col + 1 < N && apartment[row][col + 1] === undefined) {
    if (board[row][col + 1] === 1) {
      apartment[row][col + 1] = currentApartment;
      que.push([row, col + 1]);
    }
  }
};

let apartmentIndex = 0;
const result = [];

for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (board[r][c] === 1 && apartment[r][c] === undefined) {
      // 새로운 아파트 하나 생성
      const que = new Queue(N * N);
      que.push([r, c]);
      apartment[r][c] = apartmentIndex;

      // 결과에 아파트 단지 추가
      // index = apartmentIndex
      result.push(0);

      // 아파트 탐색 시작
      while (!que.isEmpty()) {
        const [row, col] = que.pop();

        // 단지 개수 추가
        result[apartmentIndex]++;

        // 단지를 기준으로 상하좌우 확인
        // 같은 아파트인경우 que에 추가하고 재탐색
        checkApartment(row, col, apartmentIndex, que);
      }

      apartmentIndex++;
    }
  }
}

result.sort((a, b) => a - b);
console.log([apartmentIndex, result.join("\n")].join("\n"));
