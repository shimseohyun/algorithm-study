const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

// 트리의 정점의 개수 N
const N = parseInt(input[0]);

// 정점 번호 / 정점번호 / 그 정점까지의 거리 / 정점번호 / 그 정점까지의 거리
const graph = Array.from({ length: N + 1 }, () => []);

const edges = input.slice(1).map((item) => item.split(" ").map(Number));
edges.forEach((item) => {
  const currentNode = item[0];
  const n = (item.length - 2) / 2;

  for (let i = 0; i < n; i++) {
    graph[currentNode].push([item[i * 2 + 1], item[i * 2 + 2]]);
  }
});

class Queue {
  constructor(size) {
    this.size = size;
    this.front = 0;
    this.back = 0;
    this.que = Array(size);
  }

  push(value) {
    this.que[this.back++ % this.size] = value;
  }

  pop() {
    return this.que[this.front++ % this.size];
  }

  isEmpty() {
    return this.back % this.size === this.front % this.size;
  }
}

// 트리의 지름이란,
// 트리에서 임의의 두 점 사이의 거리 중 가장 긴 것을 말한다.

// 임의의 정점에서 가장 먼 정점을 찾는다.
const getFarthestNode = (startNode) => {
  const distances = Array.from({ length: N + 1 }, () => 0);
  const isVisited = Array.from({ length: N + 1 }, () => false);

  const que = new Queue(N);
  que.push(startNode);
  let farthestNode = startNode;
  isVisited[startNode] = true;

  while (!que.isEmpty()) {
    const currentNode = que.pop();
    for (let [node, distance] of graph[currentNode]) {
      if (!isVisited[node]) {
        que.push(node);
        isVisited[node] = true;
        distances[node] = distance + distances[currentNode];
        if (distances[node] > distances[farthestNode]) {
          farthestNode = node;
        }
      }
    }
  }
  return [farthestNode, distances[farthestNode]];
};

const [startNode, _result] = getFarthestNode(1);
const [_startNode, result] = getFarthestNode(startNode);

console.log(result);
