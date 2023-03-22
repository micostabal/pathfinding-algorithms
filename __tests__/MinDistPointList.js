import { MinDistPointList } from "../src/components/DataStructures/MinDistPointList";
import { Point } from "../src/components/GridComponents/Point";
import { PointMap } from "../src/components/DataStructures/PointMap";
import { serializeTuple } from "../src/PathFindingAlgorithms/GridUtils";

describe('basic behaviour', () => {
  
  it('basic test', () => {
    new MinDistPointList();
  });
  
  it('should pop elements well: 1', () => {
    const cost = new PointMap(serializeTuple);
    cost.set(Point.of(1, 1), 2);
    cost.set(Point.of(0, 0), 3);
    cost.set(Point.of(1, 0), 4);
    cost.set(Point.of(0, 1), 1);
    cost.set(Point.of(99, 0), Number.POSITIVE_INFINITY);
    cost.set(Point.of(0, 99), Number.POSITIVE_INFINITY);
    
    const list = new MinDistPointList();
    list.push(Point.of(0, 0));
    list.push(Point.of(1, 1));
    list.push(Point.of(0, 1));
    list.push(Point.of(1, 0));
    list.push(Point.of(99, 0));
    list.push(Point.of(0, 99));
    
    const firstPop = list.popMinDist(cost);
    expect(firstPop.equals(Point.of(0, 1))).toBe(true);
    expect(list.contains(firstPop)).toBe(false);
    const secondPop = list.popMinDist(cost);
    console.log(secondPop);
    expect(secondPop.equals(Point.of(1, 1))).toBe(true);
    expect(list.contains(secondPop)).toBe(false);
  });
});
