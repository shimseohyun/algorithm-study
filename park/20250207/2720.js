const fs = require('fs');
const input = fs.readFileSync('algorithm-study/park/20250207/input.txt')
    .toString()
    .trim()
    .split('\n');
const t = parseInt(input[0]);
const kind = [25,10,5,1];

//테스트 케이스 개수만큼 반복
for(let i = 0; i < t; i++){
    let money = parseInt(input[i+1]);
    let ans = [];
        for(const k of kind){
            ans.push(Math.floor(money/k));
            money = money % k;
    } 
    console.log(ans.join(' '));
}