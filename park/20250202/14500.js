const fs = require("fs");
const input = fs.readFileSync("algorithm-study/park/20250202/input.txt").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const paper = input.slice(1).map((el) => el.split(" ").map(Number));

const direction = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
];

let ans = 0;
const visited = Array.from({ length: n }, () => Array(m).fill(false));

const dfs = (row, col, cnt, sum) => {
    if (cnt === 4) { // 4칸을 방문했으면 최댓값 갱신
        ans = Math.max(ans, sum);
        return;
    }

    for (const [dy, dx] of direction) {
        const ny = row + dy;
        const nx = col + dx;

        if (ny >= 0 && ny < n && nx >= 0 && nx < m && !visited[ny][nx]) {
            visited[ny][nx] = true;
            dfs(ny, nx, cnt + 1, sum + paper[ny][nx]);
            visited[ny][nx] = false; // 백트래킹 (원상복구)
        }
    }
};

// 1. DFS 실행
for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
        visited[r][c] = true;
        dfs(r, c, 1, paper[r][c]);
        visited[r][c] = false;
    }
}

// 2. 예외 케이스 (ㅜ, ㅗ, ㅓ, ㅏ 모양) 처리
const check = (r, c) => {
    const shapes = [
        [[0, 1], [0, -1], [1, 0]], // ㅜ
        [[0, 1], [0, -1], [-1, 0]], // ㅗ
        [[1, 0], [-1, 0], [0, -1]], // ㅓ
        [[1, 0], [-1, 0], [0, 1]], // ㅏ
    ];

    for (const shape of shapes) {
        let sum = paper[r][c];
        let isValid = true;

        for (const [dy, dx] of shape) {
            const ny = r + dy;
            const nx = c + dx;
            if (ny < 0 || ny >= n || nx < 0 || nx >= m) {
                isValid = false;
                break;
            }
            sum += paper[ny][nx];
        }

        if (isValid) {
            ans = Math.max(ans, sum);
        }
    }
};

// 3. 예외 모양 탐색 실행
for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
        check(r, c);
    }
}

console.log(ans);
