let canvas = document.getElementById("canvas");

let sizeRange = document.getElementById("sizeRange");
let pixelOutput = document.getElementById("output");
let refreshButton = document.getElementById("refresh");

createCanvas(16); //default canvas


sizeRange.oninput = () => pixelOutput.innerHTML = sizeRange.value;


function createCanvas(size){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            let pixel = document.createElement("div");
            pixel.style.backgroundColor="white";
            pixel.style.width = `${canvas.offsetWidth / size}px`;
            pixel.style.height = `${canvas.offsetHeight / size}px`
            pixel.id = "pixel";
            pixel.addEventListener("mouseover", () => {pixel.style.backgroundColor="black"});
            canvas.append(pixel);
           
        }
    }
}




refreshButton.addEventListener("click", function () {
    
    while (canvas.firstChild) {
            canvas.removeChild(canvas.firstChild);
    }
    
    createCanvas(sizeRange.value);
});


