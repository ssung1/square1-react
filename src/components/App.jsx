import './App.css'
import CubeVisual from './CubeVisual'
import { useMemo } from 'react'
import { cube } from '../cube';

// const HEX_DIGITS = '0123456789AB'
const HEX_DIGITS = '0123456';

function buildCommands() {
  return HEX_DIGITS.split('').flatMap((topDigit) =>
    HEX_DIGITS.split('').map((bottomDigit) => `${topDigit}${bottomDigit} `)
  )
}

function breadthFirstSearch(initialCube, maxDepth = 2) {
  const commands = buildCommands()
  const queue = [{ cubeState: initialCube, depth: 0 }]
  const results = [initialCube]

  while (queue.length > 0) {
    const { cubeState, depth } = queue.shift()

    if (depth >= maxDepth) {
      continue
    }

    if (!cubeState.isFlippable()) {
      continue
    }

    commands.forEach((command) => {
      const nextCubeState = cubeState.execute(command)

      if (nextCubeState === cubeState) {
        return
      }

      results.push(nextCubeState)

      if (!nextCubeState.isFlippable()) {
        return
      }

      queue.push({ cubeState: nextCubeState, depth: depth + 1 })
    })
  }

  return results
}

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
  // breadth first search
  const cubeStates = useMemo(() => breadthFirstSearch(cube, 3), []);
  // one-off test
  // const cubeStates = useMemo(() => [cube.execute('10 00 ')], []);

  const cubeVisuals = cubeStates
    .filter(cubeState => cubeState.topFace.isSolvedAsTop())
    .map((cubeState, index) => (
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
