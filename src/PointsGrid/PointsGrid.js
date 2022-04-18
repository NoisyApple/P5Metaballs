import p5 from "p5"

import Ball from "../Ball/Ball"
import Point from "./Point/Point"

/**
 * PointsGrid class.
 */
class PointsGrid {
  /**
   * Creates a PointsGrid object, this object stores the state of the balls and points
   * in the sketch.
   *
   * @param {p5} p p5 object reference.
   * @param {[Ball]} balls An array of Ball objects.
   * @param {number} canvasWidth The width of the canvas.
   * @param {number} canvasHeight The height of the canvas.
   * @param {number} canvasResolution The resolution of the canvas.
   */
  constructor(p, balls, canvasWidth, canvasHeight, canvasResolution) {
    this.p = p
    this.balls = balls
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.canvasResolution = canvasResolution
    this.points = new Array(Math.floor(canvasWidth / canvasResolution + 1))

    for (let i = 0; i < this.points.length; i++)
      this.points[i] = new Array(Math.floor(canvasWidth / canvasResolution + 1))

    for (let i = 0; i < this.points.length; i++)
      for (let j = 0; j < this.points[i].length; j++)
        this.points[i][j] = new Point(
          p,
          i * canvasResolution,
          j * canvasResolution
        )
  }

  /**
   * Updates the state of the elements in the points grid.
   */
  update() {
    for (let i = 0; i < this.points.length; i++)
      for (let j = 0; j < this.points[i].length; j++) {
        let point = this.points[i][j]
        point.value = 0

        let sum = 0

        // Sums the radius of each ball divided by the distance from the current point to it.
        this.balls.forEach((b) => {
          let d = this.p.dist(point.x, point.y, b.x, b.y)

          // NOTE: "75" might probabbly be acting as some kind of bias value.
          sum += (75 * b.radius) / d
        })

        point.value = sum // Assigns the sum to the value of the point.
      }
  }

  /**
   * Draws the points in the points grid.
   */
  draw() {
    for (let i = 0; i < this.points.length; i++)
      for (let j = 0; j < this.points[i].length; j++) this.points[i][j].draw()
  }

  /**
   * Obtains the array of points binded to the points grid.
   *
   * @returns {[Point]} An array of points.
   */
  get points() {
    return this.__points__
  }

  /**
   * Sets the value of the points array in the points grid.
   *
   * @param {[Point]} points The new array of points.
   */
  set points(points) {
    this.__points__ = points
  }
}

export default PointsGrid
