import "./index.css"

import p5 from "p5"

import Ball from "./Ball/Ball"
import PointGrid from "./PointGrid/PointGrid"
import { marchingSquares } from "./MarchingSquares/functions"

const WIDTH = 600
const HEIGHT = 600

const RESOLUTION = 25

let pointGrid
let ballA

const sketch = (p) => {
  // Canvas setup.
  p.setup = () => {
    pointGrid = new PointGrid(p, WIDTH, HEIGHT, RESOLUTION)
    ballA = new Ball(p, WIDTH, HEIGHT)

    let canvas = p.createCanvas(WIDTH, HEIGHT)
    canvas.parent("Canvas")
  }

  // Draw loop.
  p.draw = () => {
    p.background("#888")
    pointGrid.draw()
    // marchingSquares(p, pointArray)
    ballA.draw()
    ballA.update()
  }
}

new p5(sketch)
