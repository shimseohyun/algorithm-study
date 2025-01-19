const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250118/input.txt")
    .toString()
    .trimEnd()
    .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const maps = input.slice(1).map(line => line.split('').map(Number));


const direction = [
    [-1, 0], // 위
    [1, 0],  // 아래
    [0, 1],  // 오른쪽
    [0, -1], // 왼쪽
];

function BFS() {
    const visited = Array.from({ length: n }, () => Array(m).fill(0)); // 방문 여부 배열
    const queue = [[0, 0, 1]]; // [row, col, cnt] 반환환
    visited[0][0] = 1;

    while (queue.length > 0) {
        const [row, col, cnt] = queue.shift();

        
        if (row === n - 1 && col === m - 1) {
            return cnt;
        }

        
        for (const [dx, dy] of direction) {
            const nx = col + dx;
            const ny = row + dy;

            
            if (nx >= 0 && ny >= 0 && nx < m && ny < n && !visited[ny][nx] && maps[ny][nx] === 1) {
                visited[ny][nx] = 1; // 방문 표시
                queue.push([ny, nx, cnt + 1]);
            }
        }
    }

    return -1; // 도달할 수 없는 경우
}

const min = BFS();
console.log(min);
