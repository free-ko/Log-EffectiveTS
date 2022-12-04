// <타입 좁히기>

// 1. 조건문으로 타입 좁히기
// - 일반적인 Null 체크
const el = document.getElementById("foo"); // 타입: HTMLElement | null
if (!el) throw new Error("Unable to find #foo");

// 2. interfaceof으로 타입 좁히기
function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    return !!search.exec(text);
  }

  return text;
}

// 참고
// - primitive type을 구분할 때에는 typeof를 사용
// - 클래스의 타입을 구분할 때에는 instanceof를 사용

// 3. 속성 체크로 타입 좁히기
interface A {
  a: number;
}
interface B {
  b: number;
}

function pickAB(ab: A | B) {
  if ("a" in ab) {
    return ab; // A 타입
  } else {
    return ab; // B 타입
  }

  // 여기서 ab A | B 타입
}

// 4. Array.isArray 내장 함수로 타입 좁히기
function contain(text: string, terms: string | string[]) {
  const termList = Array.isArray(terms) ? terms : [terms];

  return termList; // 타입이 string[]
}

// 유니온 타입에서 null 제외하기 위해 잘못된 방법 예시
if (typeof el === "object") {
  // el 타입은 null | HTMLElement 입니다.
  // 왜냐하면 null도 object 타입니다.
  // typeof null -> object
}

// 기본형 값을 제대로 인지하지 못해 타입 좁히기 잘못된 방법 예시
function test(x?: number | string | null) {
  if (!x) {
    // '', 0 모두 false이기 때문에 타입이 좁혀지지 않습니다.
    return x; // string | number | null | undefined
  }
}

// <타입을 좁히는 일반적인 방법>
// 1. 명시적 '태그'를 붙이는 것(태그된 유니온, 구별된 유니온 패턴)
interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}
interface DownloadEvent {
  type: "download";
  filename: string;
}

type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(e: AppEvent) {
  switch (e.type) {
    case "upload":
      return e;
    case "download":
      return e;
  }
}

// 2. TS가 타입을 식별하지 못한다면, 식별을 돕기 위해 커스텀 함수를 도입
// - 사용자 정의 타입 가드 기법
// - isInputElement 반환 타입이 True이면, 매개변수 el의 타입은 HTMLInputElement 타입이라고 알려줍니다.(매개변수 타입 좁히기)
function isInputElement(el: HTMLElement): el is HTMLInputElement {
  return "value" in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    return el.value;
  }
  return el.textContent;
}

// 타입 가드를 사용해, 배열과 객체의 타입 좁히기를 수행가능합니다.
const jackson5 = ["Jackie", "Tito", "Jermaine", "Marlon", "Michael"];

// members 타입: (string | undefined)[]
const members = ["Janet", "Micheal"]
  .map((who) => jackson5.find((n) => n === who))
  .filter((who) => who !== undefined);

// undefined 타입을 제거하기 위해, '타입 가드'를 이용
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

// newMembers 타입은 string[]
const newMembers = ["Janet", "Michael"]
  .map((who) => jackson5.find((n) => n === who))
  .filter(isDefined);
