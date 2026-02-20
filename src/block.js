import { green, white, blue, orange, red, yellow, none  } from './block-color';
import { triangle, kite } from './block-shape';

class Block {
  constructor(shape, angle, faceColor, sideColor1, sideColor2) {
    this.shape = shape;
    this.angle = angle;
    this.faceColor = faceColor;
    this.sideColor1 = sideColor1;
    this.sideColor2 = sideColor2;
  }
}

// top
export const blockTopNorth = new Block(triangle, 0, green, red, none);
export const blockTopNorthEast = new Block(kite, 45, green, red, blue);
export const blockTopEast = new Block(triangle, 90, green, blue, none);
export const blockTopSouthEast = new Block(kite, 135, green, blue, orange);
export const blockTopSouth = new Block(triangle, 180, green, orange, none);
export const blockTopSouthWest = new Block(kite, 225, green, orange, yellow);
export const blockTopWest = new Block(triangle, 270, green, yellow, none);
export const blockTopNorthWest = new Block(kite, 315, green, yellow, red);

// bottom
export const blockBottomNorth = new Block(triangle, 0, white, red, none);
export const blockBottomNorthEast = new Block(kite, 45, white, red, blue);
export const blockBottomEast = new Block(triangle, 90, white, blue, none);
export const blockBottomSouthEast = new Block(kite, 135, white, blue, orange);
export const blockBottomSouth = new Block(triangle, 180, white, orange, none);
export const blockBottomSouthWest = new Block(kite, 225, white, orange, yellow);
export const blockBottomWest = new Block(triangle, 270, white, yellow, none);
export const blockBottomNorthWest = new Block(kite, 315, white, yellow, red);