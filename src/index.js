import "./index.css"

import p5 from "p5"

import Ball from "./Ball/Ball"
import PointGrid from "./PointGrid/PointGrid"
import { marchingSquares } from "./MarchingSquares/functions"

const WIDTH = 600
const HEIGHT = 600

const RESOLUTION = 50

let balls
let pointGrid

const sketch = (p) => {
  // Canvas setup.
  p.setup = () => {
    balls = new Array(10)
    for (let i = 0; i < balls.length; i++) balls[i] = new Ball(p, WIDTH, HEIGHT)
    // balls = balls.map(() => new Ball(p, WIDTH, HEIGHT))

    pointGrid = new PointGrid(p, balls, WIDTH, HEIGHT, RESOLUTION)

    let canvas = p.createCanvas(WIDTH, HEIGHT)
    canvas.parent("Canvas")
  }

  // Draw loop.
  p.draw = () => {
    p.background("#888")

    marchingSquares(p, pointGrid.points)
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw()
      balls[i].update()
    }

    pointGrid.update()
    pointGrid.draw()
  }
}

new p5(sketch)
