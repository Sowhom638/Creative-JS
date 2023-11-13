/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 700;

const image = new Image();
image.src = 'boom.png';
 const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
class Explosion{

    constructor(X ,Y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth*0.5;
        this.height = this.spriteHeight*0.5;
        this.x = X - this.width*0.5;
        this.y = Y - this.height*0.5;
        this.sound = new Audio();
        this.sound.src = 'boom.wav';
        this.frame = 0;
        this.fps = 0;
    }
    update(){
        this.fps++;
        if(this.frame == 0) this.sound.play();
        if(this.fps%7 == 0){
            this.frame++;
        }
   
    }
    draw(){
      ctx.drawImage(image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};
window.addEventListener('click', function(e){
    let positionX = e.x-canvasPosition.left;
    let positionY = e.y-canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
});   


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    for(let i=0; i<explosions.length; ++i){
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame > 5){
            explosions.splice(i, 1); 
        }
    }
    
requestAnimationFrame(animate);
}
animate();
