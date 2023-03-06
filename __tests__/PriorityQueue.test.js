import { PriorityQueue } from "../src/PathFindingAlgorithms/GridUtils";
import { Point } from "../src/GridComponents/Point";

describe('PriorityQueue should have sound logic', () => {

  it('should be a able to create an PriorityQueue', () => {
    const fspq = new PriorityQueue(Point.of(1,1));
    expect(fspq.size()).toBe(0);
  });
  
  it('should be a able to throw error if PriorityQueue has no destintion', () => {
    const fspq = new PriorityQueue();
    expect(() => fspq.getFirst()).toThrow(Error);
  });
  
  it ('should throw error if pops without elements', () => {
    const fspq = new PriorityQueue(Point.of(1,1));
    expect(() => fspq.getFirst()).toThrow(Error);
  });
  
  it ('should be able to insert elements in the queue', () => {
    const fspq = new PriorityQueue(Point.of(2,2));
    fspq.insert(Point.of(98, 98));
    expect(fspq.size()).toBe(1);
  });

  it ('should be able to assert whether an element is in the queue', () => {
    const fspq = new PriorityQueue(Point.of(2, 2));
    fspq.insert(Point.of(1, 2));
    expect(fspq.has(Point.of(1,2))).toBe(true);
  });

  it ('should be able to delete elements in the queue', () => {
    const fspq = new PriorityQueue(Point.of(2, 2));
    fspq.insert(Point.of(98, 98));
    fspq.insert(Point.of(1, 2));
    fspq.remove(Point.of(1, 2));
    
    expect(fspq.has(Point.of(1,2))).toBe(false);
  });
  
  it('should be able to insert element in the correct position', () => {
    const fspq = new PriorityQueue(Point.of(3, 3));
    fspq.insert(Point.of(98, 99));
    fspq.insert(Point.of(4, 5));
    
    const {row: rowFirst, col: colFirst} = fspq.map[0];
    expect(rowFirst).toBe(4);
    expect(colFirst).toBe(5);
  });

  it('should be able to havee a sound size logic', () => {
    const fspq = new PriorityQueue([3, 3]);
    expect(fspq.size()).toBe(0);
    fspq.insert(Point.of(98, 99));
    expect(fspq.size()).toBe(1);
    fspq.insert(Point.of(4, 5));
    expect(fspq.size()).toBe(2);
    fspq.remove(Point.of(4, 5));
    expect(fspq.size()).toBe(1);
    fspq.remove(Point.of(98, 99));
    expect(fspq.size()).toBe(0);
  });

});