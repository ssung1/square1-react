import './App.css'
import Face from './Face'

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
        <Face shapes={faceShapes} />
        <Face shapes={faceShapes} />
      </div>
    </main>
  )
}

export default App
