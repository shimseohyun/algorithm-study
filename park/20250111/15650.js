const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/input.txt")
    .toString()
    .trim()
    .split("\n");
const [n, m] = input[0].split(" ").map(Number);


function solution(n, m) {
    const arr = [...Array(m)].fill(0);

    result = '';
    function DFS(at, depth) {
        if (depth === m) {
            result += `${arr.join(" ")}\n`;
            return;
        }
        //at 변수 추가하여 중복 없이 배열에 추가된다
        for (let i = at; i <= n; i++) {
            arr[depth] = i;
            DFS(i + 1, depth + 1);
        }
    }


    DFS(1, 0);
    return result;
}


console.log(solution(n, m));

