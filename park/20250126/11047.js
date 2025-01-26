const input = require('fs')
    .readFileSync("algorithm-study/park/20250126/input.txt")
    .toString()
    .trim()
    .split('\n');
let [n,k] = input[0].split(' ').map(Number);
const money = input.slice(1).map(Number);
let cnt = 0; // 총 사용된 동전 개수
let index = money.length - 1; // 가장 큰 동전부터 사용

while (k > 0) {
    // 현재 동전이 거슬러 줄 수 없으면 다음으로 넘어감
    if (k < money[index]) {
        index--; 
        continue;
    }

    
    cnt += Math.floor(k / money[index]);
    k %= money[index]; // 남은 금액
}

console.log(cnt); 
