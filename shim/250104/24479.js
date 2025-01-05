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

// 그래프 생성
const graph = Array.from({ length: N + 1 }, () => []);
edges.forEach(([u, v]) => {
  graph[u].push(v);
  graph[v].push(u);
});

// 인접 정점을 오름차순 정렬
graph.forEach((items) => items.sort((a, b) => a - b));

// 방문 순서 기록
const visited = Array(N + 1).fill(false);
const order = Array(N + 1).fill(0);
let count = 1;

// DFS 함수
function dfs(node) {
  visited[node] = true;
  order[node] = count++;
  for (const neighbor of graph[node]) {
    if (!visited[neighbor]) {
      dfs(neighbor);
    }
  }
}

// DFS 시작
dfs(R);

// 결과 출력
console.log(order.slice(1).join("\n"));
