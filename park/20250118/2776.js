const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250118/input.txt")
    .toString()
    .trim()
    .split("\n");

const n = parseInt(input[0]); // 첫 번째 줄의 크기(n)
const maps = input.slice(1).map(line => line.split('').map(Number)); // 지도 배열
const visited = Array.from({ length: n }, () => Array(n).fill(0)); // 방문 배열
const result = [];
let room = [];

// 방향 설정 (상, 하, 좌, 우)
const direction = [
    [-1, 0], // 위
    [1, 0],  // 아래
    [0, -1], // 왼쪽
    [0, 1]   // 오른쪽
];


function DFS(row, col) {
    visited[row][col] = 1; // 현재 위치 방문 처리
    room.push([row, col]); // 현재 위치를 방에 추가
    
    
    for (const [dx, dy] of direction) {
        const nx = col + dx;
        const ny = row + dy;

        // 배열 범위 내에 있고, 방문하지 않았으며, 값이 1인 경우
        if (nx >= 0 && ny >= 0 && ny < n && nx < n && maps[ny][nx] === 1 && visited[ny][nx] === 0) {
            DFS(ny, nx); // 다음 위치로 이동
        }
    }
}

// 전체 지도 탐색
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // 방문하지 않은 1인 영역에서 DFS 시작(시작 인덱스 찾는..)
        if (maps[i][j] === 1 && visited[i][j] === 0) {
            room = []; // 방 초기화
            DFS(i, j); // DFS 호출
            if (room.length >= 1) result.push([...room]); // 방 크기가 1 이상이면 결과에 추가
        }
    }
}

console.log(result.length);
//오름차순 정렬 및 출력력
const lengthArr = Array.from({ length: result.length }, (_, x) => result[x].length);
lengthArr.sort( (a,b) => a-b);
lengthArr.forEach((num) => {
    console.log(num);
})