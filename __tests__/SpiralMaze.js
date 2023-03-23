import { Point } from "../src/components/GridComponents/Point";
import { SpiralMaze } from "../src/mazes/SpiralMaze";

describe('spiral mazes should be created as expected', () => {
  it('simple spiral maze', () => {
    const maze = new SpiralMaze(50, 70);
    const walls = maze.getWalls();
    expect(maze.getOrigin().equals(Point.of(0, 0))).toBe(true);
    expect(walls.contains(Point.of(1, 1))).toBe(true);
  });
  
  it('case n=3', () => {
    const maze = new SpiralMaze(3, 10);
    const walls = maze.getWalls();
    const destination = maze.getDestination();
    expect(destination.equals(Point.of(0, 2))).toBe(true);
    
    expect(walls.contains(Point.of(0, 1))).toBe(true);
    expect(walls.contains(Point.of(1, 1))).toBe(true);
    expect(walls.contains(Point.of(1, 8))).toBe(true);
    expect(walls.contains(Point.of(1, 7))).toBe(true);
  });

  it('case n=2', () => {
    const maze = new SpiralMaze(2, 6);
    const walls = maze.getWalls();
    const destination = maze.getDestination();
    expect(destination.equals(Point.of(1, 5))).toBe(true);
    
    expect(walls.contains(Point.of(0, 4))).toBe(true);
    expect(walls.contains(Point.of(0, 5))).toBe(true);
    expect(walls.contains(Point.of(0, 0))).toBe(false);
    expect(walls.contains(Point.of(1, 0))).toBe(false);
  });

  it('case n=1', () => {
    const maze = new SpiralMaze(1, 6);
    const walls = maze.getWalls();
    const destination = maze.getDestination();
    expect(destination.equals(Point.of(0, 5))).toBe(true);
    
    expect(walls.points.length).toBe(0);
  });
});