const input = require("fs") 
    .readFileSync("algorithm-study/park/20250205/input.txt")
    .toString()
    .trim()
    .split('\n');

const n = parseInt(input[0]);
const num = input[1].split(' ').map(Number);
const answer = new Array(n).fill(-1);
let stack = [];
for(let i = 0; i < n; i++){
    while(num[i] > num[stack[stack.length - 1]] && stack.length > 0 )
        answer[stack.pop()] = num[i];
    stack.push(i);
}
console.log(answer.join(' '));