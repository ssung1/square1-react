import { topFace, bottomFace } from './cube-face';

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
}

export const cube = new Cube(topFace, bottomFace);