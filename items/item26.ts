// <타입 추론에 문맥이 어떻게 사용되는지 이해하기>
// - Ts는 타입을 추론할 때 단순히 값만 고려하지는 않습니다.
// - 값이 존재하는 곳의 문맥까지도 살핍니다.

// <튜플 사용 시 주의점>
function panTo(where: [number, number]) {}

panTo([10, 20]);

const loc: [number, number] = [10, 20]; // 상수 문맥을 제공
panTo(loc);

// const로 선언하면, 값이 가리키는 참조가 변하지 않는 얕은 상수입니다.
// as const로 선언하면, 그 값이 내부까지 상수라는 사실을 TS에게 알려줍니다.
// as const는 문맥 손실과 관련한 문제를 깔끔하게 해결할 수 있지만, 한 가지 단점을 가지고 있습니다.
// 만약 타입 정의에 실수가 있다면(예를 들어, 튜플에 3번째 요소를 추가한다면)오류는 타입 정의가 아니라, 호출되는 곳에서 발생합니다.
// 특히 여러 겹 중첩된 객체에서 오류가 발생한다면 근본적인 원인을 파악하기 어렵습니다.
const newLoc = [10, 20] as const;
panTo(newLoc);

// <객체 사용시 주의점>
type Language = "JS" | "TS" | "React";
interface DevLanguage {
  language: Language;
  dev: string;
}

function complain(language: DevLanguage) {}

complain({ language: "JS", dev: "web" });

const ts = {
  language: "TS",
  dev: "WEB",
};

// 에러 해결을 하기 위해,
// - ts에 타입을 DevLanugage로 명시하던가
// - 상수 단언(as const)를 사용해서 해결합니다.
complain(ts);

// <콜백 사용 시 주의점>
// - 콜백을 다른 함수로 전달 할 때, TS는 콜백의 매개변수 타입을 추론하기 위해 문맥을 사용합니다.
// - 가능할 경우 전체 함수 표현식에 타입 선언을 적용하는 것입니다.
function callWithRandomNumbers(fn: (n1: number, n2: number) => void) {
  fn(Math.random(), Math.random());
}

const fn = (a: number, b: number) => {
  console.log(a + b);
};

callWithRandomNumbers(fn);

// <요약>
// - 타입 추론에서 문맥이 어떻게 쓰이는지 주의해서 살펴봐야 합니다.
// - 변수를 뽑아서 별도로 선언했을 때 오류가 발생한다면 타입 선언을 추가해야 합니다.
// - 변수가 정말로 상수라면 상수 단언(as const)를 사용해야 합니다. 그러나 상수 단언을 사용하면 정의한 곳이 아니라, 사용한 곳에서 오류가 발생하므로 주의해야 합니다.
