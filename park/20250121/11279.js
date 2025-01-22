const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250121/input.txt")
    .toString()
    .trim()
    .split('\n');
const n = parseInt(input[0]);
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

function solution(){

    const minHeap = new MinHeap();
    const answer = [];
    for(let i = 0; i < n; i++){
        let x = parseInt(input[index++]);
        if(x === 0){
            if(minHeap.getSize() === 0)
                answer.push(0);
            else
                answer.push(minHeap.extractMin());
        }
        else{
            minHeap.insert(x);
        }
        
    
    }
    console.log(answer.join('\n'));
    

}
solution();
