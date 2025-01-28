const input = require("fs")
  .readFileSync("algorithm-study/park/20250128/input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(input[0]); 
const graph = input.slice(1).map(v => v.split(' ').map(Number));
const answer = Array.from({ length: n }, () => Array(n).fill(0));




function dfs(node,start,visited){
    for(let i = 0; i < n; i++){
        if(graph[node][i] && !visited[i]){
            visited[i] = true;
            answer[start][i] = 1;
            dfs(i,start,visited);
        }
    }
}

for(let i = 0; i < n; i++){
    const visited = Array(n).fill(false);   //각 행 노드마다 방문배열 선언
    dfs(i,i,visited);
}

console.log(answer.map(el => el.join(' ')).join('\n'));


