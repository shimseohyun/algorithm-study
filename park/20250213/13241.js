const input = require("fs")
    .readFileSync("algorithm-study/park/20250213/input.txt")
    .toString()
    .trim();

const [a, b] = input.split(" ").map(Number);

function gcd(x, y) {
    while (y !== 0) {
        [x, y] = [y, x % y]; 
    }
    return x;
}

const gcdVal = gcd(a, b);
const lcmVal = (a * b) / gcdVal;

console.log(lcmVal);
