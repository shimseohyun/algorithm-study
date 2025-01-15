const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

// 첫째 줄에 정점의 개수 V(1 ≤ V ≤ 10,000)와 간선의 개수 E(1 ≤ E ≤ 100,000)가 주어진다.
const [V, E] = input[0].split(" ").map(Number);

const edges = input.slice(1).map((item) => item.split(" ").map(Number));

const graph = Array.from({ length: V + 1 }, () => []);

const NODE = 0;
const WEIGHT = 1;

edges.forEach(([a, b, c]) => {
  graph[a].push([b, c]);
  graph[b].push([a, c]);
});

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this._heapUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapDown(this.heap.length);
    return value;
  }

  isEmpty() {
    return this.heap.length == 0;
  }

  _heapUp(index) {
    const element = this.heap[index];
    let currentIndex = index;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element[WEIGHT] >= parent[WEIGHT]) {
        break;
      }
      this.heap[currentIndex] = parent;
      currentIndex = parentIndex;
    }
    this.heap[currentIndex] = element;
  }

  _heapDown(length) {
    let currentIndex = 0;

    while (true) {
      let smallestIndex = currentIndex;
      const leftIndex = currentIndex * 2 + 1;
      const rightIndex = currentIndex * 2 + 2;

      if (
        leftIndex < length &&
        this.heap[leftIndex][WEIGHT] < this.heap[smallestIndex][WEIGHT]
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < length &&
        this.heap[rightIndex][WEIGHT] < this.heap[smallestIndex][WEIGHT]
      ) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex === currentIndex) break;

      [this.heap[currentIndex], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[currentIndex],
      ];
      currentIndex = smallestIndex;
    }
  }
}

const que = new PriorityQueue(V);

const isVisited = Array.from({ length: V + 1 }, () => false);

let result = 0;
que.push([1, 0]);

while (!que.isEmpty()) {
  const [node, weight] = que.pop();

  if (isVisited[node]) {
    continue;
  }
  isVisited[node] = true;

  result += weight;

  const neighbors = graph[node];

  for (let neighbor of neighbors) {
    const [neighborNode, neighborWeight] = neighbor;

    if (!isVisited[neighborNode]) {
      que.push([neighborNode, neighborWeight]);
    }
  }
}

console.log(result);
