import './App.css'
import CubeVisual from './CubeVisual'
import { cube } from '../cube';

function convertToCubeComponent(cube) {
  return {
    executionHistory:  cube.executionHistory,
    flippable:  cube.isFlippable(),
    topFaceShapes:  convertToDisplayableShapes(cube.topFace),
    bottomFaceShapes:  convertToDisplayableShapes(cube.bottomFace),
  }
}

function convertToDisplayableShapes(face) {
  return face.blocks.map(block => ({
      shape: block.shape.shape,
      angle: block.angle,
      color: block.faceColor.color,
  }));
}

function App() {
  const cubeVisuals = [
    cube,
    cube.execute('00 03 03 '),
  ].map((cubeState, index) => (
    <CubeVisual key={index} {...convertToCubeComponent(cubeState)} />
  ))

  return (
    <main className="home">
      <h1>CSS Triangle + Kite</h1>
      {cubeVisuals}
    </main>
  )
}

export default App;
