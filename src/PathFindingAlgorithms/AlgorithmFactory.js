import { AStar } from "./AStar";

class AlgorithmFactory {
  create(name, params) {
    switch (name) {
      case 'a-star':
        return new AStar(...params);
      case 'bfs':
        return new AStar(...params);
      case 'dfs':
        return new AStar(...params);
      case 'dijkstra':
        return new AStar(...params);
      default: throw new Error('No such Pathfinding Algorithm Type');
    }
  }
}

export const algorithmFactory = new AlgorithmFactory();