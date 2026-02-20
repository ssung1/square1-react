import { memo, useMemo } from 'react'
import FaceVisual from './FaceVisual'

export function CubeVisual({
  executionHistory = [],
  flippable = false,
  topFaceShapes = [],
  bottomFaceShapes = [],
}) {
  const borderColor = flippable ? 'red' : 'black'
  const executionHistoryText = useMemo(
    () => executionHistory.join(''),
    [executionHistory],
  )

  return (
    <div>
      <div>{executionHistoryText}</div>
      <div className="faces-row">
        <FaceVisual shapes={topFaceShapes} borderColor={borderColor} />
        <FaceVisual shapes={bottomFaceShapes} borderColor={borderColor} />
      </div>
    </div>
  )
}

export default memo(CubeVisual)
