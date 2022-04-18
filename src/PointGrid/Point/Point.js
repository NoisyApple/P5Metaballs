import p5 from "p5"

/**
 * Point class.
 */
class Point {
  /**
   * Creates a Point object, it stores the coordinates of a point.
   *
   * @param {p5} p p5 object reference.
   * @param {number} x The x coordinate.
   * @param {number} y The y coordinate.
   */
  constructor(p, x, y) {
    this.p = p
    this.x = x
    this.y = y
    this.value = 0
  }

  /**
   * Draws the point.
   */
  draw() {
    this.p.push()
    this.p.stroke(this.value)
    this.p.strokeWeight(8)
    this.p.point(this.x, this.y)
    this.p.pop()
  }
}

export default Point
