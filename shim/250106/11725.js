const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

// 첫째 줄에 노드의 개수 N
const N = parseInt(input[0]);

// 트리 상에서 연결된 두 정점
const edges = input.slice(1).map((item) => item.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

edges.forEach(([u, v]) => {
  graph[u].push(v);
  graph[v].push(u);
});

const parent = Array(N + 1).fill(0);

const findParent = () => {
  const queue = [1];
  parent[1] = 1;

  while (queue.length > 0) {
    const current = queue.shift();

    graph[current].forEach((neighbor) => {
      if (parent[neighbor] === 0) {
        parent[neighbor] = current;
        queue.push(neighbor);
      }
    });
  }
};

findParent();

console.log(parent.slice(2).join("\n"));
