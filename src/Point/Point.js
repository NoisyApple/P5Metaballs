// Point class.
class Point {
  constructor(p, x, y) {
    this.p = p
    this.x = x
    this.y = y
    this.value = Math.floor(Math.random() * 2)
  }

  draw() {
    this.p.push()
    this.p.stroke(this.value ? "black" : "white")
    this.p.strokeWeight(10)
    this.p.point(this.x, this.y)
    this.p.pop()
  }
}

export default Point
