const { start } = require("repl");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

// 첫째 줄에 정점의 개수 N과 간선의 개수 E가 주어진다. (2 ≤ N ≤ 800, 0 ≤ E ≤ 200,000)
const [N, E] = input[0].split(" ").map(Number);
const S = 1;

// 세 개의 정수 a, b, c가 주어지는데,
// a번 정점에서 b번 정점까지 양방향 길이 존재하며, 그 거리가 c라는 뜻이다.
const edges = input
  .slice(1, input.length - 1)
  .map((item) => item.split(" ").map(Number));

//  반드시 거쳐야 하는 두 개의 서로 다른 정점 번호 V1과 V2가 주어진다.
const [V1, V2] = input[input.length - 1].split(" ").map(Number);

// 주어진 간선과 정점으로 그래프 그리기
const NODE = 0;
const DISTANCE = 1;

const graph = Array.from({ length: N + 1 }, () => []);

edges.forEach(([a, b, c]) => {
  graph[a].push([b, c]);
  graph[b].push([a, c]);
});

class MinHeap {
  constructor(sortFunction) {
    this.heap = [];
    this.sortFunction = sortFunction;
  }

  push(value) {
    this.heap.push(value);
    this._heapUP(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) {
      return -1;
    }

    const root = this.heap[0];
    const last = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this._heapDown();
    }

    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _heapUP(index) {
    let currentIndex = index;
    const element = this.heap[currentIndex];

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      const parentElement = this.heap[parentIndex];

      if (this.sortFunction(element, parentElement)) {
        this.heap[currentIndex] = parentElement;
        this.heap[parentIndex] = element;

        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  _heapDown() {
    let currentIndex = 0;
    const element = this.heap[currentIndex];
    const length = this.heap.length;

    while (currentIndex < length) {
      const leftChildIndex = currentIndex * 2;
      const rightChildIndex = currentIndex * 2 + 1;
      let smallestIndex = currentIndex;

      if (
        leftChildIndex < length &&
        this.sortFunction(this.heap[leftChildIndex], this.heap[smallestIndex])
      ) {
        smallestIndex = leftChildIndex;
      }
      if (
        rightChildIndex < length &&
        this.sortFunction(this.heap[rightChildIndex], this.heap[smallestIndex])
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === currentIndex) break;

      const smallestElement = this.heap[smallestIndex];

      this.heap[currentIndex] = smallestElement;
      this.heap[smallestIndex] = element;

      currentIndex = smallestIndex;
    }
  }
}

const sortByDistance = (a, b) => {
  // a에서 b로 오름차순 정렬
  if (a[DISTANCE] < b[DISTANCE]) {
    return true;
  } else {
    return false;
  }
};

const Dijkstra = (startNode) => {
  const heap = new MinHeap(sortByDistance);

  const distance = Array.from({ length: N + 1 }, () => Infinity);
  distance[startNode] = 0;
  heap.push([startNode, distance[startNode]]);

  while (!heap.isEmpty()) {
    const [currentNode, currentDistance] = heap.pop();

    if (currentDistance > distance[currentNode]) continue;

    const neighbors = graph[currentNode];

    for (let edge of neighbors) {
      const [neighborNode, neighborDistance] = edge;

      const newDistance = neighborDistance + currentDistance;

      if (newDistance < distance[neighborNode]) {
        distance[neighborNode] = newDistance;
        heap.push([neighborNode, newDistance]);
      }
    }
  }

  return distance;
};

const startS = Dijkstra(S);
const startV1 = Dijkstra(V1);
const startV2 = Dijkstra(V2);

const S_V1_V2_N = startS[V1] + startV1[V2] + startV2[N];
const S_V2_V1_N = startS[V2] + startV2[V1] + startV1[N];

const result = Math.min(S_V1_V2_N, S_V2_V1_N);
console.log(result === Infinity ? -1 : result);
