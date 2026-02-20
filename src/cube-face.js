import {
  blockTopNorth,
  blockTopNorthEast,
  blockTopEast,
  blockTopSouthEast,
  blockTopSouth,
  blockTopSouthWest,
  blockTopWest,
  blockTopNorthWest,

  blockBottomNorth,
  blockBottomNorthEast,
  blockBottomEast,
  blockBottomSouthEast,
  blockBottomSouth,
  blockBottomSouthWest,
  blockBottomWest,
  blockBottomNorthWest
} from './block';

export const initialTopBlocks = [
  blockTopNorthEast,
  blockTopEast,
  blockTopSouthEast,
  blockTopSouth,
  blockTopSouthWest,
  blockTopWest,
  blockTopNorthWest,
  blockTopNorth,
]

export const initialBottomBlocks = [
  blockBottomNorthEast,
  blockBottomEast,
  blockBottomSouthEast,
  blockBottomSouth,
  blockBottomSouthWest,
  blockBottomWest,
  blockBottomNorthWest,
  blockBottomNorth,
]

// this is the amount of each rotation step
export const rotationUnit = 30;

export class CubeFace {
  // IMPORTANT:
  // the flip plane is always 15 degrees clockwise from the vertical axis
  constructor(blocks, rotation) {
    this.flipPlane = 15;
    this.blocks = blocks;
    this.rotation = rotation;
  }
}

export const topFace = new CubeFace(initialTopBlocks, 0);
export const bottomFace = new CubeFace(initialBottomBlocks, 0);