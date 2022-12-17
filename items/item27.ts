// <함수형 기법과 라이브러리로 타입 흐름 유지하기>
// - Lodash를 사용하면 타입 정보가 그대로 유지되면서 타입 흐름이 계속 전달됩니다.
// - 반면에 직접 루프를 구현하면 타입 체크에 대한 관리도 직접 해야 합니다.

import _ from "lodash";

const csvData = "...";
const rawRows = csvData.split("\n");
const headers = rawRows[0].split(",");

const rows1 = rawRows.slice(1).map((rowStr) => {
  const row = {};
  rowStr.split(",").forEach((val, j) => {
    row[headers[j]] = val;
  });
  return row;
});

const rows2 = rawRows
  .slice(1)
  .map((rowStr) =>
    rowStr.split(",").reduce((row, val, i) => ((row[headers[i]] = val), row))
  );

const rows3 = rawRows
  .slice(1)
  .map((rowStr) => _.zipObject(headers, rowStr.split(",")));

// JS에서는 프로젝트에 서드파티 라이브러리 종속성을 추가할 때 신중해야 합니다.
// - 만약 서드파티 라이브러리 기반으로 코드를 짧게 줄이는데 시간이 많이 든다면(또는 잦은 업데이트로 변동이 많을 경우) 서드파티 라이브러리를 사용하지 않는게 낫습니다.
// - 그러나! 같은 코드를 TS로 작성하면 서드파티 라이브러리를 사용하는 것이 무조건 유리합니다.
// - 서드파티 라이브러리 타입 정보를 참고하며 작업할 수 있기 때문에 서드파티 라이브러리 기반으로 바꾸는 데 시간이 훨씬 단축됩니다.
// - 데이터의 가공이 정교해질 수록 타입 구문이 없어도 타입이 정확해집니다.

// Lodash 없이 농구선수 연봉순 계산하기
interface BasketballPlayer {
  name: string;
  team: string;
  salary: number;
}

declare const rosters: { [team: string]: BasketballPlayer[] };

const allPlayers = Object.values(rosters).flat();

const teamToPlayers: { [team: string]: BasketballPlayer[] } = {};
for (const player of allPlayers) {
  const { team } = player;
  teamToPlayers[team] = teamToPlayers[team] || [];
  teamToPlayers[team].push(player);
}

for (const players of Object.values(teamToPlayers)) {
  players.sort((a, b) => b.salary - a.salary);
}

let bestPaid = Object.values(teamToPlayers).map((player) => player[0]);
bestPaid.sort((playerA, playerB) => playerB.salary - playerA.salary);
console.log(bestPaid);

// Lodash 사용하면 좋은 점
// - 연산자의 등장 순서와 실행 순서가 동일하게 작업할 수 있습니다.
// - 타입을 정확하게 모델링 할 수 있습니다.
bestPaid = _(allPlayers)
  .groupBy((player) => player.team)
  .mapValues((players) => _.maxBy(players, (p) => p.salary))
  .values()
  .sortBy((p) => p.salary)
  .value(); // 타입이 BasketballPlayer[]

// - Lodash _.map을 사용하면 속성 이름과 함께 콜백을 전달할 수 있습니다.
const namesA = allPlayers.map((player) => player.name); // string[]
const namesB = _.map(allPlayers, (player) => player.name); // string[]
const namesC = _.map(allPlayers, "name"); // string[]

// 함수 호출시 전달된 매개변수 값을 건드리지 않고 매번 새로운 값을 반환함으로써, 새로운 타입으로 안전하게 반환 할 수 있습니다.
const salaries = _.map(allPlayers, "salary"); // number[]
const teams = _.map(allPlayers, "team"); // string[]
const mix = _.map(allPlayers, Math.random() < 0.5 ? "name" : "salary"); // [string | number][]

// <요약>
// - 타입 흐름을 개선하고, 가독성을 높이고, 명시적인 타입 구문의 필요성을 줄이기 위해 직접 구현하기 보다는
// - 내장된 함수형 기법과 로대시 같은 유틸리티 라이브러리를 사용하는 것이 좋습니다.
