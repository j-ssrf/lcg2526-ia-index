let xMax = 500;
let yMax = 600;
let angoloRot = -0.3;
let cx = xMax/2;   // centro X del semicerchio
let cy = yMax-290; // centro Y del semicerchio
let puntoX = cx; // coordinata X del centro di rotazione
let puntoY = cy; // coordinata Y del centro di rotazione
let angoloBase = 0.2; // angolo iniziale del cavallo a riposo
let ampiezzaDondolo = 0.3; // quanto oscilla in radianti
let velocitaDondolo = 0.03; // velocità dell'oscillazione
let t = 0; // contatore tempo

function setup() {
  createCanvas(xMax, yMax);
}

function draw() {
  push ()
  background(252, 252, 220);
  noStroke ();
  
  // --- dove sta il mouse ---
  //  fill("coral") // colore text
  // text ("mouseX: "+ mouseX + ", mouseY: " + mouseY,20,20)


  // -- Animazione dondoloo --
  let angoloDondolo = angoloBase + sin(t) * ampiezzaDondolo;
  t += velocitaDondolo;

  push();
  translate(puntoX, puntoY);  // vai al centro di rotazione
  rotate(angoloDondolo);       // ruota
  translate(-puntoX, -puntoY); // torna alla posizione originale
  
  // FUNZIONAAAAAAAAAAAA

  // --- Base semicircolare (parte del dondolo) ---
  push ()
  translate (cx, cy)
  rotate (angoloRot)

  fill(50, 100, 180); // blu
  arc(0, 0, 300, 300, TWO_PI, PI, PIE);
  
  // fill(50, 150, 70); // verde
  // arc(0, 0, 300, 300,  PI - QUARTER_PI, PI, PIE);
  pop ()

  // --- Overlay giallo ---
  push ()
  translate (cx - 19, cy - 30)
  rotate (angoloRot - 0.25)
  blendMode (DARKEST)
  fill(255, 210, 0); // blu
  arc(0, 0, 290, 290, TWO_PI, PI, PIE);
  pop ()

  // --- Criniera ---
  push ()
  translate (cx + 30, cy - 200);
  rotate (angoloRot - 1.2)
  fill(255, 210, 0);
  arc(0, 0, 170, 170, PI, TWO_PI, PIE);
  pop()
 
  // --- Collo ---
  push ()
  translate (cx + 25, cy - 195);
  rotate (angoloRot -3.3)
  fill(240, 60, 40);
  arc(0, 0, 120, 120, 0, HALF_PI, PIE, PIE);
  pop() 

  // --- Corpo del cavallo ---
  push();
  translate (cx -35, cy - 100)
  rotate (angoloRot -0.15);

  fill(240, 60, 40); // rosso
  rectMode(CENTER);
  rect(0, 0, 190, 100, 2);

  fill(255, 120, 0, 80);
  ellipse(-40, 0, 50, 50);
  ellipse(40, 0, 50, 50);
  pop();

  // --- Testa ---
  push();
  translate (cx + 25, cy - 275);
  rotate (angoloRot - 5.3);

  fill(240, 60, 40);
  rect(0, 0, 80, 35, 0);

  fill(0);
  ellipse(22, 15, 10, 10); // occhio
  pop();


  // --- Coda ---
  push ()
  translate (cx - 142, cy - 105);
  rotate (angoloRot + 1.8);
  fill(255, 210, 0);
  arc(0, 0, 220, 220, radians(0), radians(35), PIE); // coda
  pop ()

  
  // --- Gambe ---
  push();
  blendMode (DARKEST)
  translate (cx - 75, cy + 57);
  rotate (angoloRot + 3.55);

  fill(240, 60, 40);
  rect(0, 0, 30, 68);
  pop();

  push();
  translate (cx +117, cy - 45);
  rotate (angoloRot + 2.7);

  fill(240, 60, 40);
  rect(0, 0, 30, 68);
  pop();

  // --- Bocca ---
  translate (cx + 102, cy - 204)
  fill (252, 252, 220)
  ellipse(-40, 0, 15, 15)

  pop ()
  

  // --- Testo ---
  push ()
  fill(240, 60, 40) // colore text
  textSize(28)
  textFont ('Georgia')
  textStyle (ITALIC)
  text ("Rodo the rocking horse",cx-142,cy+200)
  pop ()

  push ()

  fill(240, 60, 40) // colore text
  textSize(8)
  textFont ('Arial')
  text ("ILLUSTRAZIONE DALL'ALBO ILLUSTRATO",cx-78,cy+227)
  textStyle (ITALIC)
  text ("TONDO TONDO E QUADRATO, FREDUN SHAPUR, TOPI PITTORI, 2015",cx-129,cy+236.5)

  pop ()
  
  // --- Sottolineatura ---
  push ()
  fill (240, 60, 40)
  rectMode (CENTER)
  rect (xMax/2,cy+212,300,1.5,3)
  pop ()
}
