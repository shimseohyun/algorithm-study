/*
    2805 - 나무 자르기
*/
const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");
const [n,m] = input[0].split(' ').map(Number);
const h = input[1].split(' ').map(Number).sort((a, b) => a - b);


let max = h[h.length - 1];
let min = 0;

while(min <= max){
    let mid = Math.floor((max + min) / 2);

    let needTree = 0;
    h.forEach(value => {
        let rest = value - mid;
        if(rest > 0)
            needTree += rest;
    });
    if(needTree >= m){
        min = mid + 1;
    }
    else{
        max = mid - 1;
    }
}
console.log(max);