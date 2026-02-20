import './App.css'
import FaceVisual from './FaceVisual'
import { Cube, cube } from '../cube';
import { triangle } from '../block-shape';
import { green } from '../block-color';
import { useEffect, useState } from 'react';

function convertToCubeComponent(cube) {
  return (
    <div className="faces-row">
      <FaceVisual shapes={convertToDisplayableShapes(cube.topFace)} />
      <FaceVisual shapes={convertToDisplayableShapes(cube.bottomFace)} />
    </div>
  )
}

function convertToDisplayableShapes(face) {
  return face.blocks.map(block => ({
      shape: block.shape.shape,
      angle: block.angle,
      color: block.faceColor.color,
  }));
}

function App() {
  const topFace = cube.topFace;
  const bottomFace = cube.bottomFace;

  const secondTopFace = topFace.rotate(30);
  const secondBottomFace = bottomFace;

  console.log(topFace.isFlippable());
  console.log(secondTopFace.isFlippable());
  return (
    <main className="home">
      <h1>CSS Triangle + Kite</h1>
      {convertToCubeComponent(new Cube(topFace, bottomFace))}
      {convertToCubeComponent(new Cube(secondTopFace, secondBottomFace))}
    </main>
  )
}

export default App;
