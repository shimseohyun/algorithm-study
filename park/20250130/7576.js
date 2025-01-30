/*
    7576 - 토마토
    shift() 이용했다가 시간초과 떠서 변형해서 사용
 */
    const input = require("fs")
    .readFileSync("algorithm-study/park/20250130/input.txt")
    .toString()
    .trim()
    .split("\n");
const [COL,ROW] = input[0].split(' ').map(Number);

const tomato = input.slice(1).map(line => line.split(" ").map(Number));


const direction = [
    [-1,0],
    [1,0],
    [0,-1],
    [0,1],
];

function bfs() {
    const q = [];
    let maxDay = 0;

    for(let y = 0; y < ROW; y++){
        for(let x = 0; x < COL; x++){
            if(tomato[y][x] === 1)
                q.push([y,x,0]);
        }
    }
    let head = 0;
    while(q.length > head){
        const [curRow , curCol, day] = q[head++];
        maxDay = Math.max(maxDay,day);
        for(const [dy,dx] of direction){
            const ny = curRow + dy;
            const nx = curCol + dx;
            if (ny >= 0 && ny < ROW && nx >= 0 && nx < COL && tomato[ny][nx] === 0){
                q.push([ny,nx,day+1]);
                tomato[ny][nx] = 1;
            }
        }
    }
    //안익은 토마토 확인
    for (let y = 0; y < ROW; y++) {
        for (let x = 0; x < COL; x++) {
            if (tomato[y][x] === 0) return -1; // 익지 않은 토마토가 남아 있으면 -1 반환
        }
    }
    return maxDay;
};

console.log(bfs());
