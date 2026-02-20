import { green, white, blue, orange, red, yellow, none  } from './block-color';
import { triangle, kite } from './block-shape';

class Block {
  constructor(shape, faceColor, sideColor1, sideColor2) {
    this.shape = shape;
    this.faceColor = faceColor;
    this.sideColor1 = sideColor1;
    this.sideColor2 = sideColor2;
  }
}

// top
export const blockTopNorth = new Block(triangle, green, blue, none);
export const blockTopNorthEast = new Block(kite, green, blue, orange);
export const blockTopEast = new Block(triangle, green, orange, none);
export const blockTopSouthEast = new Block(kite, green, orange, red);
export const blockTopSouth = new Block(triangle, green, red, none);
export const blockTopSouthWest = new Block(kite, green, red, yellow);
export const blockTopWest = new Block(triangle, green, yellow, none);
export const blockTopNorthWest = new Block(kite, green, yellow, blue);

// bottom
export const blockBottomNorth = new Block(triangle, white, blue, none);
export const blockBottomNorthEast = new Block(kite, white, blue, orange);
export const blockBottomEast = new Block(triangle, white, orange, none);
export const blockBottomSouthEast = new Block(kite, white, orange, red);
export const blockBottomSouth = new Block(triangle, white, red, none);
export const blockBottomSouthWest = new Block(kite, white, red, yellow);
export const blockBottomWest = new Block(triangle, white, yellow, none);
export const blockBottomNorthWest = new Block(kite, white, yellow, blue);