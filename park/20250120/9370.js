const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250120/input.txt")
  .toString()
  .trim()
  .split("\n");

const T = parseInt(input[0]);
let index = 1;

for (let i = 0; i < T; i++) {
  const [n, m, t] = input[index++].split(" ").map(Number);
  const [s, g, h] = input[index++].split(" ").map(Number);

  //그래프
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let j = 0; j < m; j++) {
    const [a, b, d] = input[index++].split(" ").map(Number);
    graph[a].push([b, d]);
    graph[b].push([a, d]);
  }

  // 목적지 후보
  const candidates = [];
  for (let j = 0; j < t; j++) {
    candidates.push(parseInt(input[index++], 10));
  }

  // 다익스트라 알고리즘(추가 공부 해야 할듯...)
  function dijkstra(start) {
    const dist = Array(n + 1).fill(Infinity);
    const queue = [[start, 0]];
    dist[start] = 0;

    while (queue.length > 0) {
      const [curNode, curDist] = queue.shift();

      if (curDist > dist[curNode]) continue;

      for (const [nextNode, weight] of graph[curNode]) {
        const nextDist = curDist + weight;

        if (nextDist < dist[nextNode]) {
          dist[nextNode] = nextDist;
          queue.push([nextNode, nextDist]);
        }
      }
    }
    return dist;
  }

  /*
    g -> h 또는 h - > g 를 거쳐가는 경로가 최단경로이기 위해서는
    출발지 s에서 목적지까지 가는 비용 = 
    s -> g + g -> h + h -> 목적지
    s -> h + h -> g + g -> 목적지
    둘 중 하나와 같아야 한다.
    
  */ 
  const distS = dijkstra(s);
  const distG = dijkstra(g);
  const distH = dijkstra(h);

  const answer = [];
  for (const dest of candidates) {
    const directDist = distS[dest];
    const gToH = distS[g] + distG[h] + distH[dest];
    const hToG = distS[h] + distH[g] + distG[dest];

    if  (directDist === gToH || directDist === hToG)  {
      answer.push(dest);
    }
  }

  // 결과 출력(오름차순)
  console.log(answer.sort((a, b) => a - b).join(" "));
}
