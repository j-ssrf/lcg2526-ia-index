// definire variaibili dimensioni
let xMax = 400;
let yMax = 600;
let xrocket = xMax/2 //x del razzo a metà di x max
let yrocket = yMax*0.6;

let table
let starImage 

function preload () {
  table = loadTable("stars.csv","csv","header");
  starImage = loadImage("star.png");
}

function setup() {
  // avviata una singola volta all'inizio
  createCanvas(xMax, yMax); 
  // dimensione canvas
  frameRate(100)
  // indicare frame x second
}

function drawSingleStarFromFile (index, posX, posY){
  let starSize = table.getNum(index, "starSize")
  // vai a prendere dalla tabella la riga in 
  // posizione index e la colonna starSize

  blendMode (REMOVE)
  image(starImage, posX, posY, starSize, starSize)

  blendMode(BLEND)
}

function drawStarsFromFile () {
  for ( let k = 0; k < table.getRowCount(); k++ ) {
      let starX = (k*37)  % width + (k%2) * 5; 
      let starY = (k*73) % height + (k%7)
      
      random_size = random(0, 1)
      random_transparency = (0,100)

  drawSingleStarFromFile (k, starX, starY)
  }
}



function drawStar(i, starX, starY,random_size, random_transparency) {
  
    // operatore modulo %
    // stella a quando i è pari
    // stella b per ogni i divisibile per 3

    if (i % 2 == 0){ //se n. iteazione diviso 2 da' resto 0 fai questo
      // stella tipo a
    fill (242, 198, 128)
    strokeWeight (0)
    ellipse (starX,starY,random_size)
    }
    else if (i % 3 == 0){ //se n. iterazione diviso 3 da' resto 0 fai questo
      // stella tipo b
    fill (250, 236, 210)
    strokeWeight (0)
    ellipse (starX,starY,1)
    }
    else { //in qualsiasi altro caso fai questo
          fill (250, 236, 210,random_transparency)
    strokeWeight (0)
    ellipse (starX,starY,4)
    }
}


function drawStars (num_stars=120) { 
  //--> (parametro=...) significa che di 
  // default è così, se inserito cambia
  for (let i=0; i< num_stars;i++) {
    let starX = (i*37)  % width + (i%3)*5
      let starY = (i*73) % height + (i%7)
      random_size = random(0, 6)
      random_transparency = random(100,200)

      drawStar (i, starX, starY,random_size, random_transparency)
  }
}

function drawRocket (xrocket,yrocket) {

  fill(224, 206, 200)
  stroke (224, 206, 200)
  rectMode (CENTER)
  rect(xrocket,yrocket,100,200,20)
  

  strokeWeight (5)
  fill (176, 209, 200)
  stroke (300, 209, 200)
  circle (xrocket, yrocket, 50)

  
  fill (242, 142, 128)
  stroke (242, 142, 128)
  strokeWeight (10)
  triangle (xrocket-50,yrocket-90,xrocket,yrocket-155,xrocket+50,yrocket-90)

  strokeWeight (0)
  triangle (xrocket-50,yrocket+40,xrocket-90,yrocket+40,xrocket-50,yrocket-25)

  triangle (xrocket+50,yrocket+40,xrocket+90,yrocket+40,xrocket+50,yrocket-25)

  fill (242, 198, 128)
  rect (xrocket,yrocket+125,60,20,20)
  rect (xrocket,yrocket+150,50,18,18)
  rect (xrocket,yrocket+173,40,16,16)


}



function draw() {
  //eseguita ad ogni ciclo in base a framerate
  background(30,30,50);
  // colore background
  // ora voglio mostrare testo bianco che dice coordinate 
  // del mouse su foglio da disegno
  fill("coral") // colore text
  text ("mouseX: "+ mouseX + ", mouseY: " + mouseY,20,20)
  
  // for (let i=0; i<120; i++){
  //   // i = 0, ripeti il ciclo finchè i<120, somma 1 dopo ogni interazione
  //     let starX = (i*37)  % width + (i%3)*5
  //     let starY = (i*73) % height + (i%7)
  //     random_size = random(0, 6)
  //     random_transparency = (100,200)

  //   drawStar(i, starX, starY, random_size, random_transparency)
  // }



  drawStarsFromFile ();

  drawRocket (xrocket,yrocket);

  
  push () 
  // --- Pianeta ---
  fill (250, 236, 210)
  strokeWeight (0)
  circle ( 200,850,900)
  pop ()
  
  // aprire contesto di disegno
  push()
  
  // chiudere contesto di disegno
  pop()

  //disegnare 120 stelle di tre tipi: a,b,c,
  // essenzialmente disegno fino a che non ho 120 stelle

  // yrocket = (yrocket - 6);
  // // quando la yrocket è oltre certa soglia, allora resettiamo y
  // let soglia = - (yMax*0.5)
  // if (yrocket < soglia) {
  //   yrocket = yMax
  // }

  yrocket = moveRocket (xrocket, yrocket, step=6)
  
}

function moveRocket (xrocket, yrocket, step=6){
  yrocket= (yrocket - step)
  let soglia = - (yMax*0.5)
  if (yrocket < soglia) {
  yrocket = yMax}

  return yrocket
  // voglio che nella funzione principale vengano scritti nuovi valori
}
