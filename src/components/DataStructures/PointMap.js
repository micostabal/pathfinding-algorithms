
export class PointMap {
  
  constructor(serializer) {
    this._serializer=serializer;
    this._map = new Map();
  }

  get map() {return this._map};
  
  has(key) {
    return this._map.has(this._serializer(key.toArray()));
  }
  
  get(key) {
    return this._map.get(this._serializer(key.toArray()));
  }
  
  set(key, value) {
    this._map.set(this._serializer(key.toArray()), value);
  }

}
