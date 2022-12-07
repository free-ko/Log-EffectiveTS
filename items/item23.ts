// <한꺼번에 객체 생성하기>
// - 변수의 값은 변경될 수 있지만, 타입은 일반적으로 변경되지 않습니다.
// - 객체를 생성할 때는 속성을 하나씩 추가하기보다는, 여러 속성을 포함해서 한꺼번에 생성해야 타입추론에 유리합니다.

const pt = {
  x: 3,
  y: 4,
};

// 객체 전개 연산자를 사용하면, 객체에 속성을 추가 할 때 TS가 새로운 타입을 추론할 수 있게 해 유용합니다.
const id = { name: "Pythagoras" };
const namedPoint = {};
const namedPointed = { ...pt, ...id };

declare let hasMiddle: boolean;
const firstLast = { first: "Harry", last: "Truman" };
const president = { ...firstLast, ...(hasMiddle ? { middle: "S" } : {}) };

declare let hasDates: boolean;
const nameTitle = { name: "Khufu", title: "Pharaoh" };
const pharaoh = {
  ...nameTitle,
  ...(hasDates ? { start: -25484, end: -2566 } : {}),
};

function addOptional<T extends object, U extends object>(
  a: T,
  b: U | null
): T & Partial<U> {
  return { ...a, ...b };
}

const newPharaoh = addOptional(
  nameTitle,
  hasDates ? { start: 123, end: 123 } : null
);
