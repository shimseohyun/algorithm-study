const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

// 첫째 줄에는 n ≤ 500과 m ≤ n(n-1)/2을 만족하는 정점의 개수 n과 간선의 개수 m이 주어진다.
let i = 0;

const result = [];

class Queue {
  constructor(size) {
    this.size = size;
    this.front = 0;
    this.back = 0;
    this.que = new Array(size);
  }
  push(value) {
    this.que[this.front++ % this.size] = value;
  }
  pop() {
    const value = this.que[this.back++ % this.size];
    this.que[(this.back % this.size) - 1] = undefined; // 메모리 해제
    return value;
  }

  isEmpty() {
    return this.front % this.size === this.back % this.size;
  }
}

const checkTree = (graph, n) => {
  // 1. 사이클이 없다
  // 2. 모든 정점이 연결되어있다.
  // 3. 정점의 개수가 V개이면 간선의 개수는 V-1개이다.
  // +  하나의 노드에 자식 노드가 여러개일 수 있다.

  const isVisited = Array.from({ length: n + 1 }, () => false);
  let treeCount = 0;
  for (let i = 1; i < n + 1; i++) {
    if (isVisited[i]) {
      continue;
    }

    const que = new Queue(n);
    que.push([i, "start"]);
    let isTree = true;

    while (!que.isEmpty()) {
      const [node, parentNode] = que.pop();
      isVisited[node] = true;

      const neighbors = graph[node];
      for (let neighbor of neighbors) {
        if (parentNode !== neighbor) {
          if (isVisited[neighbor]) {
            // 부모노드를 제외하고, 방문한적 있는 노드라면 트리 내 순환이 발생한 것
            // 트리가 아님
            isTree = false;
          } else {
            que.push([neighbor, node]);
          }
        }
      }
    }

    if (isTree) {
      treeCount++;
    }
  }
  return treeCount;
};

let caseNum = 0;

while (i < input.length - 1) {
  const [n, m] = input[i].split(" ").map(Number);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let j = i + 1; j < i + m + 1; j++) {
    const [u, v] = input[j].split(" ").map(Number);
    graph[u].push(v);
    graph[v].push(u);
  }
  const treeCount = checkTree(graph, n);
  if (treeCount === 0) {
    result.push(`Case ${++caseNum}: No trees.`);
  } else if (treeCount === 1) {
    result.push(`Case ${++caseNum}: There is one tree.`);
  } else {
    result.push(`Case ${++caseNum}: A forest of ${treeCount} trees.`);
  }

  i = i + m + 1;
}

console.log(result.join("\n"));
