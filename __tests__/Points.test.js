import { PointList } from "../src/GridComponents/PointList";
import { Point } from "../src/GridComponents/Point";

describe('basic stesting in jest', () => {
  it('basic test', () => {
    const pl = new PointList();
    pl.push(Point.of(1,1));
    
    expect(pl.contains(Point.of(1,1))).toEqual(true);
    expect(pl.contains(Point.of(2,1))).toEqual(false);
  });
});