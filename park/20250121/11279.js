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
    size(){
        return this.heap.length;
    }
    push(value){
        this.heap.push(value);
        this.bubbleUp();
    }
    pop(){
        if(this.heap.length === 1) return this.heap.pop();
        const value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return value;
    }
    swap(index1 , index2){
        [this.heap[index1] , this.heap[index2]] = [this.heap[index2],this.heap[index1]];
    }
    bubbleUp(){
        let index = this.heap.length - 1;
        let parentIdx = Math.floor( (index-1) / 2);
        while( (this.heap[parentIdx] && (this.heap[parentIdx] > this.heap[index]))){
            this.swap(index,parentIdx);
            index = parentIdx;
            parentIdx = Math.floor((index-1)/2);
        }
    }
    bubbleDown(){
        let index = 0;
        let leftIdx = index * 2 + 1;
        let rightIdx = index * 2 + 2;
        while(
            (this.heap[leftIdx] !== undefined && this.heap[leftIdx] < this.heap[index]) ||
            (this.heap[rightIdx] !== undefined && this.heap[rightIdx] < this.heap[index])
          ){
            let smallerIdx = leftIdx;
            if(this.heap[rightIdx] !== undefined && this.heap[rightIdx] < this.heap[leftIdx]){
                smallerIdx = rightIdx;
            }
                
          
          this.swap(smallerIdx,index);
          index = smallerIdx;
          leftIdx = index * 2 + 1;
          rightIdx = index * 2 + 2;
    }
}
}

function solution(){

    const minHeap = new MinHeap();
    const answer = [];
    for(let i = 0; i < n; i++){
        let x = parseInt(input[index++]);
        if(x === 0){
            if(minHeap.size() === 0)
                answer.push(0);
            else
                answer.push(minHeap.pop());
        }
        else{
            minHeap.push(x);
        }
        
    
    }
    console.log(answer.join('\n'));
    

}
solution();
