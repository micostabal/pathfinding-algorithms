
export class Point {

  constructor(row, col) {
    this.row=row;
    this.col=col;
  }

  get row() {return this._row};
  set row(newRow) {this._row=newRow}
  get col() {return this._col};
  set col(newCol) {this._col=newCol};
  
  equals(otherPoint) {
    return this.row===otherPoint.row&&this.col===otherPoint.col;
  }

  toArray() {
    return [this.row, this.col];
  }
  
  static of(row, col) {
    return new Point(row, col);
  }
}
