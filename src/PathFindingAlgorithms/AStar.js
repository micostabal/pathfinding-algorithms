import {
  serializeTuple,
  distance,
  PriorityQueue,
  reconstructPath,
  gridNeighbors
} from './GridUtils';
import { Point } from '../GridComponents/Point';
import { PointMap } from '../GridComponents/PointMap';

export class AStar {

  constructor(n, m, walls, origin, destination) {
    this._n=n;
    this._m=m;
    this._walls= walls;
    this._origin=origin;
    this._destination=destination;
    this._gScore = new PointMap(serializeTuple);
    this._fScore = new PointMap(serializeTuple);
    this._cameFrom = new PointMap(serializeTuple);
    this._openSet = new PriorityQueue(destination);
    this._finished=false;
    this._success=null;
    this._path=null;
  }
  
  getState() {
    return {
      openSet: this._openSet,
      gScore: this._gScore,
      fScore: this._fScore
    }
  }

  isFinished() {
    return this._finished;
  }

  isSuccess() {
    return this._success;
  }

  get path() {
    return this._path;
  }
  
  initialize() {
    for (let i=0;i<this._n;i++) {
      for(let j=0;j<this._m;j++) {
        this._gScore.set(Point.of(i,j), Number.POSITIVE_INFINITY);
        this._fScore.set(Point.of(i,j), Number.POSITIVE_INFINITY);
      }
    }
    this._gScore.set(this._origin, 0);
    this._fScore.set(this._origin, distance(this._destination, this._origin));
    
    this._openSet.insert(this._origin);
  }
  
  executeIteration() {
    const current = this._openSet.getFirst();
    
    if (current.equals(this._destination)) {
      this.terminateSuccess(current);
    }
    
    this._openSet.remove(current);
    for ( let neighbor of gridNeighbors(current.row, current.col, this._n, this._m) ) {
      if (this._walls.contains(neighbor)) continue;
      const tentativeGScore = this._gScore.get(current) + distance(current, neighbor);
      if (tentativeGScore < this._gScore.get(neighbor)) {
        this._cameFrom.set(neighbor, current);
        this._gScore.set(neighbor, tentativeGScore);
        this._fScore.set(neighbor, tentativeGScore+distance(neighbor, this._destination));
        if (!this._openSet.has(neighbor)) {
          this._openSet.insert(neighbor);
        }
      }
    }
  }

  terminateFail() {
    this._finished=true;
    this._success = false;
    this._path = null;
  }
  
  terminateSuccess(current) {
    this._finished=true;
    this._success = true;
    this._path = reconstructPath(this._cameFrom, current);
  }
  
  suiteExecution() {
    this.initialize();
    while(!this._finished) {
      this.executeIteration();
      if (this._openSet.size()===0) this.terminateFail();
    }
    return [this._success, this._path];
  }

}