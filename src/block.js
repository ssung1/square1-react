import { green, white, blue, orange, red, yellow, none  } from './block-color';
import { triangle, diamond } from './block-shape';

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
export const blockTopNorthEast = new Block(diamond, green, blue, orange);
export const blockTopEast = new Block(triangle, green, orange, none);
export const blockTopSouthEast = new Block(diamond, green, orange, red);
export const blockTopSouth = new Block(triangle, green, red, none);
export const blockTopSouthWest = new Block(diamond, green, red, yellow);
export const blockTopWest = new Block(triangle, green, yellow, none);
export const blockTopNorthWest = new Block(diamond, green, yellow, blue);

// bottom
export const blockBottomNorth = new Block(triangle, white, blue, none);
export const blockBottomNorthEast = new Block(diamond, white, blue, orange);
export const blockBottomEast = new Block(triangle, white, orange, none);
export const blockBottomSouthEast = new Block(diamond, white, orange, red);
export const blockBottomSouth = new Block(triangle, white, red, none);
export const blockBottomSouthWest = new Block(diamond, white, red, yellow);
export const blockBottomWest = new Block(triangle, white, yellow, none);
export const blockBottomNorthWest = new Block(diamond, white, yellow, blue);