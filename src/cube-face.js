import { green, white, blue, orange, red, yellow, none } from './block-color.js';
import {
  blockTopNorth,
  blockTopNorthEast,
  blockTopEast,
  blockTopSouthEast,
  blockTopSouth,
  blockTopSouthWest,
  blockTopWest,
  blockTopNorthWest,

  Block,
} from './block.js';
import { normalizeDegrees } from './angle.js';
import { triangle, kite } from './block-shape.js';

const colorByCode = {
  g: green,
  w: white,
  b: blue,
  o: orange,
  r: red,
  y: yellow,
  n: none,
};

function parseColor(code, token) {
  const color = colorByCode[code.toLowerCase()];

  if (!color) {
    throw new Error(`Invalid color code "${code}" in token "${token}"`);
  }

  return color;
}

function parseFaceColor(code, token) {
  const color = parseColor(code, token);

  if (color !== white && color !== green) {
    throw new Error(`Face color must be white (w) or green (g) in token "${token}"`);
  }

  return color;
}

// this is the amount of each rotation step
export const rotationUnit = 30;

export function createCubeFace(blockString) {
  if (typeof blockString !== 'string') {
    throw new Error('createCubeFace requires a string block definition');
  }

  const tokens = blockString.trim().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    throw new Error('createCubeFace requires at least one block token');
  }

  const firstShapeCode = tokens[0][0]?.toLowerCase();
  if (firstShapeCode !== 't' && firstShapeCode !== 'k') {
    throw new Error(`Block token must start with "t" or "k": "${tokens[0]}"`);
  }

  const blocks = [];
  let angleCursor = firstShapeCode === 'k' ? 330 : 0;
  let totalDegrees = 0;

  tokens.forEach((token) => {
    const normalizedToken = token.toLowerCase();
    const shapeCode = normalizedToken[0];

    if (shapeCode === 't') {
      if (normalizedToken.length !== 3) {
        throw new Error(`Triangle token must be exactly 3 characters: "${token}"`);
      }

      const faceColor = parseFaceColor(normalizedToken[1], token);
      const sideColor1 = parseColor(normalizedToken[2], token);

      blocks.push(new Block(triangle, normalizeDegrees(angleCursor), faceColor, sideColor1, none));
      angleCursor += rotationUnit;
      totalDegrees += rotationUnit;
      return;
    }

    if (shapeCode === 'k') {
      if (normalizedToken.length !== 4) {
        throw new Error(`Kite token must be exactly 4 characters: "${token}"`);
      }

      const faceColor = parseFaceColor(normalizedToken[1], token);
      const sideColor1 = parseColor(normalizedToken[2], token);
      const sideColor2 = parseColor(normalizedToken[3], token);

      blocks.push(new Block(kite, normalizeDegrees(angleCursor + 15), faceColor, sideColor1, sideColor2));
      angleCursor += rotationUnit * 2;
      totalDegrees += rotationUnit * 2;
      return;
    }

    throw new Error(`Block token must start with "t" or "k": "${token}"`);
  });

  if (totalDegrees !== 360) {
    throw new Error(`Block definition must total 360 degrees, got ${totalDegrees}`);
  }

  return new CubeFace(blocks);
}

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

const initialTopFace = createCubeFace('kwyr twb kwoy twy kwrb twr kwbo two');
const initialBottomFace = createCubeFace('tgr kgrb tgb kgbo tgo kgoy tgy kgyr');

export const topFace = initialTopFace;
export const bottomFace = initialBottomFace;