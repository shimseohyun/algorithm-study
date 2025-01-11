// 입력값 읽기
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

// 정점 수
const n = parseInt(input[0]);

const inorder = input[1].split(" ").map(Number);
const postorder = input[2].split(" ").map(Number);

const inorderIndex = new Array(n + 1);
inorder.forEach((value, index) => {
  inorderIndex[value] = index;
});

// 결과를 담을 배열
let preorderResult = [];

// 재귀 함수로 트리를 순회하여 프리오더를 구함
function getPreorder(inStart, inEnd, postStart, postEnd) {
  if (inStart > inEnd || postStart > postEnd) return;

  // 후위순회의 마지막 값
  // 루트 노드
  const root = postorder[postEnd];
  preorderResult.push(root);

  // 중위순회에서 루트노드의 인덱스를 찾음
  const rootIndex = inorderIndex[root];

  // 왼쪽 트리 크기
  const leftSize = rootIndex - inStart;

  // 왼쪽 서브트리 순회
  getPreorder(inStart, rootIndex - 1, postStart, postStart + leftSize - 1);
  // 오른쪽 서브트리 순회
  getPreorder(rootIndex + 1, inEnd, postStart + leftSize, postEnd - 1);
}

getPreorder(0, n - 1, 0, n - 1);

// 결과 출력
console.log(preorderResult.join(" "));
