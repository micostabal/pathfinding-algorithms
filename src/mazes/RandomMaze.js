import { Point } from "../components/GridComponents/Point";
import { PointList } from "../components/DataStructures/PointList";
import generator from "generate-maze";

export class RandomMazeGenerator {
  
  constructor(n, m) {
    this._n=n;
    this._m=m;
  }
  
  getWalls() {
    const walls = new PointList();
    
    const nRows = this._n/2;
    const nCols = this._m/2;

    const maze = generator(nCols, nRows, true, Math.random()*10000);
    for (let i=0;i<nRows;i++) {
      for (let j=0;j<nCols;j++) {
        if (maze[i][j].bottom) {
          walls.push(Point.of(2*i+1, 2*j));
        }
        if (maze[i][j].right) {
          walls.push(Point.of(2*i, 2*j+1));
        }
        walls.push(Point.of(2*i+1, 2*j+1));
      }
    }
    return walls;
  }
  
  getOrigin() {
    return Point.of(0,0);
  }
  
  getDestination() {
    return Point.of(this._n-2, this._m-2);
  }
}
