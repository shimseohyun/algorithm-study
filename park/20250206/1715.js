const fs = require('fs');
const input = fs.readFileSync('algorithm-study/park/20250206/input.txt')
    .toString()
    .trim()
    .split('\n');


class MinHeap {
    constructor() {
        this.heap = [];
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop(); // 마지막 요소를 첫 번째로 가져옴
        this._heapifyDown(); // 힙 속성 유지
        return min;
    }

    insert(value) {
        this.heap.push(value); // 맨 끝에 추가
        this._heapifyUp(); // 힙 속성 유지
    }

    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[parent] <= this.heap[index]) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    _heapifyDown() {
        let index = 0;
        while (2 * index + 1 < this.heap.length) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = left;

            if (right < this.heap.length && this.heap[right] < this.heap[left]) {
                smallest = right;
            }

            if (this.heap[index] <= this.heap[smallest]) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    size() {
        return this.heap.length;
    }
}


const n = parseInt(input[0]);
let num = input.slice(1).map(Number)
const heap = new MinHeap();
let result = 0;
num.forEach(val => heap.insert(val));

while(heap.size() > 1){
    let a = heap.extractMin();
    let b = heap.extractMin();
    let sum = a+b;
    result += sum;
    heap.insert(sum);
}

console.log(result);