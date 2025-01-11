const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

// 정점에 1부터 n까지의 번호가 중복 없이 매겨져 있다
const n = parseInt(input[0]);
const inorder = input[1].split(" ").map(Number);
const postorder = input[2].split(" ").map(Number);

// 인오더 (L 루트 R) 1 2 3
// 포스트오더(L R 루트) 1 3 2
// 프리오더(루트 L R) 2 1 3

// 인오더 값의 인덱스를 저장하는 맵 생성
const inorderIndexMap = new Map();
for (let i = 0; i < n; i++) {
  inorderIndexMap.set(inorder[i], i);
}

let postIdx = n - 1;

const constructPreorder = (inStart, inEnd) => {
  if (inStart > inEnd) return [];

  const root = postorder[postIdx--];

  const inIdx = inorderIndexMap.get(root);

  const right = constructPreorder(inIdx + 1, inEnd);
  const left = constructPreorder(inStart, inIdx - 1);

  return [root, ...left, ...right];
};

const preorder = constructPreorder(0, n - 1);

console.log(preorder.join(" "));
