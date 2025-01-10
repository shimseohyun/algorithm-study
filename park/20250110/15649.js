const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "park/20250110/input.txt")
  .toString()
  .trim()
  .split("\n");
const [a, b] = input[0].split(" ").map(Number);

function solution(a, b) {
  const arr = [...Array(b)].fill(0);  // 크기 b만큼의 배열 생성
  const visited = [...Array(a)].fill(false);  // a 개수 만큼 방문 여부 배열 생성
  let result = '';

  function DFS(depth) {
    // depth가 b에 도달하면 결과를 기록하고 리턴
    if (depth === b) {
      result += `${arr.join(' ')}\n`;
      return;
    }

    for (let i = 0; i < a; i++) {
      if (visited[i]) continue; // 이미 선택된 숫자는 건너뜀
      visited[i] = true; // 숫자 선택 표시
      arr[depth] = i + 1; // 현재 깊이에 해당하는 인덱스에 값 할당
      DFS(depth + 1); // 다음 깊이로 진행
      visited[i] = false; // 탐색 종료 후 선택 해제
    }
  }

  DFS(0); // DFS 시작
  return result;
}

console.log(solution(a, b));
