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
  constructor(blocks) {
    this.flipPlane = 15;
    this.blocks = blocks;
  }

  rotate(angle) {
    return new CubeFace(
      this.blocks.map(block => block.rotate(angle))
    );
  }

  // the face is flippable if there is an edge at 15 AND if there's an edge at
  // 195 (15 + 180)
  isFlippable() {
    const hasFlipPlaneEdge = this.blocks.some(block => block.edgeAngleClockwise() === this.flipPlane);
    const hasOppositeFlipPlaneEdge = this.blocks.some(block => block.edgeAngleClockwise() === (this.flipPlane + 180) % 360);
    return hasFlipPlaneEdge && hasOppositeFlipPlaneEdge;
  }
}

export const topFace = new CubeFace(initialTopBlocks);
export const bottomFace = new CubeFace(initialBottomBlocks);