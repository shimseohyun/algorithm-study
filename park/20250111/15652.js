const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250111/input.txt")
    .toString()
    .trim()
    .split("\n");
const [n, m] = input[0].split(" ").map(Number);

function solution(n, m) {
    const arr = [...Array(m)].fill(0);
    let result = '';

    function DFS(at,depth) {
        if (depth === m) {
            result += `${arr.join(" ")}\n`;
            return;
        }

        for (let i = at; i <= n; i++) {
            arr[depth] = i;
            //중복 허용하여 넘겨줌
            DFS(i, depth + 1);
        }



    }
    DFS(1,0);
    return result;
}


console.log(solution(n, m));