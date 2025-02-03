const input = require("fs")
    .readFileSync("algorithm-study/park/20250203/input.txt")
    .toString()
    .trim()
    .split('-');
let ans = [];

input.forEach(el => {
    if(el.includes('+')){
        let sum = 0;
        el = el.split('+').map(Number);
        el.forEach(i => sum += i);
        ans.push(sum);
    }
    else{
        ans.push(parseInt(el));
    }
})

console.log(ans.reduce((pre , cur) => pre - cur));