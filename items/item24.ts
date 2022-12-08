// <일관성 있는 별칭 사용하기>
// - 요약
// - 별칭은 TS가 타입을 좁히는 것을 방해합니다.
// - 따라서 변수에 별칭을 사용할 때는 일관되게 사용해야 합니다.
// - 비구조화 문법을 사용해서 일관된 이름을 사용하는 것이 좋습니다.
// - 함수 호출이 객체 속성의 타입 정제를 무효화 할 수 있다는 점을 주의해야 합니다. 속성보다 지역 변수를 사용하면 타입 정제를 믿을 수 있습니다.

const borough = {
  name: "Brooklyn",
  location: [40.566, -938.33],
};

// 별칭의 값을 변경하면 원래 속성값에서도 변경됩니다.
// 별칭을 남발하게 사용하면, 제어 흐름을 분석하기 어렵습니다.
const loc = borough.location;

interface Coordinate {
  x: number;
  y: number;
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}

// 객체 비구조화를 이용하면 보다 간결한 문법으로 일관된 이름을 사용할 수 있습니다.
// - 배열과 중첩된 구조에서도 역시 사용할 수 있습니다.
// - 객체 비구조화를 이용할 때는 주의해야 합니다.
// - 객체 비구조화를 통해 얻어지는 값에 undefined가 될 경우 타입의 경계에 Null값을 추가하는 것이 좋습니다.
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const { bbox: box } = polygon;
  if (box) {
    if (
      pt.x < box.x[0] ||
      pt.x > box.x[1] ||
      pt.y < box.y[0] ||
      pt.y < box.y[1]
    ) {
      return false;
    }
  }
}
