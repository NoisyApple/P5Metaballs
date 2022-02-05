import "./index.css"

import p5 from "p5"

const WIDTH = 700
const HEIGHT = 700

const RESOLUTION = 25

let pointArray = new Array(WIDTH / RESOLUTION + 1)

for (let i = 0; i < pointArray.length; i++)
  pointArray[i] = new Array(HEIGHT / RESOLUTION + 1)

for (let i = 0; i < pointArray.length; i++)
  for (let j = 0; j < pointArray[i].length; j++)
    pointArray[i][j] = Math.floor(Math.random() * 2)

// TODO: Create a class based Point object which can be initialized with an x and y position and a value

const sketch = (p) => {
  const drawGrid = () => {
    for (let i = 0; i <= WIDTH / RESOLUTION; i++) {
      for (let j = 0; j <= HEIGHT / RESOLUTION; j++) {
        p.stroke(pointArray[i][j] ? "black" : "white")
        p.strokeWeight(10)
        p.point(i * RESOLUTION, j * RESOLUTION)
      }
    }
  }

  // Canvas setup.
  p.setup = () => {
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
