import { PointList } from "../src/GridComponents/PointList";
import { Point } from "../src/GridComponents/Point";

describe('PointList testing', () => {
  it('basic behaviour', () => {
    const pl = new PointList();
    pl.push(Point.of(1,1));
    
    expect(pl.contains(Point.of(1,1))).toEqual(true);
    expect(pl.contains(Point.of(2,1))).toEqual(false);
  });
  
});