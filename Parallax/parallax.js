const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const BackGroundLayer1 = new Image();
BackGroundLayer1.src = "layer-1.png";
const BackGroundLayer2 = new Image();
BackGroundLayer2.src = "layer-2.png";
const BackGroundLayer3 = new Image();
BackGroundLayer3.src = "layer-3.png";
const BackGroundLayer4 = new Image();
BackGroundLayer4.src = "layer-4.png";
const BackGroundLayer5 = new Image();
BackGroundLayer5.src = "layer-5.png";

let gameSpeed = 10;
let x = 0;
let x2 = 2400;

const slider = document.getElementById("slider");
slider.value = gameSpeed;
let showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener("change", (e) =>{
gameSpeed = e.target.value;
showGameSpeed.innerHTML = gameSpeed;
});

class layer{
    constructor(image , speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 600;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
    }
    update(){
        this.speed = gameSpeed*this.speedModifier;
        if(this.x < -this.width) this.x = 0;

        this.x = Math.floor(this.x -this.speed);

    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);
    }
}

const layer1 = new layer(BackGroundLayer1, 0.2);
const layer2 = new layer(BackGroundLayer2, 0.4);
const layer3 = new layer(BackGroundLayer3, 0.6);
const layer4 = new layer(BackGroundLayer4, 0.8);
const layer5 = new layer(BackGroundLayer5, 1.0);
const gameLayers = [layer1, layer2, layer3, layer4, layer5];


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameLayers.forEach(object => {object.update();object.draw();});
    requestAnimationFrame(animate);
}
animate();