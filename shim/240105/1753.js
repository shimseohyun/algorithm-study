const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

const [V, E] = input[0].split(" ").map(Number);
const K = parseInt(input[1]);

const edges = input.slice(2).map((line) => line.split(" ").map(Number));

// 그래프 초기화
const graph = Array.from({ length: V + 1 }, () => []);
edges.forEach(([u, v, w]) => {
  graph[u].push([v, w]);
});

const NODE = 0;
const DISTANCE = 1;

// 우선순위 큐 (MinHeap)
class Queue {
  constructor() {
    this.heap = [];
  }

  push([node, distance]) {
    this.heap.push([node, distance]);
    this._upHeap(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) return null;

    const root = this.heap[0];
    const last = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this._downHeap(0);
    }
    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _upHeap(index) {
    const element = this.heap[index];
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      const parent = this.heap[parentIndex];

      if (parent[DISTANCE] <= element[DISTANCE]) break;

      this.heap[currentIndex] = parent;
      this.heap[parentIndex] = element;
      currentIndex = parentIndex;
    }
  }

  _downHeap(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    let currentIndex = index;
    while (true) {
      let leftChildIndex = currentIndex * 2 + 1;
      let rightChildIndex = currentIndex * 2 + 2;

      let smallestChildIndex = currentIndex;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex][DISTANCE] <
          this.heap[smallestChildIndex][DISTANCE]
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex][DISTANCE] <
          this.heap[smallestChildIndex][DISTANCE]
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex === currentIndex) break;

      this.heap[currentIndex] = this.heap[smallestChildIndex];
      this.heap[smallestChildIndex] = element;
      currentIndex = smallestChildIndex;
    }
  }
}

const distances = Array(V + 1).fill(Infinity);
distances[K] = 0;

const q = new Queue();
q.push([K, 0]);

while (!q.isEmpty()) {
  const [currentNode, currentDistance] = q.pop();

  // 이미 처리된 거리보다 큰 경우 스킵
  if (distances[currentNode] < currentDistance) continue;

  for (const [neighborNode, weight] of graph[currentNode]) {
    const distance = currentDistance + weight;

    if (distance < distances[neighborNode]) {
      distances[neighborNode] = distance;
      q.push([neighborNode, distance]);
    }
  }
}

// 결과 출력
console.log(
  distances
    .slice(1) // 1번 노드부터 출력
    .map((d) => (d === Infinity ? "INF" : d))
    .join("\n")
);
