/*
    21736 - 헌내기는 친구가 필요해!
    bfs 통해서 O 발견시 큐에 계속 넣어주고, P 발견시 cnt값 증가 + 큐에 넣어주기
*/

const input = require("fs")
    .readFileSync("algorithm-study/park/20250131/input.txt")
    .toString()
    .trimEnd()
    .split('\n');
const [n, m] = input[0].split(' ').map(Number);
const campus = input.slice(1).map(el => el.trim().split(''));
const visited = Array.from({ length: n }, () => Array(m).fill(0));
const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
];
let cnt = 0;


class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  // 큐 클래스
  class Queue {
    constructor() {
      this.head = null; // 제일 앞 노드
      this.rear = null; // 제일 뒤 노드
      this.length = 0; // 노드의 길이
    }
  
    enqueue(data) {
      // 노드 추가.
      const node = new Node(data); // data를 가진 node를 만들어준다.
      if (!this.head) {
        // 헤드가 없을 경우 head를 해당 노드로
        this.head = node;
      } else {
        this.rear.next = node; // 아닐 경우 마지막의 다음 노드로
      }
      this.rear = node; // 마지막을 해당 노드로 한다.
      this.length++;
    }
  
    dequeue() {
      // 노드 삭제.
      if (!this.head) {
        // 헤드가 없으면 한 개도 없는 것이므로 false를 반환.
        return false;
      }
      const data = this.head.data; // head를 head의 다음 것으로 바꿔주고 뺀 data를 return
      this.head = this.head.next;
      this.length--;
  
      return data;
    }
    // head를 반환하는 함수
    front() {
      // head가 있을 경우 head의 data를 반환.
      return this.head && this.head.data;
    }
    //큐의 모든 원소를 반환하는 함수
    getQueue() {
      if (!this.head) return false;
      let node = this.head;
      const array = [];
      while (node) {
        // node가 없을 때까지 array에 추가한 후 반환해준다.
        array.push(node.data);
        node = node.next;
      }
      return array;
    }
  }
 

function countPerson(row, col) {
    let head = 0;
    const q = new Queue();
    visited[row][col] = 1;
    q.enqueue([row,col]);
    while (q.length) {
        const [curRow, curCol] = q.dequeue();
        for (const [dy, dx] of direction) {
            const ny = dy + curRow;
            const nx = dx + curCol;
            if (ny >= 0 && ny < n && nx >= 0 && nx < m && !visited[ny][nx]) {
                visited[ny][nx] = 1;
                if (campus[ny][nx] === 'O')
                    q.enqueue([ny,nx]);
                else if (campus[ny][nx] === 'P') {
                    cnt++;
                    q.enqueue([ny,nx]);
                }
            }
        }
    }
}

for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
        if (campus[r][c] === 'I') {
            countPerson(r, c);
        }
    }
}

console.log(cnt === 0 ? 'TT' : cnt);