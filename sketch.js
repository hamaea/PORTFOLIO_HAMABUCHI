let pagesArray = [];
for (let i = 1; i <= 19; i++) {
  pagesArray.push("page" + i);
}

let imagesArray = []; //stores images!

let state = "page1"; //the starting page

function preload() {
  for (let i = 1; i <= 19; i++) {
    let path = "3.16 PDF PORTFOLIO DONE" + i + ".jpg";
    let img = loadImage(path);
    imagesArray.push(img);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#fffded');
  image(imagesArray[pagesArray.indexOf(state)], 0, 0);
}

function mousePressed() {
  let index = pagesArray.indexOf(state);
  index = (index + 1) % 19;
  state = pagesArray[index];
}