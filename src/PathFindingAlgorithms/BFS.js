import {
  serializeTuple,
  gridNeighbors
} from './GridUtils';
import { PointList } from "../components/DataStructures/PointList";
import { PointMap } from '../components/DataStructures/PointMap';
import { PathfindingAlgorithm } from "./PathfindingAlgorithm";

export class BFS extends PathfindingAlgorithm {

  constructor(n, m, walls, origin, destination) {
    super(n,m,walls,origin,destination);
    this._dist = new PointMap(serializeTuple);
    this._V = new PointList();
    this._E = new PointList();
  }
  
  initialize() {
    this._V.push(this._origin);
    this._E.push(this._origin);
    this._dist.set(this._origin, 0);
  }
  
  executeIteration() {
    if (this._V.isEmpty()) {
      this.terminateFail();
      return;
    }
    
    const current = this._V.pop();
    
    if (current.equals(this._destination)) {
      this.terminateSuccess(current);
    }

    for ( let neighbor of gridNeighbors(current.row, current.col, this._n, this._m) ) {
      if (this._walls.contains(neighbor)) continue;
      if (!this._E.contains(neighbor)) {
        this._cameFrom.set(neighbor, current);
        this._dist.set(neighbor, 5);
        this._V.unshift(neighbor);
        this._E.push(current);
      }
    }
  }
  
  getState() {
    return {
      openSet: new PointList(),
      gScore: this._dist,
    }
  }
  
  suiteExecution() {
    this.initialize();
    while(!this._finished) {
      if (this._V.isEmpty()) this.terminateFail();
      this.executeIteration();
    }
    return [this._success, this._path];
  }

}