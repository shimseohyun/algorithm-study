const input = require('fs') 
    .readFileSync("algorithm-study/park/20250215/input.txt")
    .toString()
    .trim();
const [n,k] = input.split(' ').map(Number);

const fact = (n) =>{
    let ans = 1;

    for(let i = 2; i <= n; i++)
        ans *= i;

    return ans;
};

console.log(fact(n) / (fact(k) * fact(n-k) ));
