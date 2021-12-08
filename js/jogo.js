class Jogo {
  constructor(){}

  lerEstado(){
    var estado = database.ref("estadojogo")
    estado.on("value",function(data) {
      estadojogo=data.val()
    });
    
  }
  atualizar(estadojogo){
    database.ref("/").update({
      estadojogo: estadojogo
    });
  }
  async start(){
    if (estadojogo === 0) {
      jogador=new Jogador();
      var refnumjogadores = await database.ref("jogadores").once("value")
      if (refnumjogadores.exists()) {
        numJogadores = refnumjogadores.val()
        jogador.lerNum();
      }
      
      form=new Form();
      form.display();
    }
    car1 = createSprite(300,200);
    car2 = createSprite(500,200);
    car3 = createSprite(700,200);
    car4 = createSprite(900,200);
    car1.addImage(mg1);
    car2.addImage(mg2);
    car3.addImage(mg3);
    car4.addImage(mg4);
    carros = [car1,car2,car3,car4];

  }
  play(){
    background(50,205,50);
    image(pista,0,-displayHeight*4,displayWidth,displayHeight*5);
    drawSprites();
    console.log("play")
    form.esconderForm();
    Jogador.lerJogadores();
    jogador.lerJogadorFim();
    if (todosJogadores!== undefined ) {
      console.log("if")
      var indice = 0;
      var x = 160;
      var y 
      for (var jgdr in todosJogadores) {
       indice+=1
       x += 210
       y = displayHeight/2-todosJogadores[jgdr].distancia;
       carros[indice-1].x = x;
       carros[indice-1].y = y;
       console.log(carros[indice-1]);
       console.log(carros[indice-1].y);
       if (indice === jogador.indice) {
         imageMode(CENTER);
         image(seta, x, y+140, 50, 20);
         carros[indice-1].shapeColor="red"
         camera.position.x = displayWidth/2
         camera.position.y = carros[indice-1].y
         
       }
      }
      if (keyDown ("UP")&& jogador.indice!== null ) {
        jogador.distancia+= 50
        if (jogador.distancia > 3400) {
          jogador.distancia = 3400;
        }
        jogador.atualizar();
      }
      if (keyDown ("DOWN")&& jogador.indice!== null ) {
        jogador.distancia-= 50
        if (jogador.distancia < -100) {
          jogador.distancia = -100;
        }
        jogador.atualizar();
      }
    }
  if (jogador.distancia === 3400) {
      jogador.rank += 1;
      jogador.atualizar();
      Jogador.atualizarJogadoresFim(jogador.rank);
      estadojogo = 2;      
  }
  }
  end(){
    background(50,205,50);
    image(pista,0,-displayHeight*4,displayWidth,displayHeight*5);
    drawSprites();
    console.log("fim");
    console.log(jogador.rank);
    Jogador.lerJogadores();
    jogador.lerJogadorFim();
    var indice = 0;
    var x = 160;
    var y 
    for (var jgdr in todosJogadores) {
      indice+=1
      x += 210
      y = displayHeight/2-todosJogadores[jgdr].distancia;
      carros[indice-1].x = x;
      carros[indice-1].y = y;
      console.log(carros[indice-1]);
      console.log(carros[indice-1].y);
      textAlign("Center");
      text(todosJogadores[jgdr].nome, x-20, y-100);
     }
  }
  resultados(){
    background(255);
    if (resultado === false) {
      for (var jgdr in todosJogadores) {
        if (todosJogadores[jgdr].rank === 1 ) {
          var primeiro = createElement("h1",todosJogadores[jgdr].rank + "º lugar: "+ jogador.nome)
          primeiro.position(width/2-90,height/2-125);
        }
        if (todosJogadores[jgdr].rank === 2 ) {
          var primeiro = createElement("h1",todosJogadores[jgdr].rank + "º lugar: "+ jogador.nome)
          primeiro.position(width/2-90,height/2-100);
        }
        if (todosJogadores[jgdr].rank === 3 ) {
          var primeiro = createElement("h1",todosJogadores[jgdr].rank + "º lugar: "+ jogador.nome)
          primeiro.position(width/2-90,height/2-75);
        }
        if (todosJogadores[jgdr].rank === 4 ) {
          var primeiro = createElement("h1",todosJogadores[jgdr].rank + "º lugar: "+ jogador.nome)
          primeiro.position(width/2-90,height/2-50);
        }
       }
    }
    resultado = true;
  }
}