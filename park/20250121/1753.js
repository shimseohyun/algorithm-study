
const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250121/input.txt")
    .toString()
    .trim()
    .split("\n");
const [v,e] = input[0].split(" ").map(Number);
const k = parseInt(input[1]);
let index = 2;
function solution() {
    const graph = Array.from({length : v + 1}, () => []);
    for(let i = 0; i < e; i++){
        const[u,v,w] = input[index++].split(' ').map(Number);
        graph[u].push([v,w]);
    }
    const dist = dijkstra(k,graph);
    console.log(
        dist
            .slice(1)
            .map((value) => (value === Infinity ? "INF" : value))
            .join("\n")
    );
}


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

    extractMin(){
        if(this.heap.length === 1) return this.heap.pop();
        const value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return value;
    }
    swap(idx1,idx2){
        [this.heap[idx1] , this.heap[idx2]] = [this.heap[idx2] , this.heap[idx1]];
    }
    heapifyUp(){
        let index = this.heap.length - 1;
        const current = this.heap[index];
        while(index > 0){
            let parentIdx = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIdx];

            if(current[1] >= parent[1]) break;

            this.heap[index] = parent;
            index = parentIdx;
        }
        this.heap[index] = current;
    }

    heapifyDown(){
        let index = 0;
        const length = this.heap.length;
        const current = this.heap[0];

        while(true){
            const leftIdx = index * 2 + 1;
            const rightIdx = index * 2 + 2;
            let smallest = index;

            if(
                leftIdx < length &&
                this.heap[leftIdx][1] < this.heap[index][1]
            ){
                smallest = leftIdx;
            }
            if(
                rightIdx < length &&
                this.heap[rightIdx][1] < this.heap[index][1]
            ){
                smallest = rightIdx;
            }
            if(smallest === index)  break;

            this.heap[index] = this.heap[smallest];
            index = smallest;
        }
        this.heap[index] = current;
    }
}

function dijkstra(start,graph){
    const minHeap = new MinHeap();
    const dist = Array.from({length : v+1} , () => Infinity);
    dist[start] = 0;
    minHeap.insert([start,0]);

    while(minHeap.getSize() > 0){
        const [curNode, curDist] = minHeap.extractMin();
        if( curDist > dist[curNode])   continue;

        for(const [nextNode , cost] of graph[curNode]){
            const nextDist = curDist + cost;

            if(nextDist < dist[nextNode]){
                dist[nextNode] = nextDist;
                minHeap.insert([nextNode,nextDist]);
            }
        }
    }
    return dist;
}



solution();