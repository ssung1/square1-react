import './App.css'
import FaceVisual from './FaceVisual'
import { Cube, cube } from '../cube';
import { triangle } from '../block-shape';
import { green } from '../block-color';
import { useEffect, useState } from 'react';

function convertToCubeComponent(cube) {
  var borderColor = 'black';
  if (cube.isFlippable()) {
    borderColor = 'red';
  }
  return (
    <div>
      <div className="faces-row">
        <FaceVisual shapes={convertToDisplayableShapes(cube.topFace)} borderColor={borderColor} />
        <FaceVisual shapes={convertToDisplayableShapes(cube.bottomFace)} borderColor={borderColor} />
      </div>
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
  return (
    <main className="home">
      <h1>CSS Triangle + Kite</h1>
      {convertToCubeComponent(cube)}
      {convertToCubeComponent(cube.rotateTop(30))}
    </main>
  )
}

export default App;
