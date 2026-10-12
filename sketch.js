let orizzonte = 360;  // y della linea dell'orizzonte
let lunaX = 620;      // posizione della luna
let lunaY = 120;
let scalaNave = 0.9;  // quanto è grande la barca
let lineaGalleggiamento = 430; // y in cui la barca tocca l'acqua

let bluLogo;
let gialloLogo;
let bianco;

function setup() {
  createCanvas(800, 600);
  bluLogo = color(10, 63, 136);
  gialloLogo = color(242, 194, 0);
  bianco = color(248, 246, 240);
}

function draw() {
  disegnaCielo();
  disegnaStelle();
  disegnaLuna();

  disegnaMare(orizzonte);
  disegnaRiflessoLuna(orizzonte, lineaGalleggiamento);

  disegnaNave();

  // l'acqua copre il fondo dello scafo
  disegnaMare(lineaGalleggiamento + 6);
  disegnaRiflessoLuna(lineaGalleggiamento + 6, height);
}

// ---------- CIELO ----------
function disegnaCielo() {
  noStroke();
  fill(15, 20, 60);
  rect(0, 0, width, orizzonte);
}

// ---------- STELLE ----------
function disegnaStelle() {
  stroke(255);
  strokeWeight(2);
  for (let x = 20; x < width; x = x + 30) {
    for (let y = 20; y < orizzonte - 20; y = y + 25) {
      point(x + y % 30, y);
    }
  }
}

// ---------- LUNA ----------
function disegnaLuna() {
  let diametro = 70;
  noStroke();
  for (let i = 5; i > 0; i--) {
    fill(255, 240, 190, 10);
    circle(lunaX, lunaY, diametro * (1 + i * 0.35));
  }
  fill(255, 244, 205);
  circle(lunaX, lunaY, diametro);
  // qualche cratere
  fill(235, 222, 180);
  circle(lunaX - diametro * 0.18, lunaY - diametro * 0.1, diametro * 0.2);
  circle(lunaX + diametro * 0.15, lunaY + diametro * 0.18, diametro * 0.14);
  circle(lunaX + diametro * 0.2, lunaY - diametro * 0.2, diametro * 0.09);
}

// ---------- MARE ----------
function disegnaMare(yInizio) {
  noStroke();
  fill(10, 45, 100);
  rect(0, yInizio, width, height - yInizio);
}

function disegnaRiflessoLuna(yMin, yMax) {
  for (let i = 0; i < 40; i++) {
    let y = orizzonte + 4 + i * i * 0.25;

    if (y >= yMin && y <= yMax) {
      let larghezza = 10 + i * 2.5 + (i * 37) % 25;
      let spostamento = ((i * 53) % 30) - 15;
      let trasparenza = 160 - i * 3;

      // i riflessi tremolano: ogni segmento si accende e spegne a turno
      if ((frameCount + i * 7) % 30 < 15) {
        trasparenza = trasparenza * 0.5;
      }

      stroke(255, 215, 120, trasparenza);
      strokeWeight(3 + i * 0.1);
      line(lunaX - larghezza / 2 + spostamento, y, lunaX + larghezza / 2 + spostamento, y);
    }
  }
}

// BARCA A VELA
function disegnaNave() {
  // dondolio
  let ciclo = frameCount % 160;
  if (ciclo > 80) {
    ciclo = 160 - ciclo;
  }
  let dondolio = ciclo - 40;

  push();
  translate(360, lineaGalleggiamento + dondolio * 0.12);
  rotate(dondolio * 0.001);
  scale(scalaNave);

  noStroke();

  // scafo
  fill(bianco);
  quad(-160, -40, 160, -40, 120, 20, -120, 20);

  // riga blu sullo scafo
  fill(bluLogo);
  rect(-150, -34, 300, 8);

  // oblò accesi
  fill(gialloLogo);
  for (let i = 0; i < 3; i++) {
    circle(-60 + i * 60, -15, 12);
  }

  // albero
  fill(bianco);
  rect(-4, -300, 8, 262);

  // vele
  triangle(12, -290, 12, -55, 150, -55);   // vela grande
  triangle(-12, -250, -12, -55, -120, -55); // vela piccola

  // bandierina gialla in cima
  fill(gialloLogo);
  triangle(0, -300, 0, -276, -40, -288);

  pop();
}
