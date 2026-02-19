export class BlockShape {
  constructor(shape, size) {
    this.shape = shape;
    this.size = size;
  }
}

export const triangle = new BlockShape('triangle', 30);
export const diamond = new BlockShape('diamond', 60);