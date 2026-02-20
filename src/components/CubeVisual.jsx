import FaceVisual from './FaceVisual'

export function CubeVisual({
  executionHistory = [],
  flippable = false,
  topFaceShapes = [],
  bottomFaceShapes = [],
}) {
  const borderColor = flippable ? 'red' : 'black'
  const executionHistoryText = executionHistory.join('')

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

export default CubeVisual
