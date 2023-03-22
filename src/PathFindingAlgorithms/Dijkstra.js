import {
  gridNeighbors,
  serializeTuple
} from './GridUtils';
import { MinDistPointList } from "../components/DataStructures/MinDistPointList";
import { Point } from '../components/GridComponents/Point';
import { PointMap } from '../components/DataStructures/PointMap';
import { PointList } from '../components/DataStructures/PointList';
import { PathfindingAlgorithm } from './PathfindingAlgorithm';

export class Dijkstra extends PathfindingAlgorithm {

  constructor(n, m, walls, origin, destination) {
    super(n,m,walls,origin,destination);
    this._Q = new MinDistPointList();
    this._dist = new PointMap(serializeTuple);
  }
  
  initialize() {
    let currentPoint = null;
    for (let i=0;i<this._n;i++) {
      for(let j=0;j<this._m;j++) {
        currentPoint=Point.of(i,j);
        this._dist.set(currentPoint, Number.POSITIVE_INFINITY);
        this._Q.push(currentPoint);
      }
    }
    this._dist.set(this._origin, 0);
  }
  
  executeIteration() {
    const current = this._Q.popMinDist(this._dist);
    if (this._dist.get(current)===Number.POSITIVE_INFINITY) {
      this.terminateFail();
    } else if (current.equals(this._destination)) {
      this.terminateSuccess(current);
    }
    
    for ( let neighbor of gridNeighbors(current.row, current.col, this._n, this._m) ) {
      if (this._walls.contains(neighbor)) continue;
      const alt = this._dist.get(current) + 1;
      if (alt < this._dist.get(neighbor)) {
        this._cameFrom.set(neighbor, current);
        this._dist.set(neighbor, alt);
      }
    }
  }
  
  getState() {
    return {
      openSet: new PointList(),
      gScore: this._dist
    }
  }
  
  suiteExecution() {
    this.initialize();
    while(!this._finished) {
      this.executeIteration();
    }
    return [this._success, this._path];
  }

}