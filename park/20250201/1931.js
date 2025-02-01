/*

    1931 - 회의실 배정

 */
const input = require("fs")
    .readFileSync("algorithm-study/park/20250201/input.txt")
    .toString()
    .trim()
    .split('\n');
const n = parseInt(input[0]);
const con = input.slice(1).map(el => el.split(' ').map(Number));
//끝나는 시간 기준 오름차순 , 같다면 시작 시간 기준 오름차순 정렬
con.sort((a,b) => a[1] - b[1]  || a[0] - b[0]);
let finish = 0;
let answer = 0;
// 시작 시간이 끝나는 시간보다 크거나 같다면 가능 개수 ++
con.forEach((time) =>{
    if(time[0] >= finish){
        answer++;
        finish = time[1];
    }
});

console.log(answer);
