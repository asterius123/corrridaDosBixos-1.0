var database;
var jogo , form, jogador;
var estadojogo = 0;
var numJogadores ;
var todosJogadores;
var car1, car2, car3, car4;
var carros;
var mg1, mg2, mg3, mg4, seta, pista;
var rank = 0;
var resultado = false;

function preload() {
  mg1 = loadImage("sprite/elephante.png");
  mg2 = loadImage("sprite/croco.png");
  mg3 = loadImage("sprite/leao.png");
  mg4 = loadImage("sprite/lobo.png");
  seta = loadImage("sprite/up1.png");
  pista = loadImage("sprite/track.jpg");

}
function setup() {
  database = firebase.database();
  createCanvas(displayWidth-20, displayHeight-120);
  jogo= new Jogo();
  jogo.lerEstado();
  jogo.start();
}

function draw() {
  if (numJogadores >= 4 && estadojogo === 0 ) {
    jogo.atualizar(1);
  }
  if (estadojogo === 1) {
    clear();
    jogo.play();
    
  }
  if (estadojogo === 2) {
    jogo.end();
    if (jogador.rank === 4) {
      jogo.resultados();
    }
  }
}