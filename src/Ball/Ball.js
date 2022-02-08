class Ball {
  constructor(p, canvasWidth, canvasHeight) {
    this.p = p
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.velX = Math.random() * 10 - 5
    this.velY = Math.random() * 10 - 5
    this.radius = Math.random() * 50 + 25
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
  }

  update() {
    if (this.x > this.canvasWidth || this.x < 0) this.velX *= -1
    if (this.y > this.canvasHeight || this.y < 0) this.velY *= -1

    this.x += this.velX
    this.y += this.velY
  }

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
