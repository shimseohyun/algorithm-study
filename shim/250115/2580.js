const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

const ROW = 0;
const COL = 1;
const SQUARE = 2;
const graph = Array.from({ length: 3 }, () =>
  Array.from({ length: 9 }, () => Array.from({ length: 9 + 1 }, () => false))
);
const emptySpace = [];

const getSquare = (row, col) => Math.floor(row / 3) * 3 + Math.floor(col / 3);

const setGraph = (row, col, num, isTure) => {
  graph[ROW][row][num] = isTure;
  graph[COL][col][num] = isTure;
  graph[SQUARE][getSquare(row, col)][num] = isTure;
  input[row][col] = isTure ? num : 0;
};

// 그래프 생성
for (let r = 0; r < 9; r++) {
  input[r] = input[r].split(" ").map(Number);

  for (let c = 0; c < 9; c++) {
    let num = input[r][c];

    if (num === 0) {
      emptySpace.push([r, c]);
    } else {
      setGraph(r, c, num, true);
    }
  }
}

const isRightPosition = (row, col, num) => {
  return (
    !graph[ROW][row][num] &&
    !graph[COL][col][num] &&
    !graph[SQUARE][getSquare(row, col)][num]
  );
};

const getResult = (index) => {
  if (index === emptySpace.length) return true;

  const [row, col] = emptySpace[index];

  for (let num = 1; num <= 9; num++) {
    if (isRightPosition(row, col, num)) {
      setGraph(row, col, num, true);

      if (getResult(index + 1)) {
        return true;
      }
      setGraph(row, col, num, false);
    }
  }

  return false;
};

getResult(0);

console.log(input.map((row) => row.join(" ")).join("\n"));
