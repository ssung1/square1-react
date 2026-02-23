import { green, white, blue, orange, red, yellow, none } from './block-color';
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
  blockBottomNorthWest,

  Block,
} from './block';
import { normalizeDegrees } from './angle';
import { triangle, kite } from './block-shape';

// export const initialTopBlocks = [
//   blockTopNorthEast,
//   blockTopEast,
//   blockTopSouthEast,
//   blockTopSouth,
//   blockTopSouthWest,
//   blockTopWest,
//   blockTopNorthWest,
//   blockTopNorth,
// ]

export const initialTopBlocks = [
  new Block(triangle, 0, white, orange, none),
  new Block(kite, 45, white, yellow, red),
  new Block(triangle, 90, white, blue, none),
  new Block(kite, 135, white, orange, yellow),
  new Block(triangle, 180, white, yellow, none),
  new Block(kite, 225, white, red, blue),
  new Block(triangle, 270, white, red, none),
  new Block(kite, 315, white, blue, orange),
];

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

const solvedTopBlocks = [
  blockTopNorth,
  blockTopNorthEast,
  blockTopEast,
  blockTopSouthEast,
  blockTopSouth,
  blockTopSouthWest,
  blockTopWest,
  blockTopNorthWest,
]

function serializeBlock(block, rotationOffset = 0) {
  return [
    block.shape.shape,
    normalizeDegrees(block.angle + rotationOffset),
    block.faceColor.color,
    block.sideColor1.color,
    block.sideColor2.color,
  ].join('|');
}

function setsMatch(firstSet, secondSet) {
  if (firstSet.size !== secondSet.size) {
    return false;
  }

  for (const value of firstSet) {
    if (!secondSet.has(value)) {
      return false;
    }
  }

  return true;
}

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

  isSolvedAsTop() {
    if (this.blocks.length !== solvedTopBlocks.length) {
      return false;
    }

    const actualBlocks = new Set(this.blocks.map(block => serializeBlock(block)));

    if (actualBlocks.size !== solvedTopBlocks.length) {
      return false;
    }

    for (let rotationOffset = 0; rotationOffset < 360; rotationOffset += 30) {
      const expectedBlocks = new Set(
        solvedTopBlocks.map(block => serializeBlock(block, rotationOffset))
      );

      if (setsMatch(actualBlocks, expectedBlocks)) {
        return true;
      }
    }

    return false;
  }
}

export const topFace = new CubeFace(initialTopBlocks);
export const bottomFace = new CubeFace(initialBottomBlocks);