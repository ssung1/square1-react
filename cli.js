/* global process */
import { cube } from './src/cube.js';
import { breadthFirstSearch, cubeStateToStats } from './src/search.js';

const cliArgs = process.argv.slice(2);
const verbose = cliArgs.includes('--verbose') || cliArgs.includes('-v');
const depthArg = cliArgs.find((arg) => !arg.startsWith('-'));
const parsedDepth = Number(depthArg ?? 3);
const maxDepth = Number.isFinite(parsedDepth) ? parsedDepth : 3;

const filteredStates = breadthFirstSearch(cube, maxDepth, { verbose })
  .filter((cubeState) => cubeState.topFace.isSolvedAsTop())
  .map(cubeStateToStats);

console.log(JSON.stringify({
  maxDepth,
  filteredCount: filteredStates.length,
  cubes: filteredStates,
}, null, 2));
