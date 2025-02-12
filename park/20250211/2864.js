const input = require("fs")
    .readFileSync('algorithm-study/park/20250211/input.txt')
    .toString()
    .trim()
    .split('\n');
const [a,b] = input[0].split(' ');
const result = [];
//5를 모두 6으로 -> 최대값 , 6을 모두 5로 -> 최소값
const minA = a.replace(/6/g,'5');
const minB = b.replace(/6/g,'5');
result.push(parseInt(minA) + parseInt(minB));

const maxA = a.replace(/5/g,'6');
const maxB = b.replace(/5/g,'6');
result.push(parseInt(maxA) + parseInt(maxB));

console.log(result.join(' '));

