const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trim()
  .split("\n");

const result = [];
var count = 0;

const w = (a, b, c) => {
  count++;
  if (a <= 0 || b <= 0 || c <= 0) {
    return 1;
  } else if (a > 20 || b > 20 || c > 20) {
    return w(20, 20, 20);
  }

  if (answer[a][b][c] == 0) {
    if (a < b && b < c) {
      answer[a][b][c] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
    } else {
      answer[a][b][c] =
        w(a - 1, b, c) +
        w(a - 1, b - 1, c) +
        w(a - 1, b, c - 1) -
        w(a - 1, b - 1, c - 1);
    }
  }
  return answer[a][b][c];
};

var answer = Array.from({ length: 21 }, () =>
  Array.from({ length: 21 }, () => Array(21).fill(0))
);

for (let i = 0; i < input.length - 1; i++) {
  const letter = input[i].split(" ");
  const a = parseInt(letter[0]);
  const b = parseInt(letter[1]);
  const c = parseInt(letter[2]);

  result.push(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
}

console.log(result.join("\n"));
