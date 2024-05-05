const brushColourPicker = document.getElementById("brushColourPicker");
const backgroundColourPicker = document.getElementById("bgColurPicker");
const brushSizePicker = document.getElementById("brushSize");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");

let isDrawing,
  lastX,
  lastY,
  brushColour = "#000000",
  bgColour = "#ffffff",
  brushSize;

const canvasContext = canvas.getContext("2d");

brushColourPicker.addEventListener("change", (e) => {
  canvasContext.strokeStyle = e.target.value;
  brushColour = e.target.value;
});

backgroundColourPicker.addEventListener("change", (e) => {
  canvasContext.fillStyle = e.target.value;
  bgColour = e.target.value;
  console.log(bgColour);
  canvasContext.fillRect(0, 0, 800, 500);
});

brushSizePicker.addEventListener("change", (e) => {
  brushSize = e.target.value;
  canvasContext.lineWidth = e.target.value;
});

clearButton.addEventListener("click", (e) => {
  canvasContext.fillStyle = bgColour;
  canvasContext.fillRect(0, 0, 800, 500);
});

saveButton.addEventListener("click", (e) => {
  let url = canvas.toDataURL();
  localStorage.setItem("canvasContents", url);
  let link = document.createElement("a");
  link.download = "mySignature.png";
  link.href = url;
  link.click();
});

retrieveButton.addEventListener("click", (e) => {
  let savedCanvas = localStorage.getItem("canvasContents");
  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    canvasContext.clearRect(0, 0, 800, 500);
    canvasContext.drawImage(img, 0, 0);
  }
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    canvasContext.beginPath();
    canvasContext.moveTo(lastX, lastY);
    canvasContext.lineTo(e.offsetX, e.offsetY);
    canvasContext.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});
