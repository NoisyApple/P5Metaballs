import Point from "./Point/Point"

class PointGrid {
  constructor(p, canvasWidth, canvasHeight, canvasResolution) {
    this.p = p
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.canvasResolution = canvasResolution
    this.points = new Array(canvasWidth / canvasResolution + 1)

    for (let i = 0; i < this.points.length; i++)
      this.points[i] = new Array(canvasHeight / canvasResolution + 1)

    for (let i = 0; i <= canvasWidth / canvasResolution; i++)
      for (let j = 0; j <= canvasHeight / canvasResolution; j++)
        this.points[i][j] = new Point(
          p,
          i * canvasResolution,
          j * canvasResolution
        )
  }

  update() {}

  draw() {
    for (let i = 0; i < this.points.length; i++)
      for (let j = 0; j < this.points[i].length; j++) this.points[i][j].draw()
  }
}

export default PointGrid
