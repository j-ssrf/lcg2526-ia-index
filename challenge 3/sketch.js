let centroX, centroY;
let numeroRaggi = 36; // n. di raggi che voglio, 36 così 1 ogni 10 gradi
let raggi = [];
let lunghezzaMinima = 150; // lunghezza min e max raggi
let lunghezzaMassima = 350;
let animazioneAttiva = true; // di base l'animazione funzia

function setup () {
  createCanvas(windowWidth, windowHeight);

  // calcolo centro generale canvas
  centroX = width / 2;
  centroY = height / 2;

  // ciclo x disegnare raggi
  for (let i = 0; i < numeroRaggi; i++) {
     raggi.push({ // pusho nell'array dei raggi
      angolo: (TWO_PI / numeroRaggi) * i, 
      // angolo del raggio è cerchio diviso n. raggi per n. raggio ora disegnato
      lunghezza: lunghezzaMinima
    });
  }
}


function draw() {
    background(245, 242, 220);
  
  // TROVARE QUALE RAGGIO è SOTTI IL MOUSE


  let raggioHover = -1;
    // di preset voglio che nessun raggio sia nella mod. hover,
    // quindi scelgo un numero di raggio che non esiste
  let distanzaCentro = dist(mouseX, mouseY, centroX, centroY);
    // calcolo distanza del mouse dal centro

  if (distanzaCentro < lunghezzaMassima && !animazioneAttiva) {
    // se questa distanza è minore E l'animazione è disattiva (! significa NO), 
    // allora: 
    let angoloMouse = atan2(mouseY - centroY, mouseX - centroX) 
    // arcotangente (2 pk sto tenendo in consid. 4 quadranti e non 2) per
    // trovare a che angolo rispetto al centro si trova il mouse
    // dal momento che atan2 ci da' angoli tra -pi e +pi e noi li vogliamo tra 0 e 2pi
    // se angolo è negativo gli aggiungo un cerchio completo
    if (angoloMouse < 0) angoloMouse += TWO_PI;

    let differenzaMinima = TWO_PI; // differenza minima iniziale, 
    // devo essere sicura è più grande tutte prossime differenze che troverò

    for (let i = 0; i < numeroRaggi; i++) {
      // ripeti ciclo per tutti i raggi
      let differenza = abs(angoloMouse - raggi[i].angolo);
        // differenza tra angolo mouse e angolo di ogni raggio (pk li scorre tutti)
      if (differenza > PI) differenza = TWO_PI - differenza;
        // devo geristre "wraparound", se la distanza è più di 180° allora cambio verso in cui misurarla

      if (differenza < differenzaMinima) {
        differenzaMinima = differenza;
        raggioHover = i;
        // se differenza è minore di differenzaMinima (che inizialmente è 2pi)
        // allora differenza minima diventa differenza e memorizzo quale raggio è
       }
    }

  }


}
