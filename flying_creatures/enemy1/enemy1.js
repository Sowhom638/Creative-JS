/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 1000;
const NumberOfEnemy = 20;
let enemyArray = [];
 
const enemyImage = new Image();
enemyImage.src = 'enemy1.png';
class Enemy {
    constructor(){
    this.speed = Math.random()*4-2;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth/3;
    this.height = this.spriteHeight/3;
    this.x = Math.random()*(canvas.width - this.width);
    this.y = Math.random()*(canvas.height - this.height);
    this.gameframe = 0;
    this.frame = 0;
    this.frameSpeed = Math.floor(Math.random()*4+1);
    }
    update(){
        this.x += this.speed;   
        this.y += this.speed;
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