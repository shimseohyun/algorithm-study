const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "../input.txt")
  .toString()
  .trimEnd()
  .split("\n");

// 첫째 줄에 N(4 ≤ N ≤ 20, N은 짝수)이 주어진다.
const N = parseInt(input[0]);

// 둘째 줄부터 N개의 줄에 S가 주어진다.
const S = input.slice(1).map((i) => i.split(" ").map(Number));

const teamAbilityList = [];

const calculateAbility = (team, ability, newPlayer) => {
  if (team[0] === newPlayer) {
    return ability;
  }

  for (let player of team) {
    ability += S[player][newPlayer];
    ability += S[newPlayer][player];
  }

  return ability;
};

const makeTeam = (start, team, ability) => {
  if (team.length === N / 2) {
    teamAbilityList.push(ability);
    return;
  }
  for (let i = start; i < N; i++) {
    if (team.length < N / 2) {
      team.push(i);
      makeTeam(i + 1, [...team], calculateAbility(team, ability, i));
      team.pop();
    } else {
      return;
    }
  }

  return;
};

makeTeam(0, [], 0);

let minGap = Infinity;
for (let t = 0; t < teamAbilityList.length / 2; t++) {
  const gap = Math.abs(
    teamAbilityList[t] - teamAbilityList[teamAbilityList.length - 1 - t]
  );

  if (minGap > gap) {
    minGap = gap;
  }
}

console.log(minGap);
