# Square-1 Viewer

# Build + Run

Optionally, either edit cube-face.js to set the initial state of the cube;
the syntax for each cube is "shape + face color + side color1 + side color2", where

- shape: t for triangle, k for kite, and w for square
- face color: r for red, g for green
- side color: r for red, y for yellow, b for blue, and o for orange

example:

```
const initialTopFace = createCubeFace('two kwyr twb kwoy twy kwrb twr kwbo');
const initialBottomFace = createCubeFace('tgr kgrb tgb kgbo tgo kgoy tgy kgyr');
```

In App.jsx, if looking for a solution, do a search

```
  const cubeStates = useMemo(() => breadthFirstSearch(cube, depth), []);
```

then filter by

- cubeState.isSquare(): only display cubes in a square face state
- cubeState.isAllGreen(): only display cubes if all the top face is green
- cubeState.topFace.isSolvedAsTop(): only display cubes if the top face is solved

example:

```
  const cubeVisuals = cubeStates.filter(cubeState => cubeState.isSquare()).map((cubeState, index) => (
    <CubeVisual key={index} {...convertToCubeComponent(cubeState)} />
  ))
```

Start the application:

```
npm run dev
```

or if using CLI:

```
npm run cli
```

Then go to the URL displayed on the console
