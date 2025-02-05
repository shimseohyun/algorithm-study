const input = require("fs") 
    .readFileSync("algorithm-study/park/20250205/input.txt")
    .toString()
    .trim()
    .split('\n');

    class AbsHeap {
        constructor() {
            this.heap = [];
        }
    
        heap_push(value) {
            this.heap.push(value);
            let currentIndex = this.heap.length - 1;
            let parentIndex = Math.floor((currentIndex - 1) / 2);
    
            while (
                parentIndex >= 0 &&
                (Math.abs(this.heap[parentIndex]) > Math.abs(value) ||
                    (Math.abs(this.heap[parentIndex]) === Math.abs(value) && this.heap[parentIndex] > value))
            ) {
                [this.heap[parentIndex], this.heap[currentIndex]] =
                    [this.heap[currentIndex], this.heap[parentIndex]];
    
                currentIndex = parentIndex;
                parentIndex = Math.floor((currentIndex - 1) / 2);
            }
        }
    
        heap_pop() {
            if (this.heap.length === 0) return 0;
            if (this.heap.length === 1) return this.heap.pop();
    
            const returnVal = this.heap[0];
            this.heap[0] = this.heap.pop();
    
            let currentIndex = 0;
            let leftIndex = 1;
            let rightIndex = 2;
    
            while (
                (leftIndex < this.heap.length &&
                    (Math.abs(this.heap[currentIndex]) > Math.abs(this.heap[leftIndex]) ||
                        (Math.abs(this.heap[currentIndex]) === Math.abs(this.heap[leftIndex]) &&
                            this.heap[currentIndex] > this.heap[leftIndex]))) ||
                (rightIndex < this.heap.length &&
                    (Math.abs(this.heap[currentIndex]) > Math.abs(this.heap[rightIndex]) ||
                        (Math.abs(this.heap[currentIndex]) === Math.abs(this.heap[rightIndex]) &&
                            this.heap[currentIndex] > this.heap[rightIndex])))
            ) {
                let swapIndex = leftIndex;
    
                if (
                    rightIndex < this.heap.length &&
                    (Math.abs(this.heap[rightIndex]) < Math.abs(this.heap[leftIndex]) ||
                        (Math.abs(this.heap[rightIndex]) === Math.abs(this.heap[leftIndex]) &&
                            this.heap[rightIndex] < this.heap[leftIndex]))
                ) {
                    swapIndex = rightIndex;
                }
    
                [this.heap[currentIndex], this.heap[swapIndex]] =
                    [this.heap[swapIndex], this.heap[currentIndex]];
    
                currentIndex = swapIndex;
                leftIndex = currentIndex * 2 + 1;
                rightIndex = currentIndex * 2 + 2;
            }
    
            return returnVal;
        }
    }
    
    
 const n = parseInt(input[0]);
 let index = 1;
 const absHeap = new AbsHeap();
 for(let i = 0; i < n; i++){
    const x = parseInt(input[index++]);
    if(x !== 0)
        absHeap.heap_push(x);
    else{
        console.log(absHeap.heap_pop());
    }
 }