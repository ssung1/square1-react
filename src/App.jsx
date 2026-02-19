import './App.css'
import FaceVisual from './FaceVisual'

function App() {
  const faceShapes = [
    { shape: 'triangle', color: 'green' },
    { shape: 'diamond', color: 'green' },
    { shape: 'triangle', color: 'green' },
    { shape: 'diamond', color: 'green' },
    { shape: 'triangle', color: 'green' },
    { shape: 'diamond', color: 'green' },
    { shape: 'triangle', color: 'green' },
    { shape: 'diamond', color: 'green' },
  ]

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
