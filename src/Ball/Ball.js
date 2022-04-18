import p5 from "p5"

/**
 * Ball class.
 */
class Ball {
  /**
   * Creates a Ball object, it acts like a ball bouncing when it touches the edges of the canvas.
   *
   * @param {p5} p p5 object reference.
   * @param {number} canvasWidth The width of the canvas.
   * @param {number} canvasHeight The height of the canvas.
   */
  constructor(p, canvasWidth, canvasHeight) {
    this.p = p
    this.x = Math.random() * canvasWidth // Randomly positioned inside the canvas.
    this.y = Math.random() * canvasHeight // Randomly positioned inside the canvas.
    this.velX = Math.random() * 3 - 1.5 // Between -1.5 and 1.5
    this.velY = Math.random() * 3 - 1.5 // Between -1.5 and 1.5
    this.radius = Math.random() * 60 + 20 // Between 20 and 80.
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
  }

  /**
   * Updates the x position of the ball based in its velocity.
   */
  update() {
    if (this.x > this.canvasWidth || this.x < 0) this.velX *= -1
    if (this.y > this.canvasHeight || this.y < 0) this.velY *= -1

    this.x += this.velX
    this.y += this.velY
  }

  /**
   * Draws the ball.
   */
  draw() {
    this.p.push()
    this.p.stroke("#0008")
    this.p.fill("#fff8")
    this.p.strokeWeight(5)
    this.p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
    this.p.pop()
  }
}

export default Ball
