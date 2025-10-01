// definire variaibili dimensioni
let xMax = 400;
let yMax = 600;

let xrocket = xMax/2 //x del razzo a metà di x max
let yrocket = yMax*0.6;

function setup() {
  createCanvas(xMax, yMax); 
  // dimensione canvas
  frameRate(100)
  // indicare frame x second
}


function draw() {
  background(30,30,50);
  // colore background
  // ora voglio mostrare testo bianco che dice coordinate 
  // del mouse su foglio da disegno
  fill("coral") // colore text
  text ("mouseX: "+ mouseX + ", mouseY: " + mouseY,20,20)
  
  push ()
  // ripetiamo ciclo fino a che i è minore di 40 (partendo da 0)

  for (let i=0; i<120; i++){
    // i = 0, ripeti il ciclo finchè i<120, somma 1 dopo ogni interazione
      let starX = (i*37)  % width + (i%3)*5
      let starY = (i*73) % height + (i%7)
    // operatore modulo %
    // stella a quando i è pari
    // stella b per ogni i divisibile per 3

    if (i % 2 == 0){ //se n. iteazione diviso 2 da' resto 0 fai questo
      // stella tipo a
    fill (242, 198, 128)
    strokeWeight (0)
    ellipse (starX,starY,2)
    }
    else if (i % 3 == 0){ //se n. iterazione diviso 3 da' resto 0 fai questo
      // stella tipo b
    fill (250, 236, 210)
    strokeWeight (0)
    ellipse (starX,starY,1)
    }
    else { //in qualsiasi altro caso fai questo
          fill (250, 236, 210)
    strokeWeight (0)
    ellipse (starX,starY,4)
    }
    
  }
  
  fill (250, 236, 210)
  strokeWeight (0)
  circle ( 200,950, 900)
  
  pop ()
  
  // aprire contesto di disegno
  push()
  
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

 

  // chiudere contesto di disegno
  pop()

  //disegnare 120 stelle di tre tipi: a,b,c,
  // essenzialmente disegno fino a che non ho 120 stelle

  yrocket = (yrocket - 2);
  // quando la yrocket è oltre certa soglia, allora resettiamo y
  let soglia = - (yMax*0.5)
  if (yrocket < soglia) {
    yrocket = yMax
  }

  // push ()
  // let circleRadius = 10
  // circle (xMax/2, yMax/2, circleRadius)


  // pop ()
  


 
  


  
}
