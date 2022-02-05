import "./index.css"

import p5 from "p5"

const WIDTH = 700
const HEIGHT = 700

const sketch = (p) => {
  // Canvas setup.
  p.setup = () => {
    let canvas = p.createCanvas(WIDTH, HEIGHT)
    canvas.parent("Canvas")
  }

  // Draw loop.
  p.draw = () => {
    p.background(200)
  }
}

new p5(sketch)
