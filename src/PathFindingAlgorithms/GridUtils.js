import { Point } from "../GridComponents/Point";
import { PointList } from "../GridComponents/PointList";

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

export class PriorityQueue {
  
  constructor(destination) {
    this._destination=destination;
    this._map = [];
  }

  get map() {return this._map};
  
  insert(newElement) {
    this._map.push(newElement);
    this._map = this._map
      .sort( (a, b) => distance(a, this._destination)-distance(b, this._destination));
  }
  
  has(element) {
    for( let el of this._map) {
      if (el.equals(element)) {
        return true;
      }
    }
    return false;
  }
  
  size () {
    return this._map.length;
  }
  
  getFirst() {
    const shifted = this._map.shift();
    if (!shifted) throw new Error('No more elements in Queue');
    return shifted;
  }
  
  remove(element) {
    this._map = this._map.filter( el => !el.equals(element));
  }

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