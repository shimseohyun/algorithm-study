const input = require("fs")
    .readFileSync("algorithm-study/park/20250203/input.txt")
    .toString()
    .trim()
    .split('\n');
const n = parseInt(input[0]);
const atm = input[1].split(' ').map(Number).sort((a,b) => a-b);

const sum = atm.reduce((acc,cur,idx) => {
    if(idx === 0) acc.push(cur);
    else    acc.push(acc[idx-1] + cur);
    return acc;
} ,[]);
console.log(sum.reduce((a,b) => a + b)); 