export class BlockShape {
  constructor(shape, size) {
    this.shape = shape;
    this.size = size;
  }
}

export const triangle = new BlockShape('triangle', 30);
export const kite = new BlockShape('kite', 60);