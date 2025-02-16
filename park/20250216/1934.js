const input = require('fs') 
    .readFileSync("algorithm-study/park/20250216/input.txt")
    .toString()
    .trim()
    .split('\n');
const t = parseInt(input[0]);
let index = 1;
const ans = [];
for(let i = 0; i < t; i++){
    let [a,b] = input[index++].split(' ').map(Number);
    let originala = a;
    let originalb = b;
    
    // 유클리드 호세법
    // while문이 끝나면 최대공약수는 b가 된다.
    while(a % b !== 0){
        let r = a % b;
        
        if(r !== 0){
            a = b;
            b = r;
        }
    }
    
    // 최소공배수
    // 최소공배수 = 자연수1 * 자연수2 / 최대공약수
    let min = originala * originalb / b;
    ans.push(min);
}
console.log(ans.join('\n'));