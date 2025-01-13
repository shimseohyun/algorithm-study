//2606 바이러스

const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250112/input.txt")
    .toString()
    .trim()
    .split('\n');
const computerNum = Number(input[0]); //노드 수
const pairNum = Number(input[1]);     //간선 수
const visited = [...Array(computerNum)].fill(false);
let virus = 0;

const graph = Array.from({length : computerNum + 1} , () => []); 
const connected = input.slice(2).map(line => line.split(' ').map(Number));

for (const [u, v] of connected) {
    //무방향 그래프이기에 두 번 추가
    graph[u].push(v);             
    graph[v].push(u); 
}
//1번 노드 방문처리 하고 DFS
visited[1] = 1;

const DFS = (graph , v , visited) => {
    for(let cur of graph[v]){
        if(!visited[cur]){
            visited[cur] = 1;
            virus++;
            DFS(graph,cur,visited);
        }
    }
}

DFS(graph,1,visited);
console.log(virus);