const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250112/input.txt")
    .toString()
    .trim()
    .split('\n');
const n = Number(input[0]);
let cnt = 0;
const queens = [];
function solution(n){
    
    //점과 점사이 거리 > 1 이면서 같은 행에 없다면 놓아도 된다.
    function isQueenPossible(x,y){
        for(const [a,b] of queens){
            //같은 행 또는 같은 열에 있다면 false
            if(a === x || b === y) return false;
            //대각선 경우
            if(Math.abs(a-x) === Math.abs(b-y)) return false;
        }
        return true;
    }
    function DFS(row){
        if(row === n){
            cnt++;
            return;
        }
        for(let i = 0; i < n; i++){
            //해당 행에 놓을 수 없다면 넘김
            if(!isQueenPossible(row,i)) continue;
            queens.push([row,i]);
            DFS(row+1);
            //각 level을 역으로 올라가며 다시 0으로 
            queens.pop();

        }
       

    }
    DFS(0);
    return cnt;

}

console.log(solution(n));