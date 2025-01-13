const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n")
  .map(Number);

const tree = Array.from({ length: input.length }, () => Array(3));
const [PARENT, LEFT, RIGHT] = [0, 1, 2];

const getTree = () => {
  let currentIndex = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[currentIndex] < input[i]) {
      // 오른쪽 노드
      let parentIndex =
        tree[currentIndex][PARENT] === undefined
          ? 0
          : tree[currentIndex][PARENT];

      // 추가하려는 숫자보다 큰 부모를 찾는다
      while (input[parentIndex] < input[i]) {
        currentIndex = parentIndex;
        parentIndex = tree[currentIndex][PARENT];
      }

      // 부모를 따라 이동하고, 오른쪽이 빈 부모를 찾아 삽입한다
      while (tree[currentIndex][RIGHT] !== undefined) {
        currentIndex = tree[currentIndex][RIGHT];
      }

      tree[currentIndex][RIGHT] = i;
      tree[i][PARENT] = currentIndex;
    } else if (input[currentIndex] > input[i]) {
      // 완쪽노드
      tree[currentIndex][LEFT] = i;
      tree[i][PARENT] = currentIndex;
    }

    currentIndex = i;
  }
};

getTree();

const postorder = (node, result = []) => {
  if (tree[node][LEFT] != undefined) {
    postorder(tree[node][LEFT], result);
  }

  if (tree[node][RIGHT] != undefined) {
    postorder(tree[node][RIGHT], result);
  }
  result.push(input[node]);
  return result.join("\n");
};

console.log(postorder(0));
