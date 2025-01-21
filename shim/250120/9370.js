// 미확인 도착지
// 어휴! (요란한 옷차림을 했을지도 모를) 듀오가 어디에도 보이지 않는다.
// 다행히도 당신은 후각이 개만큼 뛰어나다. 이 후각으로 그들이 g와 h 교차로 사이에 있는 도로를 지나갔다는 것을 알아냈다.
// -> 문제 이런식으로 상황극하는거 언제 안 웃기지

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

const N = 0;
// const M = 1;
// const T = 2;
const S = 1;
const G = 2;
const H = 3;
const GRAPH = 4;
const TARGET_LIST = 5;

const testCaseList = [];
let currentLineNum = 1;

while (currentLineNum < input.length) {
  // [(T) +0]
  // n : 교차로 / m : 도로  / t :목적지
  const [n, m, t] = input[currentLineNum + 0].split(" ").map(Number);
  // [(T) +1]
  // s : 출잘지 / g - h : 거쳐서 지나감
  const [s, g, h] = input[currentLineNum + 1].split(" ").map(Number);

  // [(T) +2 ~ 2+m]
  // a - b 사이 길이 d 의 양방향 도로
  let edges = input
    .slice(currentLineNum + 2, currentLineNum + 2 + m)
    .map((item) => item.split(" ").map(Number));

  let graph = Array.from({ length: n + 1 }, () => []);
  edges.forEach(([a, b, d]) => {
    graph[a].push([b, d]);
    graph[b].push([a, d]);
  });

  // [(T) +2+m ~ 2+m+t]
  // t개의 목적지 후보
  let targetList = input
    .slice(currentLineNum + 2 + m, currentLineNum + 2 + m + t)
    .map(Number);

  let testCase = [n, s, g, h, graph, targetList];
  testCaseList.push(testCase);
  currentLineNum = currentLineNum + 2 + m + t;
}

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
  if (a[1] < b[1]) {
    return true;
  } else {
    return false;
  }
};

const Dijkstra = (testCase, start) => {
  const heap = new MinHeap(sortByDistance);

  const distances = Array.from(
    { length: testCaseList[testCase][N] + 1 },
    () => Infinity
  );

  distances[start] = 0;
  heap.push([start, distances[start]]);

  while (!heap.isEmpty()) {
    const [currentNode, currentDistance] = heap.pop();
    if (currentDistance > distances[currentNode]) continue;

    const neighbors = testCaseList[testCase][GRAPH][currentNode];

    for (let neighbor of neighbors) {
      const [neighborNode, neighborDistance] = neighbor;
      const newDistance = distances[currentNode] + neighborDistance;
      if (newDistance < distances[neighborNode]) {
        distances[neighborNode] = newDistance;
        heap.push([neighborNode, distances[neighborNode]]);
      }
    }
  }
  return distances;
};

const getTartgetMinHeap = (testCase) => {
  const s = testCaseList[testCase][S];
  const g = testCaseList[testCase][G];
  const h = testCaseList[testCase][H];

  const startS = Dijkstra(testCase, s);
  const startG = Dijkstra(testCase, g);
  const startH = Dijkstra(testCase, h);

  const S_G_H = startS[g] + startG[h];
  const S_H_G = startS[h] + startH[g];

  const list = [];

  for (target of testCaseList[testCase][TARGET_LIST]) {
    const S_G_H_T = S_G_H + startH[target];
    const S_H_G_T = S_H_G + startG[target];
    const S_T = startS[target];

    // 출발점에서 최단거리와, g-h를 지나는 최단거리가 같은 경우
    // g - h를 지나지 않고 목적지를 도달 한 경우 == 목적지 후보들 중 불가능한 경우
    if ((S_G_H_T === S_T || S_H_G_T === S_T) && S_T !== Infinity) {
      list.push(target);
    }
  }

  list.sort((a, b) => a - b);
  return list;
};

const totalReslut = [];
for (let testCase in testCaseList) {
  totalReslut.push(getTartgetMinHeap(testCase).join(" "));
}

console.log(totalReslut.join("\n"));
