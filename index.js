/**
 * TODO Make Pixel
 * TODO Make Pixel House
 * TODO 
 * TODO big 2d array
 * TODO 
 * TODO
 * TODO
 * 
 * 
 * 
 * 
 */

const canvs = []


function setup() {
    createCanvas(windowWidth, windowHeight)
    background(255)
    const dims = [4, 4]
    canvs.push(new Drawing({
        dims: dims, canvSize: { width: windowWidth, height: windowHeight }
    }))
}

function mouseMoved() {
    canvs[0].checkTouch({ x: mouseX, y: mouseY })
}

function draw() {
    background(0, 0, 255)
    // canvs[0].(new Pixel({ pos: { x: mouseX, y: mouseY } }))
    canvs[0].nextFrame()
}

class Drawing {
    constructor({ pixels, dims = [1, 1], canvSize = { w: 100, h: 100 } } = {}) {
        // if (!(drawManager instanceof DrawManager)) {
        //     throw new Error("drawManager must be an instance of DrawManager")
        // }
        this.dims = dims
        this.canvSize = canvSize
        this.cellSize = {
            x: floor(canvSize.width / this.dims[1]),
            y: floor(canvSize.height / this.dims[0])
        }
        this.pixels = this.initPixels()
        // this.drawManager = drawManager
    }

    initPixels() {
        const x = this.dims[0]
        const y = this.dims[1]
        const pixels = []
        for (let i = 0; i < x; i++) {
            const row = []
            for (let j = 0; j < y; j++) {
                row.push(new Pixel({ pos: { x: i * this.cellSize.x, y: j * this.cellSize.y }, color: { r: 255, g: 255, b: 255 }, dims: { width: this.canvSize.x / this.cellSize.x, height: this.canvSize.y / this.cellSize.y } }))
            }
            pixels.push(row)
        }
        return pixels
    }

    checkTouch(coords) {
        const len = this.dims[0] * this.dims[1]
        const newColor = { r: 255, g: 0, b: 0 }

        for (let i = 0; i < len; i++) {
            console.log(i)
            const pixel = this.pixels[i % this.dims[1]][floor(i / len)]
            if (pixel.contains(coords)) {
                console.log("noway")
                pixel.color = newColor  //setcolor
                return
            }
        }
    }

    reset() {
        this.pixels = []
    }

    nextFrame() {
        // this.drawManager.drawPixels(this.pixels)
        this.pixels.forEach(row => row.forEach(pixel => pixel.show()))
    }

    addPixel(pixel) {
        if (pixel instanceof Pixel) {
            if (pixel.pos.x < this.drawManager.canvasDim.width && pixel.pos.y < this.drawManager.canvasDim.height) {
                this.pixels.push(pixel)
            }

        } else {
            throw new Error("pixel must be instance of Pixel")
        }
    }
}

class Pixel {
    constructor({ pos = { x: 0, y: 0 }, color = { r: 255, g: 255, b: 255 }, dims = { height: 50, width: 50 } } = {}) {
        this.pos = pos
        this.color = color
        this.dims = dims

    }
    show() {
        fill(this.color.r, this.color.g, this.color.b)
        rect(this.pos.x, this.pos.y, this.dims.width, this.dims.height)
    }

    contains(coords) {
        return (
            coords.x > this.pos.x &&
            coords.x < this.pos.x + this.dims.width &&
            coords.y > this.pos.y &&
            coords.y < this.pos.y + this.dims.height
        )
    }
}

class DrawManager {
    constructor(dimensions = { widthIncoords: 10, heightInPixels: 10 }, canvasDim = { width: 400, height: 400 }) {
        this.dimensions = dimensions
        this.canvasDim = canvasDim
        this.cellSize = {
            x: floor(canvasDim.width / dimensions.widthInPixels),
            y: floor(canvasDim.height / dimensions.heightInPixels)
        }
    }

    drawPixels(pixels) {
        pixels.forEach(pixel => {
            const pos = this.#pixelPosToXY(pixel)
            fill(pixel.color.r, pixel.color.g, pixel.color.b,)
            rect(pos.x, pos.y, this.cellSize.x, this.cellSize.y)
        })
    }

    #pixelPosToXY(pos) {
        return { x: pos.x * this.cellSize.x, y: pos.y * this.cellSize.y }
    }
}