import assert from 'node:assert/strict'
import { cube } from '../src/cube.js'
import { Block } from '../src/block.js'
import { kite, triangle } from '../src/block-shape.js'
import { blue, green, none, red, white, yellow } from '../src/block-color.js'
import { cubeStateToStats } from '../src/search.js'

function assertFlipPreservesSideColors() {
  const kiteBlock = new Block(kite, 60, white, red, blue)
  const flippedKite = kiteBlock.flip()

  assert.equal(flippedKite.sideColor1.color, kiteBlock.sideColor1.color)
  assert.equal(flippedKite.sideColor2.color, kiteBlock.sideColor2.color)

  const triangleBlock = new Block(triangle, 15, green, yellow, none)
  const flippedTriangle = triangleBlock.flip()

  assert.equal(flippedTriangle.sideColor1.color, triangleBlock.sideColor1.color)
  assert.equal(flippedTriangle.sideColor2.color, triangleBlock.sideColor2.color)
}

function assertDisplayableShapePayloadAfterExecute() {
  const stats = cubeStateToStats(cube.execute('01 26'))
  const allowedShapeNames = new Set(['triangle', 'kite'])
  const allowedColors = new Set(['white', 'green', 'red', 'blue', 'orange', 'yellow', 'none'])

  const allShapes = [...stats.topFaceShapes, ...stats.bottomFaceShapes]
  assert.equal(allShapes.length, 16)

  for (const shape of allShapes) {
    assert.ok(allowedShapeNames.has(shape.shape))
    assert.ok(typeof shape.angle === 'number')
    assert.ok(allowedColors.has(shape.color))
    assert.ok(allowedColors.has(shape.sideColor1))
    assert.ok(allowedColors.has(shape.sideColor2))

    if (shape.shape === 'triangle') {
      assert.notEqual(shape.sideColor1, undefined)
      assert.notEqual(shape.sideColor1, null)
    }
  }
}

function main() {
  assertFlipPreservesSideColors()
  assertDisplayableShapePayloadAfterExecute()
  console.log('Regression checks passed.')
}

main()
