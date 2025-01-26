const input = require("fs")
    .readFileSync("algorithm-study/park/20250126/input.txt")
    .toString()
    .trim()
    .split('\n');
const [n,m] = input[0].split(' ').map(Number);
const maps = input.slice(1).map(col => col.split(' ').map(Number));

const visited = Array.from({length: n} , () => Array(m).fill(0));
const answer = Array.from({length: n} , () => Array(m).fill(0));


const direction =[
    [-1,0],   //상
    [1,0],    //하
    [0,-1],   //좌
    [0,1],    //우
];

function bfs(row,col){
    
    const q = [];
    q.push([row,col,0]);
    visited[row][col] = 1;
    answer[row][col] = 0;
    


    while(q.length){
        const [curRow, curCol, cnt] = q.shift();
        for(const [dy , dx] of direction){
            const ny = dy + curRow;
            const nx = dx + curCol;
            if(ny >= 0 && nx >= 0 && ny < n && nx < m && !visited[ny][nx] && maps[ny][nx] === 1){
                visited[ny][nx] = 1;
                answer[ny][nx] = cnt + 1;
                q.push([ny,nx,cnt + 1]);
                
            }
        }
    }
}


//순차 탐색하면서 목표지점 찾기 & 방문 못하는 지점 -1 지정
for(let i = 0; i < n; i++){
    for(let k = 0; k < m; k++){
        if(maps[i][k] === 2){
            bfs(i,k);
        }
        else if(maps[i][k] === 1 && !visited[i][k])
            answer[i][k] = -1;
    }
}

console.log(answer.map(row => row.join(' ')).join('\n'));


