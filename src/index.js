import "./index.css"

import p5 from "p5"

import Ball from "./Ball/Ball"
import PointsGrid from "./PointsGrid/PointsGrid"
import { marchingSquares } from "./MarchingSquares"

let isRunning = true

// Reference to the button with selector #ToggleButton from the DOM.
const toggleButton = document.getElementById("ToggleButton")
// Toggles wether the elements in the sketch should being drawn and updated or not.
toggleButton.addEventListener("click", () => (isRunning = !isRunning))

/**
 * Displays a p5 sketch.
 *
 * @param {p5} p p5 object reference.
 */
const sketch = (p) => {
  // Editable values.
  const WIDTH = 600
  const HEIGHT = 600
  const RESOLUTION = 20
  const BALL_AMOUNT = 10

  let balls
  let pointsGrid

  // Sketch setup.
  p.setup = () => {
    balls = new Array(BALL_AMOUNT)

    for (let i = 0; i < balls.length; i++) balls[i] = new Ball(p, WIDTH, HEIGHT)

    pointsGrid = new PointsGrid(p, balls, WIDTH, HEIGHT, RESOLUTION)

    let canvas = p.createCanvas(WIDTH, HEIGHT)
    canvas.parent("Sketch")
  }

  // Draw loop.
  p.draw = () => {
    if (isRunning) {
      p.background("#888")

      marchingSquares(p, pointsGrid, RESOLUTION)

      for (let i = 0; i < balls.length; i++) {
        balls[i].update()
        // balls[i].draw() // Enables ball visualization.
      }

      pointsGrid.update()
      // pointsGrid.draw() // Enables point visualization.
    }
  }
}

new p5(sketch)
