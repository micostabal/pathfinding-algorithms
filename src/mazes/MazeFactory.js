import { N_ROWS, N_COLUMNS } from "../components/VisualizationGrid/Constants";
import { TrivialMaze } from "./TrivialMaze";
import { SpiralMaze } from "./SpiralMaze";
import { RandomMazeGenerator } from "./RandomMaze";

export const MazeType = {
  trivial: 'trivial',
  spiral: 'spiral',
  random: 'random'
}

class MazeFactory {

  constructor(n, m) {
    this._n=n;
    this._m=m;
  }
  
  create(mazeType) {
    switch (mazeType) {
      case MazeType.trivial:
        return new TrivialMaze(this._n,this._m);
      case MazeType.spiral:
        return new SpiralMaze(this._n,this._m);
      case MazeType.random:
        return new RandomMazeGenerator(this._n,this._m);
      default:
        throw new Error('No such Maze type '+mazeType);
    }
  }
}

export const mazeFactory = new MazeFactory(N_ROWS, N_COLUMNS
  );