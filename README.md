# Square-1 Viewer

# Build + Run

Optionally, either edit cube-face.js to set the initial state of the cube

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
