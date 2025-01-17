/*
    두 팀의 능력치의 차이를 최소로.
    if N = 4 -> 2,2 로 나누어야하며 (즉 level은 2)
    if N = 6 -> 3,3 로 나누어여하며 (   level은 3)
    조합을 이용해야 하지 않을까? => 백트래킹,DFS . . .
    level 이 N / 2 가 됐을때
    각자 팀으로 선정된 애들의 능력치 합을 구해서 min 함수로 min에 대입
 */

const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "algorithm-study/park/20250117/input.txt")
    .toString()
    .trim()
    .split("\n");

let min = Number.MAX_SAFE_INTEGER;
/*
    2차원 배열 할당,,,, 이런 부분 따로 정리 해봐야 할듯 매번 찾아보게 된다............
    input.slice(1) -> 배열에서 첫 번째 요소를 제외한 나머지 요소를 반환.
    map통해 새로운 배열 반환.
*/
const N = parseInt(input[0]);
const s = input.slice(1).map(line => line.split(" ").map(Number));

// 인덱스를 담을 배열
const current = [];

/*
    조합이 완성될 때마다 해당 팀의 능력치 합을 계산하여 MIN을 해당 값으로 업데이트한다다
 */
function DFS(level, start) {
    // 조합 완성 조건: N / 2 크기의 조합이 만들어지면 저장
    if (level === N / 2) {
        const sTeam = [];
        const lTeam = [];
        let sSum = 0;
        let lSum = 0;
        for(let i = 0; i < N; i++){
            if(current[i]) sTeam.push(i);
            else lTeam.push(i);
        }
        for(let i = 0; i < N / 2; i++){
            for(let j = i+1; j < N / 2; j++){
                sSum += s[sTeam[i]][sTeam[j]] + s[sTeam[j]][sTeam[i]];
                lSum += s[lTeam[i]][lTeam[j]] + s[lTeam[j]][lTeam[i]]; 
            }
        }
        min = Math.min(min, Math.abs(sSum-lSum));
        return;
        
    }

    // 가능한 숫자들을 순회하며 조합 생성
    for (let i = start; i < N; i++) {
        current[i] = 1; // i번 인덱스 선택
        DFS(level + 1, i + 1); // 다음 단계로 진행
        current[i] = 0; // 선택한 숫자 제거 (백트래킹)
    }
}

DFS(0,0);
console.log(min);



