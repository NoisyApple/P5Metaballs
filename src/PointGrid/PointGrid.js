import Point from "./Point/Point"

class PointGrid {
  constructor(p, balls, canvasWidth, canvasHeight, canvasResolution) {
    this.p = p
    this.balls = balls
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.canvasResolution = canvasResolution
    this.points = new Array(canvasWidth / canvasResolution + 1)

    for (let i = 0; i < this.points.length; i++)
      this.points[i] = new Array(canvasHeight / canvasResolution + 1)

    for (let i = 0; i < this.points.length; i++)
      for (let j = 0; j < this.points[i].length; j++)
        this.points[i][j] = new Point(
          p,
          i * canvasResolution,
          j * canvasResolution
        )
  }

  update() {
    for (let i = 0; i < this.points.length; i++)
      for (let j = 0; j < this.points[i].length; j++) {
        let point = this.points[i][j]
        point.value = 0

        this.balls.forEach((b) => {
          if (this.pointBallCollision(point, b)) point.value = 1
        })
      }
  }

  draw() {
    for (let i = 0; i < this.points.length; i++)
      for (let j = 0; j < this.points[i].length; j++) this.points[i][j].draw()
  }

  pointBallCollision(point, ball) {
    // let { x, y } = point

    // let minX = x - this.canvasWidth / this.canvasResolution / 2
    // let minY = y - this.canvasHeight / this.canvasResolution / 2
    // let ballXDist = Math.abs(ball.x - minX)
    // let ballYDist = Math.abs(ball.y - minY)

    // if (
    //   ballXDist >
    //   this.canvasWidth / this.canvasResolution / 2 + ball.radius / 2
    // )
    //   return false
    // if (
    //   ballYDist >
    //   this.canvasHeight / this.canvasResolution / 2 + ball.radius / 2
    // )
    //   return false

    // if (ballXDist <= this.canvasWidth / this.canvasResolution / 2) return true
    // if (ballYDist <= this.canvasHeight / this.canvasResolution / 2) return true

    // let cornerDist =
    //   (ballXDist - this.canvasWidth / this.canvasResolution / 2) ^
    //   (2 + (ballYDist - this.canvasHeight / this.canvasResolution / 2)) ^
    //   2

    // return cornerDist <= ((ball.radius / 2) ^ 2)

    let d = this.p.dist(point.x, point.y, ball.x, ball.y)

    return d < 4 + ball.radius
  }
}

export default PointGrid
