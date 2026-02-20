import { CubeFace, topFace, bottomFace } from './cube-face';
import { rotate } from './angle';

export class Cube {
  constructor(topFace, bottomFace) {
    this.topFace = topFace;
    this.bottomFace = bottomFace;
  }

  rotateTop(angle) {
    return new Cube(
      this.topFace.rotate(angle),
      this.bottomFace
    );
  }

  rotateBottom(angle) {
    return new Cube(
      this.topFace,
      this.bottomFace.rotate(angle)
    );
  }

  isFlippable() {
    return this.topFace.isFlippable() && this.bottomFace.isFlippable();
  }

  separateByFlipPlane() {
    console.log('flipPlane', this.topFace.flipPlane, rotate(this.topFace.flipPlane, 180));

    console.log('topFace counter', this.topFace.blocks.map(block => block.edgeAngleCounterClockwise()));
    console.log('topFace clock', this.topFace.blocks.map(block => block.edgeAngleClockwise()));
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

    console.log('topBlocksLeftOfFlipPlane', topBlocksLeftOfFlipPlane);
    console.log('topBlocksRightOfFlipPlane', topBlocksRightOfFlipPlane);
    console.log('bottomBlocksLeftOfFlipPlane', bottomBlocksLeftOfFlipPlane);
    console.log('bottomBlocksRightOfFlipPlane', bottomBlocksRightOfFlipPlane);

    return new Cube(
      new CubeFace([...topBlocksLeftOfFlipPlane, ...bottomBlocksRightOfFlipPlane.map(block => block.flip())]),
      new CubeFace([...bottomBlocksLeftOfFlipPlane, ...topBlocksRightOfFlipPlane.map(block => block.flip())])
    );
  }
}

export const cube = new Cube(topFace, bottomFace);