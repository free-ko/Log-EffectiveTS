// <타입 넓히기>
// - 런타임에 모든 변수는 유일한 값을 가집니다.
// - TS가 작성된 코드를 체크하는 정적 분석 시점에, 변수는 '가능한' 값들의 집한인 타입을 가집니다.
// - 상수를 사용해서 변수를 초기화할 때 타입을 명시하지 않으면 타입 체커는 타입을 결정해야 합니다.
// - 즉, 지정된 단일 값을 가지고 할당 가능한 값들의 집합을 유추해야 한다는 뜻 입니다.
// - 이러한 과정을 '넓히기'라고 부릅니다.
// - 넓히기의 과정을 이해한다면 오류의 원인을 파악하고 타입 구문을 더 효과적으로 사용할 수 있을 것 입니다.
// - TS가 넓히기를 통해 상수의 타입을 추론하는 법을 이해 해야 합니다.
// - 동작에 영향을 줄 수 있는 방법인 'const', '타입 구문', '문맥', 'as const'에 익숙해져야 합니다.

interface Vector3 {
  x: number;
  y: number;
  z: number;
}
function getComponent(vector: Vector3, axis: "X" | "Y" | "Z") {
  return vector[axis];
}

let x = "X";
let vec = { x: 10, y: 20, z: 30 };

// let으로 선언된 값들은 타입 넓히기가 적용되어서, string 타입으로 추론됨
getComponent(vec, x);

// mixed가 될 수 있는 타입들
// - ('x' | 1)[]
// - ['x', 1]
// - [string, number]
// - readonly [string, number]
// - (string | number)[]
// - readonly (string | number)[]
// - [any, any]
// - any[]
const mixed = ["x", 1];

// v의 타입
// - { readonly x:  1 }
// - { x: number }
// - { {[key]: string]: number }
const v = {
  x: 1,
};

v.x = 3;
v.x = "3";
v.y = 4;
v.name = "Pythagoras";

// TS 추론 강도를 직접 제어하려면 TS의 기본 동작을 재정의 해야합니다.
// TS 기본 동작을 재정의 하는 3가지 방법
// - 1. 명시적 타입 구문을 제공
// - 2. 타입 체커에 추가적인 문맥을 제공하는 것
// - 3. const 단언문을 사용하는 것
const newV: { x: 1 | 2 | 3 } = {
  x: 1,
};

const v1 = {
  x: 1,
  y: 2,
};

const v2 = {
  x: 1 as const,
  y: 2,
};

const v3 = {
  x: 1,
  y: 2,
} as const;
