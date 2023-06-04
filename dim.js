/**
 * 
 * 
 * 
 * 
 */


const grid = []
let dim = 100
let erase = 0
let cellSize = 0

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(255)
    cellSize = windowHeight / dim
    createRandomGrid(dim)
    noStroke()
}

const createRandomGrid = (dim) => {
    for (let y = 0; y < dim; y++) {
        const row = []
        for (let x = 0; x < dim; x++) {
            row.push([random(255), random(255), random(255)])
        }
        grid.push(row)
    }
}

const changeColors = () => {
    grid.forEach((row, x) => row.forEach((cell, y) => grid[x][y] = [255, 255, 255]))
}

const selectCell = (x, y) => {
    grid[floor(x / cellSize)][floor(y / cellSize)] = erase ? [0, 0, 0] : [255, 255, 255]
}

function keyPressed() {
    if (key == ' ') erase = erase ? 0 : 1
}

function touchStarted() {
    // changeColors()
    selectCell(mouseX, mouseY)
}

function mouseMoved(){
    selectCell(mouseX, mouseY)
}

function draw() {
    grid.forEach((row, x) => row.forEach((cell, y) => {
        fill(cell)
        rect(x * cellSize, y * cellSize, cellSize)
    }))
}