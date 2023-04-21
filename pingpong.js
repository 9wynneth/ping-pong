let can = document.getElementById("table");
let context = can.getContext("2d");

const ball = {
  x: can.width / 2,
  y: can.height / 2,
  radius: 10,
  dx: 5,
  dy: 5,
  color: "green",
};

const player1 = {
  x: 50,
  y: can.height / 2 - 50,
  width: 10,
  height: 100,
  score: 0,
  color: "red",
};

const player2 = {
  x: can.width - 60,
  y: can.height / 2 - 50,
  width: 10,
  height: 100,
  score: 0,
  color: "red",
};

function drawRect(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
}

function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "50px Arial";
  context.fillText(text, x, y);
}

function drawNet() {
  for (let i = 0; i < can.height; i += 40) {
    drawRect(can.width / 2 - 2, i, 4, 20, "red");
  }
}
function cpu_movement() {
  if (player2.y + player2.height / 2 < ball.y) {
    player2.y += 5;
  } else {
    player2.y -= 2;
  }
}

function draw() {
  drawRect(0, 0, can.width, can.height, "black");
  drawRect(player1.x, player1.y, player1.width, player1.height, "red");
  drawRect(player2.x, player2.y, player2.width, player2.height, "red");
  drawNet();
  drawCircle(ball.x, ball.y, ball.radius, "green");
  drawText(player1.score, can.width / 4, 50, "#fff");
  drawText(player2.score, (3 * can.width) / 4, 50, "#fff");
  cpu_movement();
}

function restart() {
  ball.x = can.width / 2;
  ball.y = can.height / 2;
  ball.dx = -ball.dx;
}

function collisionDetection() {
  if (ball.x - ball.radius < player1.x + player1.width && ball.y + ball.radius > player1.y && ball.y - ball.radius < player1.y + player1.height) {
    ball.dx = -ball.dx;
  } else if (ball.x + ball.radius > player2.x && ball.y + ball.radius > player2.y && ball.y - ball.radius < player2.y + player2.height) {
    ball.dx = -ball.dx;
  } else if (ball.x - ball.radius < 0) {
    player2.score++;
    restart();
  } else if (ball.x + ball.radius > can.width) {
    player1.score++;
    restart();
  }
}

function move() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  cpu_movement();
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > can.height) {
    ball.dy = -ball.dy;
  }
}

function game() {
  move();
  collisionDetection();
  draw();
}

setInterval(game, 1000 / 60);

document.addEventListener("mousemove", function (event) {
  if (event.clientY - player1.height / 2 >= 0 && event.clientY + player1.height / 2 <= can.height) {
    player1.y = event.clientY - player1.height / 2;
  }
});
