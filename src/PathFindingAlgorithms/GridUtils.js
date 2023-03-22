import { Point } from "../components/GridComponents/Point";
import { PointList } from "../components/DataStructures/PointList";

export const SEPARATOR=',';

export function serializeTuple(tuple) {
  return `${tuple[0]}${SEPARATOR}${tuple[1]}`;
}

export function deserializeTuple(serializedTuple) {
  const [rowToken, colToken] = serializedTuple.split(SEPARATOR);
  return [Number(rowToken), Number(colToken)];
}

export function distance(p1, p2) {
  return Math.sqrt((p1.row-p2.row)**2+(p1.col-p2.col)**2);
}

export function distanceToPoint(referencePoint) {
  return (point) => distance(point, referencePoint);
}

export const reconstructPath = (cameFrom, current) => {
  let totalPath = new PointList();
  totalPath.prepend(current);

  while (cameFrom.has(current)) {
    current=cameFrom.get(current);
    totalPath.prepend(current);
  }
  return totalPath;
}

export const gridNeighbors = (i,j,n,m) => {
  const neighbors = [];
  if (i<n-1) neighbors.push(Point.of(i+1, j));
  if (i>0) neighbors.push(Point.of(i-1, j));
  if (j<m-1) neighbors.push(Point.of(i, j+1));
  if (j>0) neighbors.push(Point.of(i, j-1));
  return neighbors;
}