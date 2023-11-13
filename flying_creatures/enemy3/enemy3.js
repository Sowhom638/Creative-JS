/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 1000;
const NumberOfEnemy = 50;
let enemyArray = [];
 
const enemyImage = new Image();
enemyImage.src = 'enemy3.png';
class Enemy {
    constructor(){
    this.speed = Math.random()*3+1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth/3;
    this.height = this.spriteHeight/3;
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.gameframe = 0;
    this.frame = 0;
    this.frameSpeed = Math.floor(Math.random()*4+1);
    this.angle = Math.random() * 5 - 2.5;
    this.angleSpeed = Math.random() * 0.5 + 1;
    this.curve = Math.random()*200+50;
    }
    update(){
      this.x = this.curve * Math.sin(this.angle * Math.PI/90) + (canvas.width/2 + this.width/2);
      this.y = this.curve * Math.cos(this.angle * Math.PI/90) + (canvas.height/2 + this.height/2);
      this.angle += this.angleSpeed;
        if(this.gameframe % this.frameSpeed === 0){
           if(this.frame>4) 
           this.frame = 0;
           else 
           this.frame++;
        }
        this.gameframe++;
     }
    draw(){
       ctx.drawImage(enemyImage, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};

 
for(var i=0; i<NumberOfEnemy; i++){
    enemyArray.push(new Enemy());
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemyArray.forEach(enemy => {
    enemy.draw();
    enemy.update();
    });
    
   requestAnimationFrame(animate);
}
animate();
