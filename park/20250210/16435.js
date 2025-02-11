const input = require("fs")
    .readFileSync('algorithm-study/park/20250210/input.txt')
    .toString()
    .trim()
    .split('\n');

let [N, init] = input[0].split(' ').map(n => parseInt(n));
let arr = input[1].split(' ').sort((a,b)=>a-b);

for(let i=0; i<N; i++){
    if(arr[i]<=init){
        init++
    }else{
        break;
    }
}
console.log(init)