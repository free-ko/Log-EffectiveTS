// 데이터가 아닌, API와 명세를 보고 타입 만들기

import { Feature, Geometry } from "geojson";

function calculateBoundingBox(f: Feature): null {
  let box: null = null;

  const helper = (coords: any[]) => {
    // ...
  };

  const geometryHelper = (geometry: Geometry) => {
    if (geometry.type === "GeometryCollection") {
      geometry.geometries.forEach(geometryHelper);
    } else {
      helper(geometry.coordinates);
    }
  };

  const { geometry } = f;
  if (geometry) {
    geometryHelper(geometry);
  }

  return box;
}
