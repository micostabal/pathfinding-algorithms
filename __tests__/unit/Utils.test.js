import { interpolateColor } from "../src/components/VisualizationGrid/Utils";
import { START_COLOR, END_COLOR } from "../src/components/VisualizationGrid/Constants";


describe('Utils testing', () => {
  
  it('should convert from rgba to hex', () => {
    
    const interpolated = interpolateColor(START_COLOR, END_COLOR, 0.5);
    
    expect(interpolated.startsWith('#')).toEqual(true);
  });
  
  it('should convert small number from rgba to hex', () => {
    
    const interpolated = interpolateColor(START_COLOR, END_COLOR, 0.071);
    
    expect(interpolated.length).toEqual(7);

  })
});