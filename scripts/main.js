// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

//生成随机颜色

function randomColor() {
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}

//实例化小球
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

//画小球
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
 //创建小球实例
 let testBall = new Ball(50, 100, 4, 4, "blue", 10);

 //调用实例
 testBall.x;
testBall.size;
testBall.color;
testBall.draw();

//更新小球数据
Ball.prototype.update = function () {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
  
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
  
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
  
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
  
    this.x += this.velX;
    this.y += this.velY;
  };
  
  //碰撞检测
  Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
      if (this !== balls[j]) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = randomColor();
        }
      }
    }
  };
  
  //储存小球
  let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size,
  );
  balls.push(ball);
}
function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();

    }
  
    requestAnimationFrame(loop);
  }
  loop();
