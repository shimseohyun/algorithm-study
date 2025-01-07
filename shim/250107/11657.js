const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

// 도시의 개수 N (1 ≤ N ≤ 500), 버스 노선의 개수 M (1 ≤ M ≤ 6,000)
const [N, M] = input[0].split(" ").map(Number);

// 줄에는 버스 노선의 정보 A, B, C (1 ≤ A, B ≤ N, -10,000 ≤ C ≤ 10,000)
const edges = input.slice(1).map((item) => item.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

edges.forEach(([a, b, c]) => {
  graph[a].push([b, c]);
});

const distances = Array.from({ length: N + 1 }, () => Infinity);
let isNegativeCylce = false;

distances[1] = 0;

for (let i = 1; i <= N; i++) {
  for (let currentNode in graph) {
    const neighbors = graph[currentNode];
    for (const [neighborNode, neighborDistance] of neighbors) {
      if (
        distances[currentNode] !== Infinity &&
        distances[currentNode] + neighborDistance < distances[neighborNode]
      ) {
        distances[neighborNode] = distances[currentNode] + neighborDistance;

        // N번째 반복(1바퀴를 다 돈 경우)에서도 갱신이 발생하면
        // 음수 사이클 존재
        if (i === N) {
          isNegativeCylce = true;
        }
      }
    }
  }
}

if (isNegativeCylce) {
  // 만약 1번 도시에서 출발해 어떤 도시로 가는 과정에서
  // 시간을 무한히 오래 전으로 되돌릴 수 있다면 첫째 줄에 -1을 출력한다.
  console.log(-1);
} else {
  const result = distances
    .slice(2)
    .map((item) => (item == Infinity ? -1 : item))
    .join("\n");
  console.log(result);
}
