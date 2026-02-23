import './App.css'
import CubeVisual from './CubeVisual'
import { useMemo } from 'react'
import { cube } from '../cube.js';
import { breadthFirstSearch, cubeStateToStats } from '../search.js';

function App() {
  // breadth first search
  const cubeStates = useMemo(() => breadthFirstSearch(cube, 3), []);
  // one-off test
  // const cubeStates = useMemo(() => [cube.execute('10 00 ')], []);

  const cubeVisuals = cubeStates
    .filter(cubeState => cubeState.topFace.isSolvedAsTop())
    .map((cubeState, index) => (
    <CubeVisual key={index} {...cubeStateToStats(cubeState)} />
  ))

  return (
    <main className="home">
      <h1>CSS Triangle + Kite</h1>
      {cubeVisuals}
    </main>
  )
}

export default App;
