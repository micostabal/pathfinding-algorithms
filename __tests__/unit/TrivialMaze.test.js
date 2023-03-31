import { TrivialMaze } from "../src/mazes/TrivialMaze";
import { Point } from "../src/components/GridComponents/Point";

describe('Testing for Trival Maze', () => {
  const n = 20;
  const m = 23;
   
  it('should be able to create a trivial maze', () => {
    new TrivialMaze(n, m);
  });

  it('should be able to get sound results (3x3)', () => {
    const newMaze = new TrivialMaze(3, 3);
    const walls = newMaze.getWalls();
    expect(walls.contains(Point.of(0,1))).toBe(true);
    expect(walls.contains(Point.of(1,1))).toBe(true);
    expect(newMaze.getOrigin().equals(Point.of(0,0))).toBe(true);
    expect(newMaze.getDestination().equals(Point.of(2,2))).toBe(true);
  });
  
  it('should be able to get sound results (3x4)', () => {
    const newMaze = new TrivialMaze(3, 4);
    const walls = newMaze.getWalls();
    expect(walls.contains(Point.of(0,1))).toBe(true);
    expect(walls.contains(Point.of(1,1))).toBe(true);
    expect(walls.contains(Point.of(1,3))).toBe(true);
    expect(walls.contains(Point.of(2,3))).toBe(true);
    expect(newMaze.getOrigin().equals(Point.of(0,0))).toBe(true);
    expect(newMaze.getDestination().equals(Point.of(0,3))).toBe(true);
  });

  it('should be able to get sound results (3x5)', () => {
    const newMaze = new TrivialMaze(3, 5);
    const walls = newMaze.getWalls();
    expect(walls.contains(Point.of(0,1))).toBe(true);
    expect(walls.contains(Point.of(1,1))).toBe(true);
    expect(walls.contains(Point.of(1,3))).toBe(true);
    expect(walls.contains(Point.of(2,3))).toBe(true);
    expect(newMaze.getOrigin().equals(Point.of(0,0))).toBe(true);
    expect(newMaze.getDestination().equals(Point.of(2,4))).toBe(true);
  });
});