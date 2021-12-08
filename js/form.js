class Form {
  constructor(){
    this.entrada = createInput("nome");
    this.botao = createButton("jogar");
    this.mensagem = createElement("h3");
    this.reset = createButton("reset");
  }
  display(){
    var titulo;
    titulo = createElement("h2");
    titulo.html("Corrrida Dos Bixo");
    titulo.position(windowWidth/2-90,0);
    this.entrada.position(windowWidth/2-80,windowHeight/2-170);
    this.botao.position(windowWidth/2-20,windowHeight/2-120);
    this.reset.position(windowWidth-100,20);
    this.reset.mousePressed(()=>{
      jogador.atualizarNum(0);
      Jogador.atualizarJogadoresFim(0);
      jogo.atualizar(0);
      database.ref("todosJogadores").remove();
      document.location.reload(true);
    });
    this.botao.mousePressed(()=>{
      jogador.nome = this.entrada.value();
      this.entrada.hide();
      this.botao.hide();
      this.mensagem.html("ola "+ jogador.nome);
      this.mensagem.position(windowWidth/2-30,windowHeight/2-170);
      numJogadores++
      jogador.indice = numJogadores;
      jogador.atualizar();
      jogador.atualizarNum(numJogadores);
    });
    
  }
  esconderForm(){
    this.entrada.hide();
    this.botao.hide();
    this.mensagem.hide();
  }
}