import { CubeFace, topFace, bottomFace } from './cube-face';
import { rotate } from './angle';

export class Cube {
  constructor(topFace, bottomFace, executionHistory) {
    this.topFace = topFace;
    this.bottomFace = bottomFace;
    this.executionHistory = executionHistory || [];
  }

  rotateTop(angle) {
    return new Cube(
      this.topFace.rotate(angle),
      this.bottomFace,
      this.executionHistory
    );
  }

  rotateBottom(angle) {
    return new Cube(
      this.topFace,
      this.bottomFace.rotate(angle),
      this.executionHistory
    );
  }

  isFlippable() {
    return this.topFace.isFlippable() && this.bottomFace.isFlippable();
  }

  separateByFlipPlane() {
    const topBlocksRightOfFlipPlane = this.topFace.blocks.filter(block =>
      block.edgeAngleCounterClockwise() >= this.topFace.flipPlane &&
      block.edgeAngleCounterClockwise() < (rotate(this.topFace.flipPlane, 180))
    );
    const topBlocksLeftOfFlipPlane = this.topFace.blocks.filter(block => 
      block.edgeAngleClockwise() <= this.topFace.flipPlane ||
      block.edgeAngleClockwise() > (rotate(this.topFace.flipPlane, 180))
    );
    const bottomBlocksRightOfFlipPlane = this.bottomFace.blocks.filter(block =>
      block.edgeAngleCounterClockwise() >= this.bottomFace.flipPlane &&
      block.edgeAngleCounterClockwise() < (rotate(this.bottomFace.flipPlane, 180))
    );
    const bottomBlocksLeftOfFlipPlane = this.bottomFace.blocks.filter(block =>
      block.edgeAngleClockwise() <= this.bottomFace.flipPlane ||
      block.edgeAngleClockwise() > (rotate(this.bottomFace.flipPlane, 180))
    );
    return {
      topBlocksRightOfFlipPlane,
      topBlocksLeftOfFlipPlane,
      bottomBlocksRightOfFlipPlane,
      bottomBlocksLeftOfFlipPlane,
    };
  }

  flip() {
    if (!this.isFlippable()) {
      throw new Error('Cube is not flippable');
    }
    const {
      topBlocksRightOfFlipPlane,
      topBlocksLeftOfFlipPlane,
      bottomBlocksRightOfFlipPlane,
      bottomBlocksLeftOfFlipPlane,
    } = this.separateByFlipPlane();

    return new Cube(
      new CubeFace([...topBlocksLeftOfFlipPlane, ...bottomBlocksRightOfFlipPlane.map(block => block.flip())]),
      new CubeFace([...bottomBlocksLeftOfFlipPlane, ...topBlocksRightOfFlipPlane.map(block => block.flip())]),
      this.executionHistory
    );
  }

  // operations is defined as a sequence of 2 rotations plus a flip, encoded into three characters
  // 1. rotation of top face: 0 to 9, then A and, B, representing 0 to 330 degrees in 30 degree increments
  // 2. rotation of bottom face: 0 to 9, then A and, B, representing 0 to 330 degrees in 30 degree increments
  // 3. flip: a space character
  execute(operations) {
    let currentCube = this;

    for (let index = 0; index < operations.length; index += 3) {
      console.log('Executing operation:', operations.slice(index, index + 3));
      if (index + 2 >= operations.length) {
        return currentCube;
      }

      const topRotationChar = operations[index];
      const bottomRotationChar = operations[index + 1];
      const flipChar = operations[index + 2];

      if (flipChar !== ' ') {
        return currentCube;
      }

      const topRotationStep = parseInt(topRotationChar, 16);
      const bottomRotationStep = parseInt(bottomRotationChar, 16);

      if (
        Number.isNaN(topRotationStep) ||
        Number.isNaN(bottomRotationStep) ||
        topRotationStep < 0 ||
        topRotationStep > 11 ||
        bottomRotationStep < 0 ||
        bottomRotationStep > 11
      ) {
        return currentCube;
      }

      console.log('Current history so far:', currentCube.executionHistory);
      console.log('Executing operation for reals:', operations.slice(index, index + 3));
      console.log('new history?', [...currentCube.executionHistory, operations.slice(index, index + 3)]);
      const newCube = currentCube
          .rotateTop(topRotationStep * 30)
          .rotateBottom(bottomRotationStep * 30)
          .flip();

      currentCube = new Cube(
        newCube.topFace,
        newCube.bottomFace,
        [...currentCube.executionHistory, operations.slice(index, index + 3)]
      );
    }

    return currentCube;
  }
}

export const cube = new Cube(topFace, bottomFace, []);
