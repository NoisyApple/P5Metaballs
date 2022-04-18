const BIAS = 160

const drawSquarePattern = (p, pointA, pointB, pointC, pointD) => {
  const pattern = mapSquare(pointA, pointB, pointC, pointD)

  // Deconstructed points.
  const { x: aX, y: aY, value: aValue } = pointA
  const { x: bX, y: bY, value: bValue } = pointB
  const { x: cX, y: cY, value: cValue } = pointC
  const { x: dX, y: dY, value: dValue } = pointD

  // Mid points.
  const aB = { x: (aX + bX) / 2, y: aY }
  const aC = { x: aX, y: (aY + cY) / 2 }
  const bD = { x: bX, y: (bY + dY) / 2 }
  const cD = { x: (cX + dX) / 2, y: cY }

  const aBAmount = (BIAS - aValue) / (bValue - aValue)
  const aCAmount = (BIAS - aValue) / (cValue - aValue)
  const bDAmount = (BIAS - bValue) / (dValue - dValue)
  const cDAmount = (BIAS - cValue) / (dValue - cValue)

  const aBX = p.lerp(aX, bX, aBAmount)
  const aCY = p.lerp(aY, cY, aCAmount)
  const bDY = p.lerp(bY, dY, bDAmount)
  const cDX = p.lerp(cX, dX, cDAmount)

  p.push()
  p.strokeWeight(2)
  p.stroke("#FAFF81")
  // p.noStroke()
  p.fill("#FAFF81")

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
      // p.beginShape()
      // p.vertex(aX, aY)
      // p.vertex(bX, bY)
      // p.vertex(dX, dY)
      // p.vertex(cX, cY)
      // p.endShape()
      break
    case 1:
      // 1:  0001
      //     0 0
      //     0 1
      p.line(bD.x, bDY, cDX, cD.y)
      break
    case 14:
      // 14: 1110
      //     1 1
      //     1 0
      p.line(bD.x, bDY, cDX, cD.y)
      break
    case 2:
    case 13:
      // 2:  0010
      //     0 0
      //     1 0
      // 13: 1101
      //     1 1
      //     0 1
      p.line(aC.x, aCY, cDX, cD.y)
      break
    case 3:
    case 12:
      // 3:  0011
      //     0 0
      //     1 1
      // 12: 1100
      //     1 1
      //     0 0
      p.line(aC.x, aCY, bD.x, bDY)
      break
    case 4:
    case 11:
      // 4:  0100
      //     0 1
      //     0 0
      // 11: 1011
      //     1 0
      //     1 1
      // p.line(aB.x, aB.y, bD.x, bD.y)
      p.line(aBX, aB.y, bD.x, bDY)
      break
    case 5:
    case 10: {
      // 5:  0101
      //     0 1
      //     0 1
      // 10: 1010
      //     1 0
      //     1 0
      p.line(aBX, aB.y, cDX, cD.y)
      break
    }
    case 6:
      // 6:  0110
      //     0 1
      //     1 0
      p.line(aBX, aB.y, bD.x, bDY)
      p.line(aC.x, aCY, cDX, cD.y)
      break
    case 7:
    case 8:
      // 7:  0111
      //     0 1
      //     1 1
      // 8:  1000
      //     1 0
      //     0 0
      p.line(aBX, aB.y, aC.x, aCY)
      break
    case 9:
      // 9:  1001
      //     1 0
      //     0 1
      p.line(aBX, aB.y, aC.x, aCY)
      p.line(bD.x, bDY, cDX, cD.y)
      break
    default:
      break
  }
  p.pop()
}

const mapSquare = (pointA, pointB, pointC, pointD) => {
  let a = pointA.value < BIAS ? 0 : 1
  let b = pointB.value < BIAS ? 0 : 1
  let c = pointC.value < BIAS ? 0 : 1
  let d = pointD.value < BIAS ? 0 : 1

  // const binaryValue = `${pointA.value}${pointB.value}${pointC.value}${pointD.value}`
  const binaryValue = `${a}${b}${c}${d}`

  return parseInt(binaryValue, 2)
}

const marchingSquares = (p, pointArray) => {
  for (let i = 0; i < pointArray.length; i += 1)
    for (let j = 0; j < pointArray[i].length; j += 1) {
      if (i + 1 > pointArray.length - 1 || j + 1 > pointArray[i].length - 1)
        continue

      let pointA = pointArray[i][j]
      let pointB = pointArray[i + 1][j]
      let pointC = pointArray[i][j + 1]
      let pointD = pointArray[i + 1][j + 1]

      drawSquarePattern(p, pointA, pointB, pointC, pointD)
    }
}

export { drawSquarePattern, mapSquare, marchingSquares }
