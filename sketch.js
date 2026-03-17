let pagesArray = [];
for (let i = 1; i < 20; i++) {
    pagesArray.push("page" + i);
}

let imagesArray = []; //stores images!
let videos = {};
let activeVideoPage = null;
let videosReady = {};
let allLoaded = false;

let state = "page1"; //the starting page

function preload() {
    for (let i = 1; i < 20; i++) {
        let path = "3.16 PDF PORTFOLIO DONE" + i + ".jpg";
        let img = loadImage(path);
        imagesArray.push(img);
    }
}

function setup() {
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    createCanvas(windowWidth, windowHeight);

    // create videos for pages 13, 14, 15
    for (let i = 13; i <= 15; i++) {
        let path = "3.16 PDF PORTFOLIO DONE" + i + ".mp4";
        let vid = createVideo(path, () => {
            videosReady["page" + i] = true;
        });
        vid.hide();
        vid.volume(0);
        vid.elt.loop = true;
        vid.pause();
        videos["page" + i] = vid;
        videosReady["page" + i] = false;
    }

    let checkLoaded = setInterval(() => {
        let allVideosReady = true;
        for (let key in videosReady) {
            if (!videosReady[key]) {
                allVideosReady = false;
                break;
            }
        }

        if (imagesArray.length === 19 && allVideosReady) {
            allLoaded = true;
            clearInterval(checkLoaded);
        }
    }, 100);
}

function draw() {
    background('#fffded');

    if (!allLoaded) {
        push();
        textAlign(CENTER, CENTER);
        textSize(64);
        textFont('Helvetica');
        fill(0);
        noStroke();
        text("LOADING...", width / 2, height / 2);
        pop();
        return;
    }

    let currentPage = state;
    let img = imagesArray[pagesArray.indexOf(currentPage)];

    // always draw the jpeg page first
    let imgScale = min(width / img.width, height / img.height);
    let imgWidth = img.width * imgScale;
    let imgHeight = img.height * imgScale;
    let imgX = (width - imgWidth) / 2;
    let imgY = (height - imgHeight) / 2;

    image(img, imgX, imgY, imgWidth, imgHeight);

    // then draw the video on top for pages 13, 14, 15
    if (videos[currentPage] && videosReady[currentPage]) {
        let vid = videos[currentPage];

        if (vid.width > 0 && vid.height > 0) {
            let vidScale = min(width / vid.width, height / vid.height);
            let vidWidth = vid.width * vidScale * 0.8;
            let vidHeight = vid.height * vidScale * 0.8;
            let vidX = (width - vidWidth) / 2;
            let vidY = (height - vidHeight) / 2;

            image(vid, vidX, vidY, vidWidth, vidHeight);
        }
    }
        push();
    fill(0);
    textSize(20);
    text("CLICK!", mouseX, mouseY);
    pop();
}

function mousePressed() {
    let index = pagesArray.indexOf(state);
    index = (index + 1) % 19;
    state = pagesArray[index];

    // pause any previously active video
    if (activeVideoPage && videos[activeVideoPage]) {
        videos[activeVideoPage].pause();
        videos[activeVideoPage].time(0);
    }

    // start the new page's video if it has one
    if (videos[state] && videosReady[state]) {
        videos[state].time(0);
        videos[state].play();
        activeVideoPage = state;
    } else {
        activeVideoPage = null;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}