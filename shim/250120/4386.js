const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

const n = parseInt(input[0]);

const stars = input.slice(1).map((item) => item.split(" ").map(parseFloat));

const getDistance = (a, b) => {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx ** 2 + dy ** 2);
};

const isVisited = Array.from({ length: n }, () => false);

class Queue {
  constructor() {
    this.que = [];
  }

  // 입력되는 순간 heap 정렬
  push(value) {
    this.que.push(value);
    this._heapUp(this.que.length - 1);
  }

  pop() {
    if (this.isEmpty()) throw "Que is Empty";
    const value = this.que[0];

    if (this.que.length === 1) {
      this.que = [];
      return value;
    }

    this.que[0] = this.que.pop();
    this._heapDown(this.que.length);

    return value;
  }

  // 새로추가된 항목을 가장 그래프의 가장 마지막에 추가
  // 부모와 비교하며, 자식이 부모보다 클 경우 부모와 자식의 위치를 바꾼다
  _heapUp(index) {
    let currentIndex = index;
    const element = this.que[currentIndex];
    let parentIndex;

    while (currentIndex > 0) {
      parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.que[parentIndex][1] < element[1]) {
        break;
      }

      this.que[currentIndex] = this.que[parentIndex];
      this.que[parentIndex] = element;
      currentIndex = parentIndex;
    }
  }

  _heapDown(length) {
    let currentIndex = 0;
    const element = this.que[currentIndex];
    let smallestIndex = currentIndex;

    while (true) {
      const leftChildIndex = currentIndex * 2 + 1;
      const rightChildIndex = currentIndex * 2 + 2;

      if (
        leftChildIndex < length &&
        this.que[leftChildIndex][1] < this.que[smallestIndex][1]
      ) {
        smallestIndex = leftChildIndex;
      }
      if (
        rightChildIndex < length &&
        this.que[rightChildIndex][1] < this.que[smallestIndex][1]
      ) {
        smallestIndex = rightChildIndex;
      }

      if (currentIndex == smallestIndex) break;

      this.que[currentIndex] = this.que[smallestIndex];
      this.que[smallestIndex] = element;
      currentIndex = smallestIndex;
    }
  }

  isEmpty() {
    return this.que.length === 0;
  }
}

const getAnswer = () => {
  let result = 0;

  const que = new Queue(n);
  que.push([0, 0]);

  while (!que.isEmpty()) {
    const [index, weight] = que.pop();

    if (isVisited[index]) continue;
    isVisited[index] = true;

    result += weight;

    for (let i = 0; i < n; i++) {
      if (!isVisited[i]) {
        const distance = getDistance(stars[index], stars[i]);
        que.push([i, distance]);
      }
    }
  }

  // 반올림 대응
  return result + 0.005;
};

console.log(getAnswer().toFixed(2));
