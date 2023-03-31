import { BFS } from "../src/PathFindingAlgorithms/BFS";
import { Point } from "../src/components/GridComponents/Point";
import { PointList } from "../src/components/DataStructures/PointList";
import { validateCorrectPath } from "./PathUtils";

describe('BFs should run without bugs', () => {

  it('should be able to compute easy path', () => {
    const n = 10;
    const m = 10;
    const walls = new PointList();
    walls.push(Point.of(1,1));
    walls.push(Point.of(0,1));
    
    const origin = Point.of(0,0);
    const destination = Point.of(9, 9);
    
    const bfsInstance = new BFS(n, m, walls, origin, destination);
    
    const [wasFound, path] = bfsInstance.suiteExecution();
    
    const pathList = path.points;
    
    expect(wasFound).toBe(true);
    expect(pathList[0].equals(origin)).toBe(true);
    validateCorrectPath(pathList);
    expect(pathList[pathList.length-1].equals(destination)).toBe(true);
    expect(pathList.length).toBeGreaterThan(2);
  });
  
  it('should be able to return no output if no path is found', () => {
    const n = 5;
    const m = 5;
  
    const walls = new PointList();
    walls.push(Point.of(0,1));
    walls.push(Point.of(1,0));
    
    const origin = Point.of(0,0);
    const destination = Point.of(4, 4);
    
    const bfsInstance = new BFS(n, m, walls, origin, destination);
    
    const [wasFound, path] = bfsInstance.suiteExecution();
    
    expect(wasFound).toBe(false);
    expect(path).toBe(null);
  });

});
