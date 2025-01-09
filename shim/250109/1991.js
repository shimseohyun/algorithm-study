const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

// 이진 트리의 노드의 개수 N(1 ≤ N ≤ 26)이 주어진다.
const N = parseInt(input[0]);

const edges = input.slice(1).map((item) => item.split(" "));
const tree = Array.from({ length: N }, () => Array(3));

const PARENT = 0;
const LEFT_CHILD = 1;
const RIGHT_CHILD = 2;

const getIndex = (char) => {
  return char.charCodeAt(0) - "A".charCodeAt(0);
};

const getChar = (index) => {
  return String.fromCharCode(index + "A".charCodeAt(0));
};

edges.forEach(([p, l, r]) => {
  if (l !== ".") {
    tree[getIndex(l)][PARENT] = getIndex(p);
    tree[getIndex(p)][LEFT_CHILD] = getIndex(l);
  }
  if (r !== ".") {
    tree[getIndex(r)][PARENT] = getIndex(p);
    tree[getIndex(p)][RIGHT_CHILD] = getIndex(r);
  }
});

// 전위 순회
const preorder = (node, result = []) => {
  if (node === undefined) return;
  result.push(getChar(node));
  preorder(tree[node][LEFT_CHILD], result);
  preorder(tree[node][RIGHT_CHILD], result);
  return result.join("");
};

// 중위 순회
const inorder = (node, result = []) => {
  if (tree[node][LEFT_CHILD] != undefined) {
    inorder(tree[node][LEFT_CHILD], result);
  }
  result.push(getChar(node));
  if (tree[node][RIGHT_CHILD] != undefined) {
    inorder(tree[node][RIGHT_CHILD], result);
  }
  return result.join("");
};

// 후위 순회
const postorder = (node, result = []) => {
  if (tree[node][LEFT_CHILD] != undefined) {
    postorder(tree[node][LEFT_CHILD], result);
  }
  if (tree[node][RIGHT_CHILD] != undefined) {
    postorder(tree[node][RIGHT_CHILD], result);
  }
  result.push(getChar(node));
  return result.join("");
};

const result = [preorder(0), inorder(0), postorder(0)];

console.log(result.join("\n"));
