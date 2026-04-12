import { memo, useMemo } from 'react'
import { normalizeDegrees } from '../angle';

const degToRad = (degrees) => (degrees * Math.PI) / 180
const BORDER_THICKNESS = 2
const SHORT_EDGE_MULTIPLIER = 5

const rotatePoint = (point, radians) => ({
  x: point.x * Math.cos(radians) - point.y * Math.sin(radians),
  y: point.x * Math.sin(radians) + point.y * Math.cos(radians),
})

const getKiteGeometry = (longSideLength) => {
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

  const normalizedPoints = screenPoints.map((point) => ({
    x: point.x - minX,
    y: point.y - minY,
  }))

  const clipPath = `polygon(${screenPoints
    .map((point) => {
      const xPercent = ((point.x - minX) / width) * 100
      const yPercent = ((point.y - minY) / height) * 100
      return `${xPercent}% ${yPercent}%`
    })
    .join(', ')})`

  const edgeData = normalizedPoints.map((point, index) => {
    const nextPoint = normalizedPoints[(index + 1) % normalizedPoints.length]
    const dx = nextPoint.x - point.x
    const dy = nextPoint.y - point.y

    return {
      start: point,
      end: nextPoint,
      length: Math.hypot(dx, dy),
      midpointX: (point.x + nextPoint.x) / 2,
    }
  })

  const sortedEdgesByLength = [...edgeData].sort((a, b) => a.length - b.length)
  const shortEdges = sortedEdgesByLength.slice(0, 2).sort((a, b) => a.midpointX - b.midpointX)

  return {
    clipPath,
    width,
    height,
    aspectRatio: `${width} / ${height}`,
    svgPoints: normalizedPoints.map((point) => `${point.x},${point.y}`).join(' '),
    leftShortEdge: shortEdges[0],
    rightShortEdge: shortEdges[1],
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

function Triangle({
  rotation = 0,
  sideLength = 176,
  color = '#646cff',
  borderColor = '#000',
  sideColor1 = borderColor,
}) {
  const { width, height } = getTriangleDimensionsFromSide(sideLength)
  const borderThickness = BORDER_THICKNESS
  const shortEdgeThickness = BORDER_THICKNESS * SHORT_EDGE_MULTIPLIER
  const shortEdgeColor = sideColor1 === 'none' ? borderColor : sideColor1

  return (
    <svg
      className="triangle"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ transform: `rotate(${rotation}deg)`, overflow: 'visible' }}
      aria-label="triangle shape"
    >
      <polygon
        points={`0,0 ${width},0 ${width / 2},${height}`}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderThickness}
      />
      <line
        x1="0"
        y1="0"
        x2={width}
        y2="0"
        stroke={shortEdgeColor}
        strokeWidth={shortEdgeThickness}
        strokeLinecap="butt"
      />
    </svg>
  )
}

function Kite({
  rotation = 0,
  longSideLength = 176,
  color = '#61dafb',
  borderColor = '#000',
  sideColor1 = borderColor,
  sideColor2 = borderColor,
}) {
  const kiteGeometry = getKiteGeometry(longSideLength)
  const borderThickness = BORDER_THICKNESS
  const shortEdgeThickness = BORDER_THICKNESS * SHORT_EDGE_MULTIPLIER
  const leftShortEdgeColor = sideColor1 === 'none' ? borderColor : sideColor1
  const rightShortEdgeColor = sideColor2 === 'none' ? borderColor : sideColor2

  return (
    <svg
      className="kite"
      width={kiteGeometry.width}
      height={kiteGeometry.height}
      viewBox={`0 0 ${kiteGeometry.width} ${kiteGeometry.height}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      aria-label="kite shape"
    >
      <polygon
        points={kiteGeometry.svgPoints}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderThickness}
      />
      <line
        x1={kiteGeometry.leftShortEdge.start.x}
        y1={kiteGeometry.leftShortEdge.start.y}
        x2={kiteGeometry.leftShortEdge.end.x}
        y2={kiteGeometry.leftShortEdge.end.y}
        stroke={leftShortEdgeColor}
        strokeWidth={shortEdgeThickness}
      />
      <line
        x1={kiteGeometry.rightShortEdge.start.x}
        y1={kiteGeometry.rightShortEdge.start.y}
        x2={kiteGeometry.rightShortEdge.end.x}
        y2={kiteGeometry.rightShortEdge.end.y}
        stroke={rightShortEdgeColor}
        strokeWidth={shortEdgeThickness}
      />
    </svg>
  )
}

function arrangeFace(
  shapes,
  { centerX, centerY, triangleSideLength, kiteLongSideLength, borderColor },
) {
  const triangleDimensions = getTriangleDimensionsFromSide(triangleSideLength)
  const kiteGeometry = getKiteGeometry(kiteLongSideLength)

  return shapes.map((item, index) => {
    const shape = item.shape
    const color = item.color
    const angle =
      item.angle !== undefined
        ? degToRad(item.angle) : (2 * Math.PI * index) / shapes.length
    const towardCenterAngleDeg = normalizeDegrees((angle * 180) / Math.PI)

    let inwardOffset = { x: 0, y: 0 }

    if (shape === 'triangle') {
      inwardOffset = { x: 0, y: triangleDimensions.height / 2 }
    }

    if (shape === 'kite') {
      inwardOffset = kiteGeometry.inwardOffset
    }

    const rotatedOffset = rotatePoint(inwardOffset, degToRad(towardCenterAngleDeg))
    const x = centerX - rotatedOffset.x
    const y = centerY - rotatedOffset.y

    let shapeElement = null

    if (shape === 'triangle') {
      shapeElement = (
        <Triangle
          rotation={towardCenterAngleDeg}
          sideLength={triangleSideLength}
          color={color}
          borderColor={borderColor}
          sideColor1={item.sideColor1}
        />
      )
    }

    if (shape === 'kite') {
      shapeElement = (
        <Kite
          rotation={towardCenterAngleDeg}
          longSideLength={kiteLongSideLength}
          color={color}
          borderColor={borderColor}
          sideColor1={item.sideColor1}
          sideColor2={item.sideColor2}
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
  kiteLongSideLength = 176,
  borderColor = '#000',
  displayRotation = 0,
}) {
  const faceShapes = useMemo(
    () =>
      arrangeFace(shapes, {
        centerX,
        centerY,
        triangleSideLength,
        kiteLongSideLength,
        borderColor,
      }),
    [shapes, centerX, centerY, triangleSideLength, kiteLongSideLength, borderColor],
  )

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

export default memo(FaceVisual)
