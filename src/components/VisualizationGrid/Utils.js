
export const arrayRange = (start, stop, step) =>
  Array.from(
  { length: (stop - start) / step + 1 },
  (value, index) => start + index * step
);

function toArray(rgb) {
  const r = rgb >> 16;
  const g = (rgb >> 8) % 256;
  const b = rgb % 256;
  
  return [r, g, b];
}

export function interpolateColor(col1, col2, p) {
  const rgb1 = parseInt(col1.replace('#',''), 16);
  const rgb2 = parseInt(col2.replace('#',''), 16);
  const rgb3 = parseInt('FFFF00', 16);
  
  const [r1, g1, b1] = toArray(rgb1);
  const [r2, g2, b2] = toArray(rgb2);
  const [r3, g3, b3] = toArray(rgb3);

  p = Math.max(p, 0.071);
  
  let q;
  let rr, rg,rb;
  if (p<1) {
    q = 1-p;
    rr = Math.round(r1 * p + r2 * q);
    rg = Math.round(g1 * p + g2 * q);
    rb = Math.round(b1 * p + b2 * q);
  } else if (p>1) {
    q = 1/p;
    rr = Math.round(r1 * q + r3 * (1-q));
    rg = Math.round(g1 * q + g3 * (1-q));
    rb = Math.round(b1 * q + b3 * (1-q));
  } else {
    rr = r2;
    rg = g2;
    rb = b2;
  }
  return  '#'+Number((rr << 16) + (rg << 8) + rb).toString(16);
}