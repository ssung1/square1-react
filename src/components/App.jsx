import './App.css'
import FaceVisual from './FaceVisual'
import { initialTopBlocks, initialBottomBlocks } from '../cube';

function convertToFaceShapes(blocks) {
  return blocks.map(block => ({
      shape: block.shape.shape,
      color: block.faceColor.color,
  }));
}

function App() {
  const topFaceShapes = convertToFaceShapes(initialTopBlocks);
  const bottomFaceShapes = convertToFaceShapes(initialBottomBlocks);
  // const topFaceShapes = convertToFaceShapes(blocks)

  return (
    <main className="home">
      <h1>CSS Triangle + Diamond</h1>
      <div className="faces-row">
        <FaceVisual shapes={topFaceShapes} />
        <FaceVisual shapes={bottomFaceShapes} />
      </div>
    </main>
  )
}

export default App;
