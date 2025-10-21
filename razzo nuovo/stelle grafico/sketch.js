let tabella;
let dati = [];

function preload() {
  // Carica il file CSV
  // Sostituisci 'dati.csv' con il percorso del tuo file
  tabella = loadTable('dataset.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 600);
  
  // Estrai i dati da una colonna specifica
  // Sostituisci 'valore' con il nome della tua colonna
  for (let i = 0; i < tabella.getRowCount(); i++) {
    let valore = tabella.getNum(i, 'valore'); // o tabella.getNum(i, 0) per la prima colonna
    dati.push(valore);
  }
  
  // Ordina i dati dal più piccolo al più grande
  dati.sort((a, b) => a - b);
  
  // Trova min e max per il mapping
  let minValore = min(dati);
  let maxValore = max(dati);
  
  background(240);
  
  // Margini
  let margineX = 60;
  let margineY = 40;
  
  // Disegna gli assi
  stroke(0);
  strokeWeight(2);
  line(margineX, height - margineY, width - 20, height - margineY); // asse X
  line(margineX, margineY, margineX, height - margineY); // asse Y
  
  // Etichette assi
  noStroke();
  fill(0);
  textAlign(CENTER);
  text("Indice (ordinato)", width / 2, height - 10);
  
  push();
  translate(15, height / 2);
  rotate(-PI / 2);
  text("Valore", 0, 0);
  pop();
  
  // Calcola la spaziatura tra i cerchi
  let larghezzaGrafico = width - margineX - 20;
  let altezzaGrafico = height - 2 * margineY;
  let spaziatura = larghezzaGrafico / (dati.length + 1);
  
  // Disegna i cerchi
  for (let i = 0; i < dati.length; i++) {
    let valore = dati[i];
    
    // Posizione x distribuita uniformemente
    let x = margineX + spaziatura * (i + 1);
    
    // Posizione y mappata al valore (invertita perché y cresce verso il basso)
    let y = map(valore, minValore, maxValore, height - margineY, margineY);
    
    // Raggio proporzionale al valore
    let raggio = map(valore, minValore, maxValore, 8, 40);
    
    // Colore sfumato in base al valore
    let colore = map(valore, minValore, maxValore, 0, 255);
    fill(colore, 100, 255 - colore, 180);
    stroke(0);
    strokeWeight(1);
    
    // Disegna il cerchio
    circle(x, y, raggio * 2);
    
    // Etichetta con il valore
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(valore, x, y);
  }
  
  // Legenda
  fill(0);
  textAlign(LEFT);
  textSize(12);
  text("Dimensione cerchio ∝ valore", margineX, 20);
}

function draw() {
  // Statico, niente animazione
}