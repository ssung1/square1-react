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
import { normalizeDegrees } from './angle';
import { triangle, kite } from './block-shape';
import { green } from './block-color';

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

  isSquare() {
    const triangleAngles = this.blocks
      .filter(block => block.shape === triangle)
      .map(block => normalizeDegrees(block.angle));
    const kiteAngles = this.blocks
      .filter(block => block.shape === kite)
      .map(block => normalizeDegrees(block.angle));

    if (triangleAngles.length !== 4 || kiteAngles.length !== 4) {
      return false;
    }

    const hasExactAngles = (actualAngles, expectedAngles) => {
      const actualSet = new Set(actualAngles);
      if (actualSet.size !== expectedAngles.length) {
        return false;
      }

      return expectedAngles.every(angle => actualSet.has(angle));
    };

    const hasExactAnglesWithRotation = (actualAngles, expectedAngles, rotation) => {
      const rotatedExpectedAngles = expectedAngles.map(angle =>
        normalizeDegrees(angle + rotation)
      );
      return hasExactAngles(actualAngles, rotatedExpectedAngles);
    };

    const triangleExpectedAngles = [0, 90, 180, 270];
    const kiteExpectedAngles = [45, 135, 225, 315];

    const candidateRotations = [...new Set(triangleAngles.map(angle => normalizeDegrees(angle)))];

    return candidateRotations.some(rotation => (
      hasExactAnglesWithRotation(triangleAngles, triangleExpectedAngles, rotation) &&
      hasExactAnglesWithRotation(kiteAngles, kiteExpectedAngles, rotation)
    ));
  }

  isAllGreen() {
    return this.blocks.every(block => block.faceColor === green);
  }
}

export const topFace = new CubeFace(initialTopBlocks);
export const bottomFace = new CubeFace(initialBottomBlocks);