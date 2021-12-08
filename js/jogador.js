class Jogador{
  constructor(){
    this.indice = null;
    this.distancia = 0;
    this.nome = null;
    this.rank = 0
  }
  lerNum(){
    var refNum = database.ref("jogadores");
    refNum.on("value",function(data){
      numJogadores = data.val()
    });
  }
  atualizarNum(num){
    database.ref("/").update({
      jogadores: num
    })
  }
  atualizar(){
    var indiceJogador= "todosJogadores/jogador"+this.indice
    database.ref(indiceJogador).set({
      nome: this.nome,
      distancia: this.distancia,
      rank: this.rank
    })
  }
  lerJogadorFim(){
    database.ref("jogadorFim").on("value",function(data) {
      rank = data.val();
    })
    this.rank = rank;

  }
  static atualizarJogadoresFim(num){
    database.ref("/").update({
      jogadorFim: num
    })
  }
  static lerJogadores(){
    var infoJogadores = database.ref("todosJogadores");
    infoJogadores.on("value",function(data) {
      todosJogadores = data.val();
    });
  }
}