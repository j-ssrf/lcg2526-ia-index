function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function mousePressed () {
  // se fermiamo l'animazione o la faciamo ripartire se clicchiamo )
  if(isLooping) {
    noLoop
  } else {
    loop
  }
}