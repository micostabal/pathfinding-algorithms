import { PointList } from "./PointList";
import { Point } from "../GridComponents/Point";
import { deserializeTuple } from "../../PathFindingAlgorithms/GridUtils";

export class MinDistPointList extends PointList {
  
  popMinDist(costMapping) {
    let minDist = Number.POSITIVE_INFINITY;
    let minPoint = null;
    
    for (let [point, distance] of costMapping.map.entries()) {
      const [row, col] = deserializeTuple(point);
      const currentPoint= Point.of(row, col);
      if (distance<=minDist && this.contains(currentPoint)) {
        minDist=distance;
        minPoint=currentPoint;
      }
    }
    this.remove(minPoint);
    return minPoint;
  }

}
