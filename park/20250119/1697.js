const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250119/input.txt")
    .toString()
    .trim();
const [n,k] = input.split(' ').map(Number);
const MAX = 1000000;


/*
    x-1 , x+1 , 2x 에 대해 각각 BFS로 최단거리를 구한다면 비효율적
    BFS를 통해 가장 먼저 도달한다면 그것이 곧 최단거리일 것이다.
    큐에는 현재 위치와 이동 시간을 넣어주고 반복문을 통해 x-1 , x+1 , 2x 를 돌린다.
*/

function BFS(n,k){
    const visited = Array(MAX).fill(false);
    visited[n] = true;
    const q = [[n,0]];    //시작 지점은 n이며 처음에는 0초부터 시작
    while(q.length !== 0){
        let [current,seconds] = q.shift();
        if(current === k){
            return seconds;
        }
        // x-1 x+1 2x 에 대해 탐색색
        for(const next of [current-1, current+1, current*2]){
            //N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다
            if(next >= 0 && next <= MAX && !visited[next]){
                visited[next] = true;
                q.push([next,seconds+1]);
            }
        }
        
    }
}
console.log(BFS(n,k));