import { Point } from "../components/GridComponents/Point";
import { PointList } from "../components/DataStructures/PointList";

export class TrivialMaze {
  
  constructor(n, m) {
    this._n=n;
    this._m=m;
  }
  
  getWalls() {
    const walls = new PointList();
    for (let j=0;2*j+1<this._m;j++) {
      for (let i=1;i<this._n-1;i++) {
        walls.push(Point.of(i, 2*j+1));
      }
      walls.push(Point.of(
        j%2===0 ? 0 : this._n-1,
        2*j+1
      ));
    }
    return walls;
  }

  getOrigin () {
    return Point.of(0, 0);
  }
  
  getDestination () {
    const col = this._m-1;
    let row = this._n-1;
    if ((this._m-1)%2===1) {
      row=(((this._m-1)/2)%2===0) ? this._n-1 : 0;
    }
    return Point.of(Math.round(row), col);
  }
}