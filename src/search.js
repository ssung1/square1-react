// const HEX_DIGITS = '0123456789AB'
const HEX_DIGITS = '0123456';

function buildCommands() {
  return HEX_DIGITS.split('').flatMap((topDigit) =>
    HEX_DIGITS.split('').map((bottomDigit) => `${topDigit}${bottomDigit} `)
  );
}

export function breadthFirstSearch(initialCube, maxDepth = 2, options = {}) {
  const { verbose = false } = options;
  const commands = buildCommands();
  const queue = [{ cubeState: initialCube, depth: 0 }];
  const results = [initialCube];

  while (queue.length > 0) {
    const { cubeState, depth } = queue.shift();

    if (depth >= maxDepth) {
      continue;
    }

    if (!cubeState.isFlippable()) {
      continue;
    }

    commands.forEach((command) => {
      const nextCubeState = cubeState.execute(command, { verbose });

      if (nextCubeState === cubeState) {
        return;
      }

      results.push(nextCubeState);

      if (!nextCubeState.isFlippable()) {
        return;
      }

      queue.push({ cubeState: nextCubeState, depth: depth + 1 });
    });
  }

  return results;
}

function convertToDisplayableShapes(face) {
  return face.blocks.map((block) => ({
    shape: block.shape.shape,
    angle: block.angle,
    color: block.faceColor.color,
  }));
}

export function cubeStateToStats(cubeState) {
  return {
    executionHistory: cubeState.executionHistory,
    flippable: cubeState.isFlippable(),
    topFaceShapes: convertToDisplayableShapes(cubeState.topFace),
    bottomFaceShapes: convertToDisplayableShapes(cubeState.bottomFace),
  };
}
