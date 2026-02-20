import './App.css'
import FaceVisual from './FaceVisual'
import { cube } from '../cube';

function convertToFaceShapes(blocks) {
  return blocks.map(block => ({
      shape: block.shape.shape,
      color: block.faceColor.color,
  }));
}

function App() {
  const topFaceShapes = convertToFaceShapes(cube.topFace.blocks);
  const bottomFaceShapes = convertToFaceShapes(cube.bottomFace.blocks);

  return (
    <main className="home">
      <h1>CSS Triangle + Diamond</h1>
      <div className="faces-row">
        <FaceVisual shapes={topFaceShapes} displayRotation="45"/>
        <FaceVisual shapes={bottomFaceShapes} displayRotation="45"/>
      </div>
    </main>
  )
}

export default App;
