const input = require("fs") 
    .readFileSync("algorithm-study/park/20250205/input.txt")
    .toString()
    .trim()
    .split('\n');
let [n,k] = input[0].split(' ').map(Number);
const num = input[1].split('').map(Number);
const stack = [];

for(let i = 0; i < n; i++){
    while(stack.length && num[i] > stack[stack.length-1] && k > 0){
        stack.pop();
        k--;
    }
    stack.push(num[i]);
}
//
for(let i = 0; i < k; i++){
    stack.pop();
}
console.log(stack.join(''));