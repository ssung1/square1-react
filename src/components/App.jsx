import './App.css'
import FaceVisual from './FaceVisual'
import { cube } from '../cube';
import { triangle } from '../block-shape';
import { green } from '../block-color';

function convertToFaceShapes(blocks) {
  return blocks.map(block => ({
      shape: block.shape.shape,
      angle: block.angle,
      color: block.faceColor.color,
  }));
}

function App() {
  const topFace = convertToFaceShapes(cube.topFace.blocks)
  const bottomFace = convertToFaceShapes(cube.bottomFace.blocks)

  console.log('edge', cube.topFace.blocks.map(block => block.edgeAngleCounterClockwise()))

  return (
    <main className="home">
      <h1>CSS Triangle + Kite</h1>
      <div className="faces-row">
        <FaceVisual shapes={topFace}/>
        <FaceVisual shapes={bottomFace}/>
      </div>
    </main>
  )
}

export default App;
