/**
 * 
 * 
 * 
 * 
 */



let grid = []
let colorGrid = []
let dim = 100
let erase = 0
let cellSize = 0
let dimSlider
let colorPallete = { x: 650, y: 70, cellSize: 100, w: 3, h: 5 }

let paintCol = [255, 255, 255]

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(255)
    noStroke()
    cellSize = windowHeight / dim
    grid = createRandomGrid(dim)
    colorGrid = createColorPallette([colorPallete.w, colorPallete.h])
    showGrid(colorGrid, { x: colorPallete.x, y: colorPallete.y }, colorPallete.cellSize)
    dimSlider = createSlider(1, 124, 20, 1)
    dimSlider.position(650, 10)
}

const reset = (newDim) => {
    grid = []
    dim = newDim
    grid = createRandomGrid(dim)
    cellSize = windowHeight / dim
}

const showGrid = (grid, start, cellSize) => {
    grid.forEach((row, x) => row.forEach((cell, y) => {
        fill(cell)
        rect(x * cellSize + start.x, y * cellSize + start.y, cellSize)
    }))
}

const createColorPallette = (dimCol) => {
    const x = dimCol[0]
    const y = dimCol[1]
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

const createRandomGrid = (dim) => {
    const tempGrid = []
    for (let y = 0; y < dim; y++) {
        const row = []
        for (let x = 0; x < dim; x++) {
            row.push([random(255), random(255), random(255)])
        }
        tempGrid.push(row)
    }
    return tempGrid
}

const setColorTo = (color, grid) => {
    grid.forEach((row, x) => row.forEach((cell, y) => grid[x][y] = [color[0], color[1], color[2]]))
}

const paintCell = (x, y) => {
    grid[floor(x / cellSize)][floor(y / cellSize)] = erase ? [0, 0, 0] : paintCol
}

function keyPressed() {
    if (key == ' ') toggleEraser()
}

const toggleEraser = () => erase = erase ? 0 : 1

function touchStarted() {
    // selectCell(mouseX, mouseY)
    if (
        mouseX > colorPallete.x &&
        mouseX < colorPallete.x + colorPallete.cellSize * colorPallete.w &&
        mouseY > colorPallete.y &&
        mouseY < colorPallete.y + colorPallete.cellSize * colorPallete.h) {
        if (erase) toggleEraser()
        const color = colorGrid[floor((mouseX - colorPallete.x) / colorPallete.cellSize)][floor((mouseY - colorPallete.y) / colorPallete.cellSize)]
        paintCol = color
    }
}

function mouseMoved() {
    if (mouseX < cellSize * dim && mouseY < dim * cellSize) paintCell(mouseX, mouseY)
}

function draw() {
    if (dim != dimSlider.value()) reset(dimSlider.value())

    showGrid(grid, { x: 0, y: 0 }, cellSize)

    // showGrid(colorGrid,{x:650,y:70},100)

}