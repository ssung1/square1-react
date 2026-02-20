const degToRad = (degrees) => (degrees * Math.PI) / 180

const rotatePoint = (point, radians) => ({
  x: point.x * Math.cos(radians) - point.y * Math.sin(radians),
  y: point.x * Math.sin(radians) + point.y * Math.cos(radians),
})

const getDiamondGeometry = (longSideLength) => {
  const primary = longSideLength
  const secondary = longSideLength / Math.sqrt(2)

  const points = [{ x: 0, y: 0 }]
  const edges = [
    { length: primary, angleDeg: 30 },
    { length: secondary, angleDeg: 105 },
    { length: secondary, angleDeg: 195 },
  ]

  edges.forEach((edge) => {
    const previous = points[points.length - 1]
    points.push({
      x: previous.x + edge.length * Math.cos(degToRad(edge.angleDeg)),
      y: previous.y + edge.length * Math.sin(degToRad(edge.angleDeg)),
    })
  })

  const center = {
    x: points.reduce((sum, point) => sum + point.x, 0) / points.length,
    y: points.reduce((sum, point) => sum + point.y, 0) / points.length,
  }

  const sixtyVertexDirection = Math.atan2(
    points[0].y - center.y,
    points[0].x - center.x,
  )

  const orientDownRotation = -Math.PI / 2 - sixtyVertexDirection
  const orientedPoints = points.map((point) => rotatePoint(point, orientDownRotation))

  const screenPoints = orientedPoints.map((point) => ({
    x: point.x,
    y: -point.y,
  }))

  const xs = screenPoints.map((point) => point.x)
  const ys = screenPoints.map((point) => point.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const width = maxX - minX
  const height = maxY - minY

  const clipPath = `polygon(${screenPoints
    .map((point) => {
      const xPercent = ((point.x - minX) / width) * 100
      const yPercent = ((point.y - minY) / height) * 100
      return `${xPercent}% ${yPercent}%`
    })
    .join(', ')})`

  return {
    clipPath,
    width,
    height,
    aspectRatio: `${width} / ${height}`,
    inwardOffset: {
      x: screenPoints[0].x - (minX + width / 2),
      y: screenPoints[0].y - (minY + height / 2),
    },
  }
}

const getTriangleDimensionsFromSide = (sideLength, apexAngleDeg = 30) => {
  const halfApexRad = degToRad(apexAngleDeg / 2)

  return {
    width: 2 * sideLength * Math.sin(halfApexRad),
    height: sideLength * Math.cos(halfApexRad),
  }
}

function Triangle({ rotation = 0, sideLength = 176, color = '#646cff' }) {
  const { width, height } = getTriangleDimensionsFromSide(sideLength)

  return (
    <div
      className="triangle"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotation}deg)`,
        color
      }}
      aria-label="triangle shape"
    >
      <div className="triangle-fill" style={{ background: color }} />
    </div>
  )
}

function Diamond({ rotation = 0, longSideLength = 176, color = '#61dafb' }) {
  const diamondGeometry = getDiamondGeometry(longSideLength)

  return (
    <div
      className="diamond"
      style={{
        width: `${diamondGeometry.width}px`,
        height: `${diamondGeometry.height}px`,
        transform: `rotate(${rotation}deg)`,
        clipPath: diamondGeometry.clipPath,
        aspectRatio: diamondGeometry.aspectRatio,
      }}
      aria-label="diamond shape"
    >
      <div
        className="diamond-fill"
        style={{
          clipPath: diamondGeometry.clipPath,
          background: color,
        }}
      />
    </div>
  )
}

function arrangeFace(shapes, { centerX, centerY, triangleSideLength, diamondLongSideLength }) {
  const triangleDimensions = getTriangleDimensionsFromSide(triangleSideLength)
  const diamondGeometry = getDiamondGeometry(diamondLongSideLength)
  const firstShape = shapes[0]?.shape
  const startAngleDeg = firstShape === 'triangle' ? 15 : 30
  const startAngleRad = degToRad(startAngleDeg)

  return shapes.map((item, index) => {
    const shape = item.shape
    const color = item.color
    const angle = startAngleRad + (2 * Math.PI * index) / shapes.length
    const towardCenterAngleDeg = (angle * 180) / Math.PI + 180
    const inwardRotation = towardCenterAngleDeg - 90

    let inwardOffset = { x: 0, y: 0 }

    if (shape === 'triangle') {
      inwardOffset = { x: 0, y: triangleDimensions.height / 2 }
    }

    if (shape === 'diamond') {
      inwardOffset = diamondGeometry.inwardOffset
    }

    const rotatedOffset = rotatePoint(inwardOffset, degToRad(inwardRotation))
    const x = centerX - rotatedOffset.x
    const y = centerY - rotatedOffset.y

    let shapeElement = null

    if (shape === 'triangle') {
      shapeElement = (
        <Triangle
          rotation={inwardRotation}
          sideLength={triangleSideLength}
          color={color}
        />
      )
    }

    if (shape === 'diamond') {
      shapeElement = (
        <Diamond
          rotation={inwardRotation}
          longSideLength={diamondLongSideLength}
          color={color}
        />
      )
    }

    if (!shapeElement) {
      return null
    }

    return (
      <div
        key={`${shape}-${index}`}
        className="face-shape"
        style={{ left: `${x}px`, top: `${y}px` }}
      >
        {shapeElement}
      </div>
    )
  })
}

function FaceVisual({
  shapes,
  centerX = 250,
  centerY = 250,
  triangleSideLength = 176,
  diamondLongSideLength = 176,
  displayRotation = 0,
}) {
  const faceShapes = arrangeFace(shapes, {
    centerX,
    centerY,
    triangleSideLength,
    diamondLongSideLength,
  })

  return (
    <div
      className="face-circle"
      style={{
        transform: `rotate(${displayRotation}deg)`,
        transformOrigin: 'center',
      }}
    >
      {faceShapes}
    </div>
  )
}

export default FaceVisual
