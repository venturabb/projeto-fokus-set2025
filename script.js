// variáveis globais da página
const html = document.querySelector("html");
const imagemBanner = document.querySelector(".app__image");
const textoDestaque = document.querySelector(".app__title");

// botões acima do timer
const botaoFoco = document.querySelector(".app__card-button--foco");
const botaoDescansoCurto = document.querySelector(".app__card-button--curto");
const botaoDescansoLongo = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");

// variáveis do timer
/// botão (mais texto e imagem) que liga e desliga o timer
const textoBotaoIniciarPausar = document.querySelector("#start-pause span");
const imagemBotaoIniciarPausar = document.querySelector(".app__card-primary-button-icon");
const botaoComecarPausar = document.querySelector("#start-pause");

/// interface do timer
const relogioTimer = document.querySelector(".app__card-timer");

/// intervalos de tempo em segundos e variáveis auxiliares
const tempoFoco = 25 * 60;
// const tempoDescansoCurto = 5 * 60;
const tempoDescansoCurto = 5;
const tempoDescansoLongo = 15 * 60;
let tempoDecorrido = tempoFoco;
let intervalo = null;

// sons e controles de música
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const somIniciar = new Audio("/sons/play.wav");
const somPausar = new Audio("/sons/pause.mp3");
const somBeep = new Audio("/sons/beep.mp3");

const botaoMusica = document.querySelector("#alternar-musica");
let podeTocarMusica = botaoMusica.checked;

// controla música de fundo
musica.loop = true;

botaoMusica.addEventListener("change", () => {
  if (botaoMusica.checked && intervalo) {
    podeTocarMusica = true;
    tocarMusica();
  } else {
    podeTocarMusica = false;
    pararMusica();
  }
});

function tocarMusica() {
  if (podeTocarMusica) {
    musica.play();
  } else {
    pararMusica();
  }
}

function pausarMusica() {
  if (podeTocarMusica) {
    musica.pause();
  } else {
    pararMusica();
  }
}

function pararMusica() {
  musica.pause();
  musica.currentTime = 0;
}

// alterna imagem de fundo e texto de destaque, zera timer e configura duração do timer
botaoFoco.addEventListener("click", () => {
  zerarTimer();
  tempoDecorrido = tempoFoco;
  mostrarTimer();
  alterarContexto("foco");
  botaoFoco.classList.add("active");
});

botaoDescansoCurto.addEventListener("click", () => {
  zerarTimer();
  tempoDecorrido = tempoDescansoCurto;
  mostrarTimer();
  alterarContexto("descanso-curto");
  botaoDescansoCurto.classList.add("active");
});

botaoDescansoLongo.addEventListener("click", () => {
  zerarTimer();
  tempoDecorrido = tempoDescansoLongo;
  mostrarTimer();
  alterarContexto("descanso-longo");
  botaoDescansoLongo.classList.add("active");
});

function alterarContexto(contexto) {
  botoes.forEach((contexto) => {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  imagemBanner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      textoDestaque.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      pararMusica();
      break;

    case "descanso-curto":
      textoDestaque.innerHTML = `Que tal dar uma respirada?<br />
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      pararMusica();
      break;

    case "descanso-longo":
      textoDestaque.innerHTML = `Hora de voltar à superfície.<br />
          <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      pararMusica();
      break;

    default:
      break;
  }
}

// funções relacionadas ao timer
const contagemRegressiva = () => {
  if (tempoDecorrido == 0) {
    pararMusica();
    somBeep.play();
    alert("Tempo esgotado!");
    zerarTimer();
    somBeep.pause();
    return;
  }

  tempoDecorrido -= 1;
  console.log("Temporizador: " + tempoDecorrido);

  mostrarTimer();
};

botaoComecarPausar.addEventListener("click", iniciarOuPausarTimer);

function iniciarOuPausarTimer() {
  if (intervalo) {
    zerarTimer();
    somPausar.play();
    pausarMusica();
    return;
  }
  somIniciar.play();
  intervalo = setInterval(contagemRegressiva, 1000);
  imagemBotaoIniciarPausar.setAttribute("src", "./imagens/pause.png");
  textoBotaoIniciarPausar.textContent = "Pausar";

  if (botaoMusica.checked) {
    tocarMusica();
  }
}

function zerarTimer() {
  clearInterval(intervalo);
  // textoBotaoIniciarPausar.textContent = "Começar";
  imagemBotaoIniciarPausar.setAttribute("src", "./imagens/play_arrow.png");
  textoBotaoIniciarPausar.innerHTML = "<span style='font-weight: bold;'>Começar</span>";
  intervalo = null;
}

function mostrarTimer() {
  const tempo = new Date(tempoDecorrido * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", { minute: "2-digit", second: "2-digit" });
  relogioTimer.innerHTML = `${tempoFormatado}`;
}

mostrarTimer();
