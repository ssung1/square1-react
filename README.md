# Square-1 Viewer

# Build + Run

Optionally, either edit block.js or cube-face.js to set the initial state
of the cube

In App.jsx, if looking for a solution, do a search

```
  const cubeStates = useMemo(() => breadthFirstSearch(cube, depth), []);
```

then filter by

- cubeState.isSquire(): only display cubes in a square face state
- cubeState.isAllGreen(): only display cubes if all the top face is green

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

Then go to the URL displayed on the console
