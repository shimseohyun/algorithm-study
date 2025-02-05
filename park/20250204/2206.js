const input = require("fs")
    .readFileSync("algorithm-study/park/20250204/input.txt")
    .toString()
    .trim()
    .split('\n');
const [n,m] = input[0].split(' ').map(Number);
const map = input.slice(1).map(line => line.split('').map(Number));
//벽 부순 여부도 관리
const visited = Array.from({length:n} , () => Array.from({length:m} , () => Array(2).fill(0)));
const direction = [
    [-1,0],
    [1,0],
    [0,-1],
    [0,1]
];

class Node {
    constructor(x, y, cnt) {
      this.x = x;
      this.y = y;
      this.cnt = cnt;
      this.next = null;
    }
  }
  

  class Queue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }
    push(x, y, cnt) {
      let node = new Node(x, y, cnt);
      if (this.size === 0) {
        this.head = node;
      } else {
        this.tail.next = node;
      }
      this.tail = node;
      this.size++;
    }
    shift() {
      let temp = this.head;
      if (this.size === 0) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
      }
      this.size--;
      return temp;
    }
    get length() {
      return this.size;
    }
  }
  

//큐에는 row,col,벽을 부순 횟수가 들어간다.
const q = new Queue();
visited[0][0][0] = 1;
q.push(0,0,0);
const bfs = (q,visited) => {
    while(q.length){
        const{x: curRow , y: curCol , cnt: curWall} = q.shift();
        if(curRow === n - 1  && curCol === m - 1){
            return visited[curRow][curCol][curWall];
        }
        for(const [dy,dx] of direction){
            const ny = dy + curRow;
            const nx = dx + curCol;
            if(ny >= 0 && ny < n && nx >= 0 && nx < m){
                    //벽이 아닐때
                    if(map[ny][nx] === 0 && !visited[ny][nx][curWall]){
                        visited[ny][nx][curWall] = visited[curRow][curCol][curWall] + 1;
                        q.push(ny,nx,curWall);
                    }
                    //벽일때 벽 부순 횟수가 0, 방문안했을경우
                    else if(map[ny][nx] === 1 && !visited[ny][nx][1] && curWall === 0){
                        visited[ny][nx][1] = visited[curRow][curCol][curWall] + 1;
                        q.push(ny,nx,1);
                    }
    
            }
        }
        
    }
    return -1;
}
console.log(bfs(q,visited));
