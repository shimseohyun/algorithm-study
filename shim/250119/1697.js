// 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고,
// 동생은 점 K(0 ≤ K ≤ 100,000)에 있다.

const [N, K] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split(" ")
  .map(Number);

class Queue {
  constructor(size) {
    this.size = size;
    // this.que = new Array(size);
    this.que = [];
    this.front = 0;
    this.back = 0;
  }

  push(value) {
    // if (this.isFull()) {
    //   throw new Error("Queue is full");
    // }
    // this.que[this.back++ % this.size] = value;
    this.que.push(value);
  }

  pop() {
    // const value = this.que[this.front % this.size];
    // this.que[this.front++ % this.size] = undefined;
    // return value;
    return this.que.shift();
  }
  isEmpty() {
    // return this.front === this.back;
    return this.que.length === 0;
  }
  isFull() {
    return this.back - this.front === this.size;
  }
}

const isVisited = Array.from({ length: K }, () => false);

const solveQuestion = () => {
  const que = new Queue(K);
  // [방문점, 방문횟수]
  que.push([N, 0]);

  while (!que.isEmpty()) {
    const [point, distance] = que.pop();

    // 동생을 찾은 경우
    if (point === K) {
      console.log(distance);
      break;
    }

    for (let i = 0; i < 3; i++) {
      let newPoint = point;
      switch (i) {
        case 0:
          newPoint = point - 1;
          break;
        case 1:
          newPoint = point + 1;
          break;
        case 2:
          newPoint = point * 2;
          break;
      }

      if (newPoint >= 0 && newPoint <= 100000 && !isVisited[newPoint]) {
        isVisited[newPoint] = true;

        que.push([newPoint, distance + 1]);
      }
    }
  }
};

solveQuestion();
