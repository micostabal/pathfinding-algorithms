
export class PriorityQueue {
  
  constructor(costFunction) {
    this._costFunction=costFunction;
    this._map = [];
  }
  
  get map() {return this._map};
  set map(newMap) {this._map=newMap};
  
  insert(newElement) {
    this._map.push(newElement);
    this._map = this._map
      .sort( (a, b) => this._costFunction(a)-this._costFunction(b));
  }
  
  has(element) {
    for( let el of this._map) {
      if (el.equals(element)) {
        return true;
      }
    }
    return false;
  }
  
  size () {
    return this._map.length;
  }

  isEmpty() {
    return this._map.length===0;
  }
  
  getFirst() {
    const shifted = this._map.shift();
    if (!shifted) throw new Error('No more elements in Queue');
    return shifted;
  }
  
  remove(element) {
    this._map = this._map.filter( el => !el.equals(element));
  }
}
