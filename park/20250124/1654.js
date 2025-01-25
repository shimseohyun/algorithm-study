/*
    1654 - 랜선 자르기
 */

const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");
const [k,n] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number).sort((a,b) => a - b);

let max = arr[arr.length - 1];
let min = 1;

while(min <= max){
    let mid = parseInt((max + min) / 2);
    // arr 각 요소를 mid로 나눈 몫을 cnt 값에 더함 
    let cnt = 0;
    arr.forEach(value =>{
        cnt += Math.floor(value/mid);
    })

    if(cnt >= n){
        min = mid + 1;
    } 
    else{
        max = mid - 1;
    }
}
console.log(max);