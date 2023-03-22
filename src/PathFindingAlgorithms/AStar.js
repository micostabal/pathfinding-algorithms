import {
  distance,
  gridNeighbors,
  distanceToPoint,
  serializeTuple
} from './GridUtils';
import { PriorityQueue } from '../components/DataStructures/PriorityQueue';
import { Point } from '../components/GridComponents/Point';
import { PointMap } from '../components/DataStructures/PointMap';
import { PathfindingAlgorithm } from './PathfindingAlgorithm';
import { PointList } from '../components/DataStructures/PointList';

export class AStar extends PathfindingAlgorithm {
  
  constructor(n, m, walls, origin, destination) {
    super(n,m,walls,origin,destination);
    this._openSet = new PriorityQueue(distanceToPoint(destination));
    this._gScore = new PointMap(serializeTuple);
    this._fScore = new PointMap(serializeTuple);
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
    if (this._openSet.isEmpty()) {
      this.terminateFail();
      return;
    }
    
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
  
  getState() {
    const openSetPointList = new PointList();
    openSetPointList.points = this._openSet.map;
    
    return {
      openSet: openSetPointList,
      gScore: this._gScore
    }
  }

  suiteExecution() {
    this.initialize();
    while(!this._finished) {
      if (this._openSet.size()===0) this.terminateFail();
      this.executeIteration();
    }
    return [this._success, this._path];
  }
}