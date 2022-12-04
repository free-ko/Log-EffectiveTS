type GeoPosition = [number, number]

interface Point {
  type: 'Point';
  coordinates: GeoPosition;
}

interface LineString {
  type: 'LineString';
  coordinates: number[][];
}

interface Polygon {
  type: 'Polygon';
  coordinates: number[][][];
}

type Geometry = Point | LineString | Polygon;