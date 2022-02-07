const drawSquarePattern = (p, pattern, pointA, pointB, pointC, pointD) => {
  // Deconstructed points.
  const { x: aX, y: aY } = pointA
  const { x: bX, y: bY } = pointB
  const { x: cX, y: cY } = pointC
  const { x: dX, y: dY } = pointD

  // Mid points.
  const aB = { x: (aX + bX) / 2, y: aY }
  const aC = { x: aX, y: (aY + cY) / 2 }
  const bD = { x: bX, y: (bY + dY) / 2 }
  const cD = { x: (cX + dX) / 2, y: cY }

  p.push()
  p.strokeWeight(5)
  p.stroke("lightgreen")

  // Pattern drawing.
  switch (pattern) {
    case 0:
    case 15:
      // 0:  0000
      //     0 0
      //     0 0
      // 15: 1111
      //     1 1
      //     1 1
      break
    case 1:
    case 14:
      // 1:  0001
      //     0 0
      //     0 1
      // 14: 1110
      //     1 1
      //     1 0
      p.line(bD.x, bD.y, cD.x, cD.y)
      break
    case 2:
    case 13:
      // 2:  0010
      //     0 0
      //     1 0
      // 13: 1101
      //     1 1
      //     0 1
      p.line(aC.x, aC.y, cD.x, cD.y)
      break
    case 3:
    case 12:
      // 3:  0011
      //     0 0
      //     1 1
      // 12: 1100
      //     1 1
      //     0 0
      p.line(aC.x, aC.y, bD.x, bD.y)
      break
    case 4:
    case 11:
      // 4:  0100
      //     0 1
      //     0 0
      // 11: 1011
      //     1 0
      //     1 1
      p.line(aB.x, aB.y, bD.x, bD.y)
      break
    case 5:
    case 10:
      // 5:  0101
      //     0 1
      //     0 1
      // 10: 1010
      //     1 0
      //     1 0
      p.line(aB.x, aB.y, cD.x, cD.y)
      break
    case 6:
      // 6:  0110
      //     0 1
      //     1 0
      p.line(aB.x, aB.y, bD.x, bD.y)
      p.line(aC.x, aC.y, cD.x, cD.y)
      break
    case 7:
    case 8:
      // 7:  0111
      //     0 1
      //     1 1
      // 8:  1000
      //     1 0
      //     0 0
      p.line(aB.x, aB.y, aC.x, aC.y)
      break
    case 9:
      // 9:  1001
      //     1 0
      //     0 1
      p.line(aB.x, aB.y, aC.x, aC.y)
      p.line(bD.x, bD.y, cD.x, cD.y)
      break
    default:
      break
  }
  p.pop()
}

const mapSquare = (pointA, pointB, pointC, pointD) => {
  const binaryValue = `${pointA.value}${pointB.value}${pointC.value}${pointD.value}`

  return parseInt(binaryValue, 2)
}

const marchingSquares = (p, pointArray) => {
  for (let i = 0; i < pointArray.length; i += 1)
    for (let j = 0; j < pointArray[i].length; j += 1) {
      if (i + 1 > pointArray.length - 1 || j + 1 > pointArray[i].length - 1)
        continue

      let pointA = pointArray[i][j]
      let pointC = pointArray[i][j + 1]
      let pointB = pointArray[i + 1][j]
      let pointD = pointArray[i + 1][j + 1]

      const pattern = mapSquare(pointA, pointB, pointC, pointD)

      drawSquarePattern(p, pattern, pointA, pointB, pointC, pointD)
    }
}

export { drawSquarePattern, mapSquare, marchingSquares }
