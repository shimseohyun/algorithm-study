const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250116/input.txt")
    .toString()
    .trim()
    .split("\n");
/*
    n은 수의 개수
    numArr은 수열
    opCounts은 덧셈[0], 뺄셈[1] , 곱셈[2] , 나눗셈[3] 의 개수
    브루트포스 + DFS + 백트래킹?
    
    DFS 돌면서 level이 숫자 개수(n)만큼 될 때 max,min 지정.
    위 과정 거치면서 모든 경우 탐색
    

*/
const n = Number(input[0]);
const numArr = input[1].split(" ").map(Number);
const opCounts = input[2].split(" ").map(Number);


//최대 최소 지정
let max = Number.MIN_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;




function DFS(level, value) {
    if (level === n) {
        max = Math.max(max, value);
        min = Math.min(min, value);
        return;
    }

    for (let i = 0; i < 4; i++) {
        if (opCounts[i] > 0) {
            opCounts[i]--;

            if (i === 0) {
                DFS(level + 1, value + numArr[level]);

            }
            else if (i === 1) {
                DFS(level + 1, value - numArr[level]);

            }
            else if (i === 2) {
                DFS(level + 1, value * numArr[level]);

            }
            else if (i === 3) {
                
                //DFS(level + 1, Math.floor(value / numArr[level])); 
                DFS(level + 1, value < 0 ?  -Math.floor(-value / numArr[level]) :  Math.floor(value / numArr[level]));

            }
            opCounts[i]++;  //백트래킹 복구작업
        }

    }
}
DFS(1, numArr[0]);
//console.log(max);
//console.log(min);
if(max === 0) max = 0;
if(min === 0) min = 0;
console.log(max);
console.log(min);