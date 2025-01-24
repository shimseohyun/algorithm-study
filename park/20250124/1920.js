/*
    1920 - 수찾기
*/

const input = require("fs")
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'algorithm-study/park/20250124/input.txt')
    .toString()
    .trim()
    .split("\n");
const answer = [];

function solution(){
    const n = parseInt(input[0]);
    const A = input[1].split(' ').map(Number);
    A.sort((a,b) => a - b);

    const m = parseInt(input[2]);
    const B = input[3].split(' ').map(Number);
    

    const binary_search = (arr , target) =>{
        let start = 0;
        let end = arr.length - 1;
        let mid;

        while(start <= end){
            mid = parseInt((start+end)/2);
            if(target === arr[mid]){
                answer.push(1);
                return;
            }
            else if(target > arr[mid]){
                start = mid + 1
            }
            else if(target < arr[mid]){
                end = mid - 1;
            }
            
        }
        answer.push(0);
    }
    for(const key of B){
        binary_search(A,key);
    }
    console.log(answer.join("\n"));
}
solution();