import { serializeTuple, deserializeTuple, SEPARATOR, } from "../src/PathFindingAlgorithms/GridUtils";
import { Point } from "../src/GridComponents/Point";
import { PointMap } from "../src/GridComponents/PointMap";

describe('GridUtils should have correct methods', () => {
  
  it('should be a able to serialize a tuple', () => {
    expect(serializeTuple([1,2])).toBe("1"+SEPARATOR+"2");
  });

  it('should be a able to deserialize a tuple', () => {
    const [row, col] = deserializeTuple("1"+SEPARATOR+"2");
    expect(row).toBe(1);
    expect(col).toBe(2);
  });

  it('should have a sound PointMap logic', () => {
    const gridMap = new PointMap(serializeTuple);
    gridMap.set(Point.of(1, 2), 4);
    expect(gridMap.get(Point.of(1, 2))).toBe(4);
  });

});