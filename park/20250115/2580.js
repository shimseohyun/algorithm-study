const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250115/input.txt")
    .toString()
    .trim()
    .split("\n");

// input을 2차원 배열로 할당
const board = input.map(row => row.trim().split(" ").map(Number));
// key값이 0인 index들을 담을 zeroBoard 
const zeroBoard = [];
/*
    forEach(value , index) -> Array에 대해 순차 탐색
    1번째 인자로 요소를
    2번째 인자로 해당 인덱스를
*/
board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
        if (value === 0) {
            zeroBoard.push([rowIndex, colIndex]);
        }
    });
});

/*
        1. 같은 행에 있는지 같은 열에 있는지 3x3 박스안에 있는지 check 하는 함수 설계
        2. check를 수행하며 탐색
        3. 가능한 답이 구현 되면 탐색 종료(여러개면 하나만 출력하면 되기에)
*/


function check(board, checkNum, row, col) {
    //같은 행/열에 있는지 check
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === checkNum || board[i][col] === checkNum) {
            return false;
        }
    }
    //3x3박스 영역에 있는지 check
    /*
        3으로 나눈 정수 부분에 3을 곱하여여 3x3 박스의 시작 인덱스로 지정하여 해당 박스를 순회시킨다.
    */
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === checkNum) {
                return false; // 3x3 블록 안에 value가 있음
            }
        }
    }
    //둘 다 해당 없다면 false 반환
    return true;
}

function DFS(n) {
    if (n === zeroBoard.length) {
        board.forEach(row => console.log(row.join(" ")));
        return; // 탐색 종료
    }
    /*
        0인 인덱스들에 대해서 1~9를 check하여 넣어도 되면 넣는다
    */
    for (let checkNum = 1; checkNum <= 9; checkNum++) {
    
        let [row, col] = zeroBoard[n];
        if (check(board, checkNum, row, col)) {
            board[row][col] = checkNum;
            DFS(n + 1);
            board[row][col] = 0;
        }
    }
}

DFS(0);


