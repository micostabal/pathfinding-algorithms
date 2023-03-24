import { Point } from "../src/components/GridComponents/Point";
import { RandomMazeGenerator } from "../src/mazes/RandomMaze";

describe('Testing for Random Maze Generator', () => {
  it('should create the corresponding class', () => {
    new RandomMazeGenerator(10, 10);
  });
  
  it('should generate origin and destination as far away as possible', () => {
    const maze = new RandomMazeGenerator(10, 10);
    expect(maze.getOrigin().equals(Point.of(0, 0))).toBe(true);
    expect(maze.getDestination().equals(Point.of(8, 8))).toBe(true);
  });
});
