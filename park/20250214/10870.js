const input = require('fs')
    .readFileSync('algorithm-study/park/20250214/input.txt')
    .toString()
    .trim();
const n = parseInt(input);
function fibonacci(num) {

    if(num === 0){
      return 0;
    }

    if(num === 1){
      return 1;
    }
    
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
  
  const result = fibonacci(n);
  console.log(result);