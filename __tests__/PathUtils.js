import { distance } from "../src/PathFindingAlgorithms/GridUtils";

export const validateCorrectPath = (path) => {
  for(let i=0;i<path.length-2;i++) {
    expect(distance(path[i], path[i+1])).toBe(1)
  }
}