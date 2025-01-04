const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

// 정점의 수 N (5 ≤ N ≤ 100,000)
// 간선의 수 M (1 ≤ M ≤ 200,000)
// 시작 정점 R (1 ≤ R ≤ N)
const [N, M, R] = input[0].split(" ").map(Number);
const edges = input.slice(1).map((line) => line.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
edges.forEach(([u, v]) => {
  graph[u].push(v);
  graph[v].push(u);
});

// 그래프 오름순 정렬
graph.forEach((items) => items.sort((a, b) => a - b));

// 방문 순서 기록
const visited = Array(N + 1).fill(false);
const added = Array(N + 1).fill(false);
const order = Array(N + 1).fill(0);
var count = 1;

const que = new Array(M);
var front = 0;
var back = 0;

// BFS 알고리즘
const bfs = (node) => {
  if (visited[node] === false) {
    visited[node] = true;
    order[node] = count++;

    for (let i = 0; i < graph[node].length; i++) {
      if (!visited[graph[node][i]] && !added[graph[node][i]]) {
        que[back++ % M] = graph[node][i];
        added[graph[node][i]] = true;
      }
    }

    while (front != back) {
      bfs(que[front++ % M]);
    }
  }
};

bfs(R);

console.log(order.slice(1).join("\n"));
