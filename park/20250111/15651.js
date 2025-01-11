const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250111/input.txt")
    .toString()
    .trim()
    .split("\n");
const [n, m] = input[0].split(" ").map(Number);

function solution(n, m) {
    const arr = [...Array(m)].fill(0);
    let result = '';



    function DFS(depth) {
        // depth == m -> result 할당
        if (depth === m) {
            result += `${arr.join(' ')}\n`;
            return;
        }

        // depth가 0 ~ m까지 돌도록 for문
        for (let i = 0; i < n; i++) {
            arr[depth] = i + 1;
            DFS(depth + 1);
        }
    }
    DFS(0);
    return result;


}

console.log(solution(n, m));