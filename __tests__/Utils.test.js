import { interpolateColor } from "../src/components/Utils";
import { START_COLOR, END_COLOR } from "../src/components/Constants";


describe('Utils testing', () => {

  it('should convert from rgba to hex', () => {
    
    const interpolated = interpolateColor(START_COLOR, END_COLOR, 0.5);
    
    expect(interpolated.startswith('#')).toEqual(true);
  });
});