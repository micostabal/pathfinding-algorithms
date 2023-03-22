
export class PointList {
  
  constructor() {
    this._points=[];
  }

  get points() {
    return this._points;
  }

  set points(pts) {
    this._points=pts;
  }

  contains(point) {
    return this._points
      .some( pt => pt.equals(point));
  }

  toArray() {
    return this._points.map( pt => pt.toArray() );
  }

  isEmpty() {
    return this._points.length===0;
  }
  
  push(newPoint) {
    if (!this.contains(newPoint)) {
      this._points.push(newPoint);
    }
  }

  unshift(newPoint) {
    if (!this.contains(newPoint)) {
      this._points.unshift(newPoint);
    }
  }

  pop() {
    return this._points.pop();
  }
  
  prepend(newPoint) {
    if (!this.contains(newPoint)) {
      this._points.unshift(newPoint);
    }
  }

  remove(point) {
    this._points=this.points.filter(pt => !pt.equals(point));
  }

  slice(endIndex) {
    const previousPoints = this.points;
    const newPointList = new PointList();
    newPointList.points = previousPoints.slice(0, endIndex);
    return newPointList;
  }

  [Symbol.iterator]() {
    var index = -1;

    return {
      next: () => ({ value: this._points[++index], done: !(index in this._points) })
    };
  };
}
