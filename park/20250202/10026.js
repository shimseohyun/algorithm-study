const input = require("fs")
    .readFileSync('algorithm-study/park/20250202/input.txt')
    .toString()
    .trim()
    .split('\n');
const n = parseInt(input[0]);
const grid = input.slice(1).map(el => el.trimEnd().split(''));
//적록아닌 사람 + 적록인 사람이 봤을때 그룹 수를 담을 변수
let cnt1 = 0;
let cnt2 = 0;
const visited1 = Array.from({length:n} , () => Array(n).fill(0));
const visited2 = Array.from({length:n} , () => Array(n).fill(0));
const direction = [
    [-1,0],
    [1,0],
    [0,-1],
    [0,1]
];

const bfs = (row,col,visited) =>{
    const q = [];
    visited[row][col] = 1;
    q.push([row,col]);
    while(q.length){
        const [curRow,curCol] = q.shift();
        for([dy , dx] of direction){
            const ny = curRow + dy;
            const nx = curCol + dx;
            if(ny >= 0 && ny < n && nx >= 0 && nx < n && !visited[ny][nx] && grid[ny][nx] === grid[curRow][curCol]){
                q.push([ny,nx]);
                visited[ny][nx] = 1;
            }
        }
    }
}
//적록색맹 아닌 경우
for(let r = 0; r < n; r ++){
    for(let c = 0; c < n; c++){
        if(!visited1[r][c]){
            bfs(r,c,visited1);
            cnt1++;
        }
    }
}


//적록색맹인 경우 R과 G를 동일시 해준다
for(let r = 0; r < n; r ++){
    for(let c = 0; c < n; c++){
        if(grid[r][c] === 'R'){
            grid[r][c] = 'G';
        }
    }
}
for(let r = 0; r < n; r ++){
    for(let c = 0; c < n; c++){
        if(!visited2[r][c]){
            bfs(r,c,visited2);
            cnt2++;
        }
    }
}

console.log(cnt1, cnt2);