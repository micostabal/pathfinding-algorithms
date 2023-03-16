import {RandomMaze} from "../src/mazes/RandomMaze";

describe('Testing for Random Maze Generator', () => {
  it('should create the corresponding class', () => {
    new RandomMaze(10, 10);
  });
});
