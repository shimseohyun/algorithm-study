const input = require("fs")
    .readFileSync("algorithm-study/park/20250129/input.txt")
    .toString()
    .trim()
    .split('\n');
const [n,m] = input[0].split(' ').map(Number);
//인접 리스트 방식으로 할당
const edges = input.slice(1).map(el => el.split(' ').map(Number));
const graph = Array.from({length : n+1} , () =>  []);
const visited = Array(n+1).fill(0);
let cnt = 0;

for(const [a,b] of edges){
    graph[a].push(b);
    graph[b].push(a);
}


const dfs = (start) =>{
    visited[start] = 1;
    for(const curNode of graph[start]){
        if(!visited[curNode])
            dfs(curNode);
    }
};

for(let i = 1; i <= n; i++){
    if(!visited[i]){
        dfs(i);
        cnt++;
    } 
}
console.log(cnt);

