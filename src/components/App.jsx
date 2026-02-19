import './App.css'
import FaceVisual from './FaceVisual'
import {
  blockTopNorth,
  blockTopNorthEast,
  blockTopEast,
  blockTopSouthEast,
  blockTopSouth,
  blockTopSouthWest,
  blockTopWest,
  blockTopNorthWest,

  blockBottomNorth,
  blockBottomNorthEast,
  blockBottomEast,
  blockBottomSouthEast,
  blockBottomSouth,
  blockBottomSouthWest,
  blockBottomWest,
  blockBottomNorthWest
} from '../block';

function convertToFaceShapes(blocks) {
  return blocks.map(block => ({
      shape: block.shape.shape,
      color: block.faceColor,
  }))
}

function App() {
  const blocks = [
    blockTopNorth,
    blockTopNorthEast,
    blockTopEast,
    blockTopSouthEast,
    blockTopSouth,
    blockTopSouthWest,
    blockTopWest,
    blockTopNorthWest
  ]
  const faceShapes = convertToFaceShapes(blocks)

  return (
    <main className="home">
      <h1>CSS Triangle + Diamond</h1>
      <div className="faces-row">
        <FaceVisual shapes={faceShapes} />
        <FaceVisual shapes={faceShapes} />
      </div>
    </main>
  )
}

export default App
