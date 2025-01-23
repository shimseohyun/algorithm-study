const input = require("fs").readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250123/input.txt")
            .toString()
            .trim()
            .split('\n');
const [n,m,r] = input[0].split(' ').map(Number);
let index = 1;
const visited = Array.from({length:n+1} , () => 0);

function bfs(graph){
    const q = [];
    visited[r] = 1;
    q.push(r);
    let step = 2;
    while(q.length > 0){
        const cur = q.shift();
        for(const node of graph[cur]){
            if(!visited[node]){
                q.push(node);
                visited[node] = step++;
            }
        }
    }
}

function solution(){
    const graph = Array.from({length : n+1} , () => []);
    for(let i = 0; i < m; i++){
        const [u,v] = input[index++].split(' ').map(Number);
        graph[u].push(v);
        graph[v].push(u);
    }
    for(const node of graph){
        node.sort((a,b) => a - b);
    }
    bfs(graph);
    console.log(visited.slice(1).join('\n'));
}

solution();