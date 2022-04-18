// Point class.
class Point {
  constructor(p, x, y) {
    this.p = p
    this.x = x
    this.y = y
    this.value = 0
  }

  draw() {
    this.p.push()
    // this.p.stroke(this.value ? "black" : "white")
    this.p.stroke(this.value)
    this.p.strokeWeight(8)
    this.p.point(this.x, this.y)
    this.p.fill("#0008")
    // this.p.textSize(8)
    // this.p.text(this.value, this.x, this.y)
    this.p.pop()
  }
}

export default Point
