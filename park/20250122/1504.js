/*
    1504 - 특정한 최단 경로
    시작점에서 N번 점으로 최단 경로 구하기(특정 지점 통과하도록) -> 다익스트라 알고리즘
    특정 두 정점(v1, v2) 지나도록 최단경로 길이 구해야하므로
    시작점에서 v1까지 + v1에서 N번 정점
    시작점에서 v2까지 + v2에서 N번 정점
    을 구한 후 최소 값 출력.

 */
const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250122/input.txt")
    .toString()
    .trim()
    .split("\n");
const [n,e] = input[0].split(' ').map(Number);
let index = 1;

class MinHeap{
    constructor(){
        this.heap = [];
    }
    getSize(){
        return this.heap.length;
    }
    insert(value){
        this.heap.push(value);
        this.heapifyUp();
    }
    extract(){
        if(this.heap.length === 1)  return this.heap.pop();
        const val = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return val;
    }
    swap(idx1,idx2){
        [this.heap[idx1] , this.heap[idx2]] = [this.heap[idx2] , this.heap[idx1]];
    }
    heapifyUp(){
        let index = this.heap.length - 1;
        let parentIdx = Math.floor( (index-1) / 2);

        while(this.heap[parentIdx] !== undefined && this.heap[parentIdx][1] > this.heap[index][1]){
            this.swap(index, parentIdx);
            index = parentIdx;
            parentIdx = Math.floor((index - 1) / 2);
        }
    }

    heapifyDown(){
        let index = 0;
        let leftIdx = index * 2 + 1;
        let rightIdx = index * 2 + 2;
        while((this.heap[leftIdx] !== undefined && this.heap[leftIdx][1] < this.heap[index][1]) ||
            (this.heap[rightIdx] !== undefined && this.heap[rightIdx][1] < this.heap[index][1]))
               {
                let smallerIdx = leftIdx;
                if(this.heap[rightIdx] !== undefined && this.heap[rightIdx][1] < this.heap[leftIdx][1]){
                    smallerIdx = rightIdx;
                }
                this.swap(index,smallerIdx);
                index = smallerIdx;
                leftIdx = index * 2 + 1;
                rightIdx = index * 2 + 2;
               }
        
    }
}

function dijkstra(start,graph){
    const minHeap = new MinHeap();
    const dist = Array.from({length: n+1}, () => Infinity );
    minHeap.insert([start,0]);
    dist[start] = 0;
    while(minHeap.getSize() > 0){
        const [curNode , curDist] = minHeap.extract();
        if(curDist > dist[curNode]) continue;
        for([nextNode , cost] of graph[curNode]){
            const nextDist = curDist + cost;
            if(nextDist < dist[nextNode]){
                dist[nextNode] = nextDist;
                minHeap.insert([nextNode,nextDist]);
            }
        }
    }
    return dist;
}


function solution(){
    let min = Infinity;
    const graph = Array.from({length: n+1} , () => []);
    for(let i = 0; i < e; i++){
        const [a,b,c] = input[index++].split(' ').map(Number);
        graph[a].push([b,c]);
        graph[b].push([a,c]);
    }
    const [v1,v2] = input[index].split(' ').map(Number);
    const candidates = [];
    candidates.push(v1,v2);
    
    const distFromStart = dijkstra(1, graph);
    const distFromV1 = dijkstra(v1, graph);
    const distFromV2 = dijkstra(v2, graph);

    const sToV1 = distFromStart[v1];
    const sToV2 = distFromStart[v2];
    const v1ToV2 = distFromV1[v2];
    const v1ToEnd = distFromV1[n];
    const v2ToEnd = distFromV2[n];

    const path1 = sToV1 + v1ToV2 + v2ToEnd; // 1 -> v1 -> v2 -> N
    const path2 = sToV2 + v1ToV2 + v1ToEnd; // 1 -> v2 -> v1 -> N

    const result = Math.min(path1, path2);
    console.log(result === Infinity ? -1 : result);
}

solution();