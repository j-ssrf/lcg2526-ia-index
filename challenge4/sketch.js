// Visualizzazione Dati Droni - Laboratorio Design Information
// Grafico che mostra la variazione della posizione X nel tempo

let droni = [];
let stepMassimi = 0;

// Nomi e colori dei droni
const nomiDroni = ['Alfa', 'Bravo', 'Charlie'];
const coloriDroni = [
  '#d17089',  // Rosa
  '#cbd183',  // Verde oliva
  '#d8660e'   // Arancione
];

let tabellaAlfa, tabellaBravo, tabellaCharlie;

function preload() {
  // Carico i 3 file CSV con i dati dei droni
  console.log("Caricamento dati...");
  tabellaAlfa = loadTable('drone_alfa_data.csv', 'csv', 'header');
  tabellaBravo = loadTable('drone_bravo_data.csv', 'csv', 'header');
  tabellaCharlie = loadTable('drone_charlie_data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1400, 1600);
  
  // Creo array con tutti i droni e le loro tabelle
  droni.push({ nome: nomiDroni[0], colore: coloriDroni[0], tabella: tabellaAlfa });
  droni.push({ nome: nomiDroni[1], colore: coloriDroni[1], tabella: tabellaBravo });
  droni.push({ nome: nomiDroni[2], colore: coloriDroni[2], tabella: tabellaCharlie });
  
  // Trovo il numero massimo di step tra tutti i droni
  for (let drone of droni) {
    if (drone.tabella.getRowCount() > stepMassimi) {
      stepMassimi = drone.tabella.getRowCount();
    }
  }
  
  // Disegno una volta sola perchè è un grafico statico
  noLoop();
}

function draw() {
  background(255); // Sfondo bianco
  
  // Titolo principale in alto a sinistra
  fill(0);
  textFont('Arial');
  textSize(70);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("variazione nel tempo dei parametri", 80, 50);
  
  // Sottotitolo
  textSize(16);
  textStyle(BOLD);
  fill(100);
  text("POSIZIONE X", 80, 210);
  
  // Disegno il grafico x
  disegnaGrafico(80, 230, width - 160, 400, "x_pos")

  // Sottotitolo
  textSize(16);
  textStyle(BOLD);
  fill(100);
  text("POSIZIONE Y", 80, 210+460);

  // disegno grafico y
  disegnaGrafico(80, 230+460, width - 160, 400, "y_pos")

  // Sottotitolo
  textSize(16);
  textStyle(BOLD);
  fill(100);
  text("POSIZIONE Z", 80, 210+460*2);

  // disegno grafico y
  disegnaGrafico(80, 230+460*2, width - 160, 400, "z_pos")

  
  // Disegno la leggenda
  disegnaLegenda();
}

function disegnaGrafico(x, y, larghezza, altezza, parametro) {
  // Questa funzione disegna il grafico vero e proprio
  // x, y sono le coordinate dell'angolo in alto a sinistra del grafico
  // larghezza e altezza sono le dimensioni del grafico
  // parametro è il nome della colonna da visualizzare (es. "x_pos")
  
  push();
  translate(x, y);
  
  // Box del grafico - bianco con bordo nero
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(0, 0, larghezza, altezza); // Rettangolo con angoli acuti
  
  // Calcolo i margini interni del grafico
  let margine = 60;
  let margineSinistro = 80; // Margine sinistro più grande per i numeri lunghi
  let larghezzaGrafico = larghezza - margineSinistro - margine;
  let altezzaGrafico = altezza - margine * 2;
  
  // Trovo il valore minimo e massimo del parametro tra tutti i droni
  // in modo da sapere che scala usare per il grafico
  let valoreMinimo = Infinity;
  let valoreMassimo = -Infinity;
  
  // Scorro tutti i droni
  for (let drone of droni) {
    // Per ogni drone scorro tutte le righe della sua tabella
    for (let i = 0; i < drone.tabella.getRowCount(); i++) {
      // Prendo il valore dalla tabella usando getNum()
      let valore = drone.tabella.getNum(i, parametro);
      if (valore < valoreMinimo) valoreMinimo = valore;
      if (valore > valoreMassimo) valoreMassimo = valore;
    }
  }
  
  // Aggiungo un po' di padding ai valori per non far toccare le linee ai bordi
  let intervallo = valoreMassimo - valoreMinimo;
  valoreMinimo -= intervallo * 0.05;
  valoreMassimo += intervallo * 0.05;
  
  // GRIGLIA DI SFONDO
  stroke(230);
  strokeWeight(1);
  
  // Linee orizzontali della griglia
  for (let i = 0; i <= 5; i++) {
    let posizioneY = map(i, 0, 5, altezza - margine, margine);
    line(margineSinistro, posizioneY, larghezza - margine, posizioneY);
  }
  
  // Linee verticali della griglia
  for (let i = 0; i <= 10; i++) {
    let posizioneX = map(i, 0, 10, margineSinistro, larghezza - margine);
    line(posizioneX, margine, posizioneX, altezza - margine);
  }
  
  // ASSI PRINCIPALI
  stroke(0);
  strokeWeight(2);
  // Asse X orizzontale in basso
  line(margineSinistro, altezza - margine, larghezza - margine, altezza - margine);
  // Asse Y verticale a sinistra
  line(margineSinistro, margine, margineSinistro, altezza - margine);
  
  // LABELS DEGLI ASSI
  noStroke(); // Importante: rimuovo lo stroke dal testo altrimenti viene brutto
  fill(0);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("STEPS", larghezza- margine-15, altezza - margine + 25);
  
  // Label asse Y (ruotato di 90 gradi)
  push();
  translate(25, altezza / 2);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("POSITION ", 115, 0);
  pop();
  
  // VALORI NUMERICI SULL'ASSE Y
  textSize(11);
  textStyle(NORMAL);
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 5; i++) {
    // Calcolo il valore corrispondente...
    // (mappo su intervallo 0-5 tutti valori tabella, poi stessa cosa con sua altezza)
    let valore = map(i, 0, 5, valoreMinimo, valoreMassimo);
    // a questa position
    let posizioneY = map(i, 0, 5, altezza - margine, margine);
    // Mostro il valore con 3 cifre dopo la virgola
    text(valore.toFixed(3), margineSinistro - 10, posizioneY);
  }
  
  // VALORI NUMERICI SULL'ASSE X
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 10; i++) {
    // Calcolo quale step corrisponde a questa posizione
    let valoreStep = map(i, 0, 10, 0, stepMassimi);
    let posizioneX = map(i, 0, 10, margineSinistro, larghezza - margine);
    // Arrotondo il numero degli step perchè devono essere interi
    text(floor(valoreStep), posizioneX, altezza - margine + 5);
  }
  
  // DISEGNO LE LINEE DEI DATI PER OGNI DRONE
  for (let drone of droni) {
    stroke(drone.colore);
    strokeWeight(3);
    noFill();
    
    // beginshape mi permette disegnare una forma che passa per determinati punti vertex
    beginShape();
    // Scorro tutte le righe della tabella del drone
    for (let i = 0; i < drone.tabella.getRowCount(); i++) {
      // Prendo i n.step e valre di determinato parametro dalla tabella 
      let valoreStep = drone.tabella.getNum(i, 'steps');
      let valorePosizione = drone.tabella.getNum(i, parametro);
      
      // Converto il valore dello step in una posizione X sul grafico
      let posizioneX = map(valoreStep, 0, stepMassimi, margineSinistro, larghezza - margine);
      // Converto il valore del parametro in una posizione Y sul grafico
      let posizioneY = map(valorePosizione, valoreMinimo, valoreMassimo, altezza - margine, margine);
      
      vertex(posizioneX, posizioneY);
    }
    endShape();
  }
  
  pop();
}

function disegnaLegenda() {
  // Disegno la leggenda in basso con i nomi e colori dei droni
  let posizioneY = 160;
  let posizioneX = 80;
  
  for (let i = 0; i < droni.length; i++) {
    let x = posizioneX + i * 200;
    let drone = droni[i];
    
    // Linea colorata che rappresenta il drone
    stroke(drone.colore);
    strokeWeight(4);
    line(x, posizioneY, x + 50, posizioneY);
    
    // Nome del drone
    fill(0);
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text(`DRONE ${drone.nome.toUpperCase()}`, x + 65, posizioneY);
  }
}
