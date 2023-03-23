import { Point } from "../components/GridComponents/Point";
import { PointList } from "../components/DataStructures/PointList";

const genSpiralRecursive = (walls, oR, oC, n, m) => {
  if (n>=5) {
    for (let j=1;j<m-1;j++) {
      if (j!==2) {
        walls.push(Point.of(oR+1,oC+j));
      }
      walls.push(Point.of(oR+n-2,oC+j));
    }
    walls.push(Point.of(oR,oC+1));
    for (let i=1;i<n-2;i++) {
      walls.push(Point.of(oR+i,oC+1));
      walls.push(Point.of(oR+i,oC+m-2));
    }
    return genSpiralRecursive(walls, oR+2, oC+2, n-4, m-4);
  } else if (n===4) {
    for (let j=1;j<m;j++) {
      walls.push(Point.of(oR, oC+j));
    }
    walls.push(Point.of(oR+1,oC+1));
    for (let j=1;j<m-1;j++) {
      walls.push(Point.of(oR+2,oC+j));
    }
    return Point.of(oR+1,oC+2);
  } else if (n===3) {
    walls.push(Point.of(oR, oC + 1));
    for (let j=1;j<m-1;j++) {
      walls.push(Point.of(oR+1,oC+j));
    }
    return Point.of(oR, oC+2);
  } else if (n===2) {
    for (let j=1;j<m;j++) {
      walls.push(Point.of(oR, oC + j));
    }
    return Point.of(oR + 1, oC + m - 1);
  } else if (n===1) {
    return Point.of(oR, oC + m - 1);
  } else {
    throw new Error("Not a valid number of rows "+parseInt(n)+"!!");
  }
}

export class SpiralMaze {
  
  constructor(n, m) {
    this._n=n;
    this._m=m;
    this._walls = new PointList();
    this._origin = Point.of(0, 0);
    this._destination = genSpiralRecursive(this._walls, 0, 0, n, m);
  }
  
  getWalls() {
    return this._walls;
  }
  
  getOrigin () {
    return this._origin;
  }
  
  getDestination () {
    return this._destination;
  }
}