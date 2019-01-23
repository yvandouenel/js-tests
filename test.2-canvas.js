/**
 * Pour cet exercice, il sera nécessaire de comprendre les canvas et notamment le fait 
 * qu'il est nécessaire de le "nettoyer" complètement à chaque mouvement
 */
let touch_border = false;
let block_size = 30;

const canvas_width = 600;
const canvas_height = 600;
const canvas = document.createElement("canvas");
let ctx;
let score = new Score(0);

createCanvas(canvas);

const snake = new Snake([300, 50], "right");
let apple = new Apple([getRandomInt(0, (canvas_width - block_size)), getRandomInt(0, (canvas_height - block_size))]);

snake.animate();
apple.drawApple();

function Apple(body) {
  this.body = body;
  console.log(this.body);
  this.drawApple = function() {
    ctx.save();
    ctx.fillStyle = "rgb(255 0 0)";
    ctx.fillRect(this.body[0], this.body[1], block_size, block_size);
  }
}

function Snake(body, direction) {
  this.body = body;
  this.direction = direction;
  this.speed = 50 ;

  this.setDirection = function(newDirection) {
    this.direction = newDirection;
  };

  ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(255 0 0)";
  ctx.fillRect(10, 10, block_size, block_size);

  this.animate = function() {
    switch (this.direction) {
      case "right":
        this.body[0] += 5;
        break;
      case "bottom":
        this.body[1] += 5;
        break;
      case "left":
        this.body[0] -= 5;
        break;
      case "top":
        this.body[1] -= 5;
        break;
      default:
        console.log("Direction inconnue");
    }

    console.log("spedd : " + this.speed);
    if (
      this.body[0] + (block_size -5) < canvas.width &&
      this.body[1] + (block_size -5) < canvas.height &&
      this.body[0] > -5 &&
      this.body[1] > -5
    ) {
      setTimeout(function() {
        ctx.save();
        ctx.clearRect(0, 0, canvas_width, canvas_height); // effacer le canvas
        ctx.fillStyle = "rgb(255 0 0)";
        apple.drawApple();
        ctx.fillStyle = "rgb(0 0 0)";
        ctx.fillRect(snake.body[0], snake.body[1], block_size, block_size);
        if (Math.abs(snake.body[0] - apple.body[0]) < block_size && 
          Math.abs(snake.body[1] - apple.body[1]) < block_size) {
          console.log("Un point de plus !"); 
          score.setScore(score.score + 1); 
          if(score.score % 3 == 0) snake.speed = Math.round(snake.speed / 1.5);
          apple = new Apple([getRandomInt(0, (canvas_width - block_size)), getRandomInt(0, (canvas_height - block_size))]);     
        }
        snake.animate();
      }, snake.speed);
    } else {
      touch_border = true;
      console.log("bord touché");
    }
  };
  this.restart = function() {
    score.setScore(0);
    snake.speed = 50;
    ctx.save();
    ctx.clearRect(0, 0, canvas_width, canvas_height); // effacer le canvas
    this.body = [300,400];
    this.setDirection("right");
    ctx.fillRect(snake.body[0], snake.body[1], block_size, block_size);
    this.animate();
  };
}
//modifyElement();

function createCanvas() {
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  canvas.style.border = "20px solid grey";
  canvas.style.backgroundColor = "yellow";
  document.body.appendChild(canvas);
}
function animate(ctx) {}

document.onkeydown = function handleKeyDown(e) {
  let key = e.keyCode;
  let newDirection;
  switch (key) {
    case 37:
      newDirection = "left";
      break;
    case 38:
      newDirection = "top";
      break;
    case 39:
      newDirection = "right";
      break;
    case 40:
      newDirection = "bottom";
      break;
    case 32:
      snake.restart();
      return;
    default:
      return;
  }
  snake.setDirection(newDirection);
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
 
function Score(s) {
  this.score = s;
  this.div_score = document.createElement("div");
  this.text_score = document.createTextNode(this.score);
  this.div_score.appendChild(this.text_score);
  document.body.appendChild(this.div_score);

  this.setScore = function(ns) {
    console.log("****************Score : " + ns);
    console.log("****************Score : " + this.score);
    this.score = ns;
    this.text_score.nodeValue  = this.score;
    
  }
}
