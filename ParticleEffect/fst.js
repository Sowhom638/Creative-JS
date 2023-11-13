const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;
const Particlesarray=[];
const mouse = {
    x: undefined, y: undefined
}
canvas.addEventListener("mousemove",function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i=0;i<2;i++){
        Particlesarray.push(new Particle());
    }
})
canvas.addEventListener("click",function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i=0;i<5;i++){
        Particlesarray.push(new Particle());
    }
})


class Particle{
    constructor(){
        this.x =  mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 1.5;
        this.color = "hsl(" + hue + ",100%,50%)";
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size >= 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill(); 
    }
}    



function particlehandler(){
    for(let i=0;i<Particlesarray.length;i++){
        Particlesarray[i].update();
        Particlesarray[i].draw();
    for(let j=i;j<Particlesarray.length;j++){
        const dx = Particlesarray[i].x-Particlesarray[j].x;
        const dy = Particlesarray[i].y-Particlesarray[j].y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if(distance > 100){
            ctx.beginPath();
            ctx.strokeStyle = Particlesarray[i].color;
            ctx.lineWidth = 0.02;
            ctx.moveTo(Particlesarray[j].x,Particlesarray[j].y);
            ctx.lineTo(Particlesarray[i].x,Particlesarray[i].y);
            ctx.stroke();
            ctx.closePath();
        }
    }
        if(Particlesarray[i].size <= 0.3){
            Particlesarray.splice(i, 1);
            i--;
    }}
  }
function animate(){
     ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,0.05)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlehandler();
    hue+=4;
    requestAnimationFrame(animate);
}
animate();
