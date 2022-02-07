import "./index.css"

import p5 from "p5"

import Point from "./Point/Point"

const WIDTH = 600
const HEIGHT = 600

const RESOLUTION = 25

let pointArray

const sketch = (p) => {
  const drawGrid = () => {
    for (let i = 0; i < pointArray.length; i++)
      for (let j = 0; j < pointArray[i].length; j++) pointArray[i][j].draw()
  }

  // Canvas setup.
  p.setup = () => {
    pointArray = new Array(WIDTH / RESOLUTION + 1)

    for (let i = 0; i < pointArray.length; i++)
      pointArray[i] = new Array(HEIGHT / RESOLUTION + 1)

    for (let i = 0; i <= WIDTH / RESOLUTION; i++)
      for (let j = 0; j <= HEIGHT / RESOLUTION; j++)
        pointArray[i][j] = new Point(p, i * RESOLUTION, j * RESOLUTION)

    let canvas = p.createCanvas(WIDTH, HEIGHT)
    canvas.parent("Canvas")
  }

  // Draw loop.
  p.draw = () => {
    p.background("#888")
    drawGrid()
  }
}

new p5(sketch)
