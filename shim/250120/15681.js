const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

// 트리의 정점의 수 N, 루트의 번호 R, 쿼리의 수 Q
const [N, R, Q] = input[0].split(" ").map(Number);

// 간선 정보
const edges = input.slice(1, N).map((item) => item.split(" ").map(Number));

// 쿼리 정보
const queries = input.slice(N).map(Number);

// 그래프 생성
const graph = Array.from({ length: N + 1 }, () => []);
edges.forEach(([u, v]) => {
  graph[u].push(v);
  graph[v].push(u);
});

// 서브트리 크기 저장 배열
const subTreeCount = Array(N + 1).fill(0);
const visited = Array(N + 1).fill(false);

const getSubTreeCount = (node) => {
  visited[node] = true;
  subTreeCount[node] = 1; // 자신을 포함
  for (const neighbor of graph[node]) {
    if (!visited[neighbor]) {
      subTreeCount[node] += getSubTreeCount(neighbor);
    }
  }
  return subTreeCount[node];
};

getSubTreeCount(R);

const result = queries.map((query) => subTreeCount[query]);
console.log(result.join("\n"));
