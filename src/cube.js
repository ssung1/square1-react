import { topFace, bottomFace } from './cube-face';

export class Cube {
  constructor(topFace, bottomFace) {
    this.topFace = topFace;
    this.bottomFace = bottomFace;
  }
}

export const cube = new Cube(topFace, bottomFace);