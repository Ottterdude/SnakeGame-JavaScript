var stage = document.getElementById("stage");
var ctx = stage.getContext("2d");

document.addEventListener("keydown", keyPush); //identificar de alguma tecla foi pressionada
setInterval(game, 60); //frames

var btnI = document.getElementById("I");
var btnG = document.getElementById("G");
var btnM = document.getElementById("M");
var btnMORTE = document.getElementById("MORTE");
var btnPT = document.getElementById("PT");
var btnPB = document.getElementById("PB");
var btnPM = document.getElementById("PM");

var gravity = false;
var movlivre = false;
var debug = false;
var morteLivre = true;
var cabeca = "blue";
var parTeleporte = true;
var parMorte = false;
var parBorracha = false;

const vel = 1;

var vx = (vy = 0); //velocidade do player
var px = (py = 10); //posição do player
var tq = 20; //tamanho dos quadrados
var nq = 30; //numero de quadrados
var mx = (my = 20); //posição das maças
var grv = 1;

var margem = 0;

var trail = [];
tail = 5;

function game() {
  // movimentação
  if (gravity) {
    vy += 0.1;
  }
  px += vx;
  py += vy;
  //fim

  // usado para ir da borda esquerda para direita e vice-versa
  if (parTeleporte) {
    if (px < 0) {
      //esquerda
      px = nq - 1; //para direira
    }

    if (px > nq - 1) {
      //direita
      px = 0; //para esquerda
    }

    if (py < 0) {
      //cimaa
      py = nq - 1; //para baixo
    }

    if (py > nq - 1) {
      //baixo
      py = 0; //para cima
    }
  } else if (parBorracha) {
    if (px < 0) {
      //esquerda
      vx *= -1; //para direira
    }

    if (px > nq - 1) {
      //direita
      vx *= -1; //para esquerda
    }

    if (py < 0) {
      //cimaa
      vy *= -1; //para baixo
    }

    if (py > nq - 1) {
      //baixo
      vy *= -1; //para cima
    }
  } else if (parMorte) {
    if (px < 0 || px >= nq || py < 0 || py >= nq) {
      vx = vy = 0;
      if (tail > 5) {
        alert("GAME OVER");
      }
      tail = 5;
    }
  } else {
    parTeleporte = true;
  }
  //fim

  //pintar a tela
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, stage.width, stage.height);
  //fim

  //pintar maça
  ctx.fillStyle = "red";
  ctx.fillRect(mx * tq, my * tq, tq, tq);
  //fim

  //mostrar para o talhes gay // DUVIDA

  for (var i = 1; i < trail.length; i++) {
    ctx.fillStyle = "gray";
    ctx.fillRect(trail[i - 1].x * tq, trail[i - 1].y * tq, tq, tq);

    ctx.fillStyle = cabeca;
    ctx.fillRect(trail[i].x * tq, trail[i].y * tq, tq, tq); // serve para coisas interesantes trocar 2 i para 0

    if (trail[i].x == px && trail[i].y == py && !morteLivre) {
      vx = vy = 0;
      if (tail > 5) {
        alert("GAME OVER");
      }
      tail = 5;
    }

    if (debug) {
      ctx.font = "20px Roboto";

      ctx.fillText("Cauda : " + tail, 0, 590);
      ctx.fillText("Velocidade Padrão : " + vel, 100, 590);
      ctx.fillText("Velocidade x : " + vx, 0, 20);
      ctx.fillText("Velocidade y : " + vy, 0, 40);
      ctx.fillText("Posição x : " + px, 250, 20);
      ctx.fillText("Posição y : " + py, 250, 40);
    }
  }
  //fim

  //duvida
  trail.push({
    x: px,
    y: py,
  });
  //fim

  //nao deixar a cobra ficar com um rabao
  while (trail.length > tail) {
    trail.shift();
  }
  //fim

  //nascer outra maça
  if (
    my >= py - margem &&
    my <= py + margem &&
    mx >= px - margem &&
    mx <= px + margem
  ) {
    tail++;
    mx = Math.floor(Math.random() * nq);
    my = Math.floor(Math.random() * nq);
  }
  //fim

  //cores dos botoes

  if (debug) {
    btnI.style.backgroundColor = "green";
  } else {
    btnI.style.backgroundColor = "red";
  }

  if (gravity) {
    btnG.style.backgroundColor = "green";
    margem = 1;
    morteLivre = true;
    movlivre = true;
  } else {
    btnG.style.backgroundColor = "red";
    margem = 0;
  }

  if (movlivre) {
    btnM.style.backgroundColor = "green";
  } else {
    btnM.style.backgroundColor = "red";
  }

  if (morteLivre) {
    btnMORTE.style.backgroundColor = "green";
  } else {
    btnMORTE.style.backgroundColor = "red";
  }

  //paredes
  if (parTeleporte) {
    btnPT.style.backgroundColor = "green";
    stage.style.border = "5px solid blue";
    cabeca = "blue";
  } else {
    btnPT.style.backgroundColor = "red";
  }

  if (parBorracha) {
    btnPB.style.backgroundColor = "green";
    movlivre = true;
    morteLivre = true;
    stage.style.border = "5px solid yellow";
    cabeca = "yellow";
  } else {
    btnPB.style.backgroundColor = "red";
  }

  if (parMorte) {
    btnPM.style.backgroundColor = "green";
    stage.style.border = "5px solid red";
    cabeca = "red";
  } else {
    btnPM.style.backgroundColor = "red";
  }
  //fim

  //fim
}

//movimentação da cobra
function keyPush(event) {
  switch (event.keyCode) {
    case 37: //left
      if (vx != vel && !movlivre) {
        vx = -vel;
      } else if (movlivre) {
        vx = -vel;
      }
      vy = 0;
      break;
    case 38: //up
      vx = 0;
      if (vy != vel && !movlivre) {
        vy = -vel;
      } else if (movlivre) {
        vy = -vel;
      }
      break;
    case 39: //right
      if (vx != -vel && !movlivre) {
        vx = vel;
      } else if (movlivre) {
        vx = vel;
      }
      vy = 0;
      break;
    case 40: //down
      vx = 0;
      if (vy != -vel && !movlivre) {
        vy = vel;
      } else if (movlivre) {
        vy = vel;
      }
      break;
    default:
      break;
  }
}
//fim

function buttonClick(id) {
  switch (id) {
    case "I":
      debug = !debug;
      break;

    case "G":
      gravity = !gravity;
      if (!gravity) {
        py = Math.trunc(py);
        vy = 0;
      }
      break;

    case "M":
      movlivre = !movlivre;
      break;

    case "MORTE":
      morteLivre = !morteLivre;
      break;

    case "PT":
      parTeleporte = !parTeleporte;
      parBorracha = parMorte = false;
      break;

    case "PB":
      parBorracha = !parBorracha;
      parTeleporte = parMorte = false;
      break;

    case "PM":
      parMorte = !parMorte;
      parBorracha = parTeleporte = false;
      break;

    default:
      alert("sorry there was an error in program");
  }
}
game();
