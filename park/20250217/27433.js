
const input = require('fs').readFileSync('algorithm-study/park/20250217/input.txt')
    .toString()
    .trim()
    .split("\n")
const num = parseInt(input);

function factorial(n) {
    if(n <= 1) return 1
    return n * factorial(n-1)
}

console.log(factorial(num));