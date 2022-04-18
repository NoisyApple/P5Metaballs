import p5 from "p5"
import PointsGrid from "../PointsGrid/PointsGrid"

// Bias for how the points are determined to be on (1) or off (0) based on their values.
const BIAS = 160

/**
 * Iterates through the given point grid determining which pattern should be drawn based on the values of the points
 * using the {@link https://en.wikipedia.org/wiki/Marching_squares | Marching Squares algorithm}.
 *
 * @param {p5} p p5 object reference.
 * @param {PointsGrid} pointsGrid The point grid to work on.
 */
const marchingSquares = (p, pointsGrid) => {
  const { points } = pointsGrid

  for (let i = 0; i < points.length; i += 1)
    for (let j = 0; j < points[i].length; j += 1) {
      if (i + 1 > points.length - 1 || j + 1 > points[i].length - 1) continue

      let pointA = points[i][j]
      let pointB = points[i + 1][j]
      let pointC = points[i][j + 1]
      let pointD = points[i + 1][j + 1]

      drawSquarePattern(p, pointA, pointB, pointC, pointD)
    }
}

/**
 * Takes 4 points and determines if each of them are on or off based on the global BIAS, then constructs a binary
 * number with them.
 *
 * @param {Point} pointA Point A.
 * @param {Point} pointB Point B.
 * @param {Point} pointC Point C.
 * @param {Point} pointD Point D.
 * @returns {String} A binary number.
 */
const mapSquare = (pointA, pointB, pointC, pointD) => {
  let a = pointA.value < BIAS ? 0 : 1
  let b = pointB.value < BIAS ? 0 : 1
  let c = pointC.value < BIAS ? 0 : 1
  let d = pointD.value < BIAS ? 0 : 1

  const binaryValue = `${a}${b}${c}${d}`

  return parseInt(binaryValue, 2)
}

/**
 * Takes 4 points and draws a pattern based on the values from them.
 *
 * @param {p5} p p5 object reference.
 * @param {Point} pointA Point A.
 * @param {Point} pointB Point B.
 * @param {Point} pointC Point C.
 * @param {Point} pointD Point D.
 */
