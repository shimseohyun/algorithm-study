const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250127/input.txt")
    .toString()
    .trim()
    .split('\n');
const n = parseInt(input[0]);
let index = 1;

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    getSize() {
        return this.heap.length;
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extractMax() {
        if (this.heap.length === 1) return this.heap.pop();
        const value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return value;
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        const current = this.heap[index];
        while (index > 0) {
            let parentIdx = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIdx];

            if (current <= parent) break;

            this.heap[index] = parent;
            index = parentIdx;
        }
        this.heap[index] = current;
    }

    heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        const current = this.heap[0];
    
        while (true) {
            const leftIdx = index * 2 + 1;
            const rightIdx = index * 2 + 2;
            let largest = index;
    
            // 왼쪽 자식과 비교
            if (leftIdx < length && this.heap[leftIdx] > this.heap[largest]) {
                largest = leftIdx;
            }
            // 오른쪽 자식과 비교
            if (rightIdx < length && this.heap[rightIdx] > this.heap[largest]) {
                largest = rightIdx;
            }
            // 현재 위치와 가장 큰 값의 위치가 같으면 종료
            if (largest === index) break;
    
            
            this.swap(index, largest);
            index = largest;
        }
    }
    
}

function solution() {
    const maxHeap = new MaxHeap();
    const answer = [];
    for (let i = 0; i < n; i++) {
        let x = parseInt(input[index++]);
        if (x === 0) {
            if (maxHeap.getSize() === 0) answer.push(0);
            else answer.push(maxHeap.extractMax());
        } else {
            maxHeap.insert(x);
        }
    }
    console.log(answer.join('\n'));
}

solution();