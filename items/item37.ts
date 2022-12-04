// <공식 명칭에는 상표를 붙이기>

// 1. 구조적 타이핑 특성으로 인해 발생하는 이상한 결과.
interface Vector2D {
  x: number;
  y: number;
}

function calculateNorm(p: Vector2D) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

calculateNorm({ x: 3, y: 4 }); // 정상 출력(결과:5)

const vec3D = { x: 3, y: 4, z: 1 };
calculateNorm(vec3D); // 정상 출력...!!!(결과:5)

// - calculateNorm 함수가 3차원 백터를 허용하지 않게 하려면, 공식 명칭(nominal typing)을 사용하면 됨.
// - 공식 명칭 사용하는 것은 타입이 아니라, '값'의 관점에서 Vector2D를 말하는 것.
// - 공식 명칭 개념을 TS에서 흉내 내려면 '상표(brand)'를 붙이면 됨.
// - 상표 기법은 타입 시스템에서 동작하지만, 런타임에 상표를 검사하는 것과 동일한 효과를 얻을 수 있음.
interface NewVector2D {
  _brand: "2d";
  x: number;
  y: number;
}

function vec2D(x: number, y: number): NewVector2D {
  return { x, y, _brand: "2d" };
}

function newCalculateNorm(p: NewVector2D) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

newCalculateNorm(vec2D(3, 4)); // 정상 출력(결과:5);

const newVec3D = { x: 3, y: 4, z: 1 };
newCalculateNorm(newVec3D); // branch 속성이 없다는 에러 발생

// - 런타임에는 절대 경로('/')로 시작하는지 체크하기 쉽지만, 타입 시스템에서는 절대경로를 판단하기 어렵기 때문에 상표 기법을 사용
type AbsolutePath = string & { _brand: "abs" };
function listAbsolutePath(path: AbsolutePath) {
  //...
}

function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startWith("/");
}

type Meters = number & { _brand: "meters" };
type Seconds = number & { _brand: "seconds" };

const meters = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;

const oneKm = meters(1000); // 타입이 Meters
const oneMin = seconds(60); // 타입이 Seconds

const tenKm = oneKm * 10;
const v = oneKm / oneMin;

// <User Defined Type Guards>
interface ZeroBody {
  age: 0;
  name: string;
}

interface OtherBody {
  age: number;
  name: string;
}

interface Response {
  type: string;
  body: ZeroBody | OtherBody;
}

function isZero(arg: any): arg is ZeroBody {
  return arg.age === 0;
}

function doSomething(arg: Response) {
  const { type, body } = arg;

  if (isZero(body)) {
    console.log(body.age);
  } else {
    console.log(body.age);
  }
}