const drawSquarePattern = (p, pointA, pointB, pointC, pointD) => {
  const pattern = mapSquare(pointA, pointB, pointC, pointD)

  // Deconstructed points.
  const { x: aX, y: aY, value: aValue } = pointA
  const { x: bX, y: bY, value: bValue } = pointB
  const { x: cX, y: cY, value: cValue } = pointC
  const { x: dX, y: dY, value: dValue } = pointD

  // Amount to be applied in lerp function.
  const aBAmount = (BIAS - aValue) / (bValue - aValue)
  const aCAmount = (BIAS - aValue) / (cValue - aValue)
  const bDAmount = (BIAS - bValue) / (dValue - bValue)
  const cDAmount = (BIAS - cValue) / (dValue - cValue)

  // Interpolated values between points.
  const aBX = p.lerp(aX, bX, aBAmount)
  const aCY = p.lerp(aY, cY, aCAmount)
  const bDY = p.lerp(bY, dY, bDAmount)
  const cDX = p.lerp(cX, dX, cDAmount)

  p.push()
  p.noStroke()
  p.fill("dodgerblue")

  // Pattern drawing.
  switch (pattern) {
    case 0:
      // 0:  0000
      //     0 0
      //     0 0
      break
    case 15:
      // 15: 1111
      //     1 1
      //     1 1
      p.beginShape()
      p.vertex(aX, aY)
      p.vertex(bX, bY)
      p.vertex(dX, dY)
      p.vertex(cX, cY)
      p.endShape()
      break
    case 1:
      // 1:  0001
      //     0 0
      //     0 1
      p.beginShape()
      p.vertex(bX, bDY)
      p.vertex(dX, dY)
      p.vertex(cDX, cY)
      p.endShape()
      break
    case 14:
      // 14: 1110
      //     1 1
      //     1 0
      p.beginShape()
      p.vertex(aX, aY)
      p.vertex(bX, bY)
      p.vertex(bX, bDY)
      p.vertex(cDX, cY)
      p.vertex(cX, cY)
      p.endShape()
      break
    case 2:
      // 2:  0010
      //     0 0
      //     1 0
      p.beginShape()
      p.vertex(aX, aCY)
      p.vertex(cDX, cY)
      p.vertex(cX, cY)
      p.endShape()
      break
    case 13:
      // 13: 1101
      //     1 1
      //     0 1
      p.beginShape()
      p.vertex(aX, aY)
      p.vertex(bX, bY)
      p.vertex(dX, dY)
      p.vertex(cDX, cY)
      p.vertex(aX, aCY)
      p.endShape()
      break
    case 3:
      // 3:  0011
      //     0 0
      //     1 1
      p.beginShape()
      p.vertex(aX, aCY)
      p.vertex(bX, bDY)
      p.vertex(dX, dY)
      p.vertex(cX, cY)
      p.endShape()
      break
    case 12:
      // 12: 1100
      //     1 1
      //     0 0
      p.beginShape()
      p.vertex(aX, aY)
      p.vertex(bX, bY)
      p.vertex(bX, bDY)
      p.vertex(aX, aCY)
      p.endShape()
      break
    case 4:
      // 4:  0100
      //     0 1
      //     0 0
      p.beginShape()
      p.vertex(aBX, aY)
      p.vertex(bX, bY)
      p.vertex(bX, bDY)
      p.endShape()
      break
    case 11:
      // 11: 1011
      //     1 0
      //     1 1
      p.beginShape()
      p.vertex(aX, aY)
      p.vertex(aBX, aY)
      p.vertex(bX, bDY)
      p.vertex(dX, dY)
      p.vertex(cX, cY)
      p.endShape()
      break
    case 5:
      // 5:  0101
      //     0 1
      //     0 1
      p.beginShape()
      p.vertex(aBX, aY)
      p.vertex(bX, bY)
      p.vertex(dX, dY)
      p.vertex(cDX, cY)
      p.endShape()
      break
    case 10:
      // 10: 1010
      //     1 0
      //     1 0
      p.beginShape()
      p.vertex(aX, aY)
      p.vertex(aBX, aY)
      p.vertex(cDX, cY)
      p.vertex(cX, cY)
      p.endShape()
      break
    case 6:
      // 6:  0110
      //     0 1
      //     1 0
      p.beginShape()
      p.vertex(aBX, aY)
      p.vertex(bX, bY)
      p.vertex(bX, bDY)
      p.endShape()

      p.beginShape()
      p.vertex(aX, aCY)
      p.vertex(cDX, cY)
      p.vertex(cX, cY)
      p.endShape()
      break
    case 7:
      // 7:  0111
      //     0 1
      //     1 1
      p.beginShape()
      p.vertex(aBX, aY)
      p.vertex(bX, bY)
      p.vertex(dX, dY)
      p.vertex(cX, cY)
      p.vertex(aX, aCY)
      p.endShape()
      break
    case 8:
      // 8:  1000
      //     1 0
      //     0 0
      p.beginShape()
      p.vertex(aX, aY)
      p.vertex(aBX, aY)
      p.vertex(aX, aCY)
      p.endShape()
      break
    case 9:
      // 9:  1001
      //     1 0
      //     0 1
      p.beginShape()
      p.vertex(aX, aY)
      p.vertex(aBX, aY)
      p.vertex(aX, aCY)
      p.endShape()

      p.beginShape()
      p.vertex(bX, bDY)
      p.vertex(dX, dY)
      p.vertex(cDX, cY)
      p.endShape()
      break
    default:
      break
  }
  p.pop()
}

export { drawSquarePattern, mapSquare, marchingSquares }
