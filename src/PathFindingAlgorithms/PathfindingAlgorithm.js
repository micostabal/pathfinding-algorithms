import {
  serializeTuple,
  reconstructPath
} from './GridUtils';
import { PointMap } from '../components/DataStructures/PointMap';

export class PathfindingAlgorithm {
  
  constructor(n, m, walls, origin, destination) {
    this._n=n;
    this._m=m;
    this._walls= walls;
    this._origin=origin;
    this._destination=destination;
    this._cameFrom = new PointMap(serializeTuple);
    this._finished=false;
    this._success=null;
    this._path=null;
  }
  
  get finished() {
    return this._finished;
  }
  
  set finished(newValue) {
    this._finished=newValue;
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
    throw new Error("Initialize is abstract method");
  }
  
  executeIteration() {
    throw new Error("Execute iteration is abstract method");
  }
  
  getState() {
    throw new Error("Get state is abstract method");
  }

  suiteExecution() {
    throw new Error("Suite Execution is abstract method");
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
}