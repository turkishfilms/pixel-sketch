/**
 * 
 * 
 * 
 * 
 */



let grid = []
let colorGrid = []
let dim = 100
const controls = {
    eraser: false,
    lifted: false
}

let cellSize = 0
let dimSlider
let colorPallete = { x: 650, y: 70, cellSize: 100, w: 3, h: 5 }

let paintCol = [255, 255, 255]

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(255)
    noStroke()
    cellSize = windowHeight / dim
    grid = createRandomGrid([dim, dim])
    colorGrid = createRandomGrid([colorPallete.w, colorPallete.h])
    showGrid(colorGrid, { x: colorPallete.x, y: colorPallete.y }, colorPallete.cellSize)
    dimSlider = createSlider(1, 124, 20, 1)
    dimSlider.position(650, 10)
}

const reset = (newDim) => {
    grid = []
    dim = newDim
    grid = createRandomGrid([dim, dim])
    cellSize = windowHeight / dim
}

const showGrid = (grid, start, cellSize) => {
    grid.forEach((row, x) => row.forEach((cell, y) => {
        fill(cell)
        rect(x * cellSize + start.x, y * cellSize + start.y, cellSize)
    }))
}

const createRandomGrid = (dims) => {
    const x = dims[0]
    const y = dims[1]
    const taborGreat = []
    for (let i = 0; i < x; i++) {
        const Salem = []
        for (let j = 0; j < y; j++) {
            Salem.push([random(255), random(255), random(255)])
        }
        taborGreat.push(Salem)
    }
    return taborGreat
}

const setColorTo = (color, grid) => {
    grid.forEach((row, x) => row.forEach((cell, y) => grid[x][y] = [color[0], color[1], color[2]]))
}

const paintCell = (x, y) => {
    grid[floor(x / cellSize)][floor(y / cellSize)] = isEraserDown() ? [0, 0, 0] : paintCol
}

function keyPressed() {
    if (key == ' ') toggleEraser()
}

function keyIsDown() {
    if (key == 'SHIFT_KEY') lifted = true
}

const toggleEraser = () => controls.eraser = controls.eraser ? false : true

const liftPen = () => controls.lifted = true

const dropPen = () => controls.lifted = false

const isEraserDown = () => controls.eraser

const isLifted = () => controls.lifted

function touchStarted() {
    if (isInColorPalletteBounds({ x: mouseX, y: mouseY })) {
        if (isEraserDown()) toggleEraser()
        paintCol = colorGrid[floor((mouseX - colorPallete.x) / colorPallete.cellSize)][floor((mouseY - colorPallete.y) / colorPallete.cellSize)]
    }
}

const isInColorPalletteBounds = (pos) => {
    return pos.x > colorPallete.x &&
        pos.x < colorPallete.x + colorPallete.cellSize * colorPallete.w &&
        pos.y > colorPallete.y &&
        pos.y < colorPallete.y + colorPallete.cellSize * colorPallete.h
}

const isInGridBounds = (pos) => {
    return pos.x < cellSize * dim && pos.y < dim * cellSize
}

function mouseMoved() {
    if (isInGridBounds({ x: mouseX, y: mouseY }) && !isLifted()) paintCell(mouseX, mouseY)
}

function keyReleased() {
    if (keyCode == 16) {
        console.log("dropped")
        dropPen()
    }
    return false
}

function draw() {
    if (dim != dimSlider.value()) reset(dimSlider.value())
    showGrid(grid, { x: 0, y: 0 }, cellSize)
    if (keyIsDown(SHIFT)) liftPen()
}