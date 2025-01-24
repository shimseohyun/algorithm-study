const input = require("fs")
    .readFileSync(process.platform === "linux" ? '/dev/stdin' : 'algorithm-study/park/20250123/input.txt')
    .toString()
    .trim()
    .split('\n');
const T = parseInt(input[0]);
let index = 1;

const direction = [
    [-1, 0], // 상
    [1, 0],  // 하
    [0, -1], // 좌
    [0, 1]   // 우
];

function find(y, x, visited, maps) {
    visited[y][x] = 1;

    for (const [dx, dy] of direction) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && ny >= 0 && nx < maps[0].length && ny < maps.length && !visited[ny][nx] && maps[ny][nx] === 1) {
            find(ny, nx, visited, maps);
        }
    }
}

function solution() {
    for (let i = 0; i < T; i++) {
        let ans = 0;
        const [m, n, k] = input[index++].split(' ').map(Number);
        const maps = Array.from({ length: n }, () => Array(m).fill(0));
        const visited = Array.from({ length: n }, () => Array(m).fill(0));

        // 그래프 초기화
        for (let l = 0; l < k; l++) {
            const [x, y] = input[index++].split(' ').map(Number);
            maps[y][x] = 1;
        }

        // 순회
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < m; c++) {
                if (maps[r][c] === 1 && !visited[r][c]) {
                    find(r, c, visited, maps);
                    ans++;
                }
            }
        }
        console.log(ans);
    }
}

solution();
