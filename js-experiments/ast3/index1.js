let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let space=0;
let speed = 2;
let gameOver;
let areaBtwnPoles = 150;
let poleObj = [];
let startPos = 800;
let bgStartPosX = 0;
let bgStartPosY = 0;
let scoreCount = 0;
let collisionDetection;

let sfxDie = new Audio();
let sfxScore = new Audio();
let sfxFlap = new Audio();
let sfxHit = new Audio();

sfxDie.src = 'audio/sfx_die.wav';
sfxScore.src = 'audio/sfx_point.wav';
sfxFlap.src = 'audio/sfx_wing.wav';
sfxHit.src = 'audio/sfx_hit.wav';

const PI = Math.PI;
const GRAVITY = 0.7;


class Poles{
	constructor(startPos,poleHeight){
			this.startPos = startPos;
			this.poleHeight = poleHeight;
			this.poleWidth = 50;
			this.yPosition = 0;
	}

	 poleRender() {
	 	let upperPole = new Image();
	 	let lowerPole = new Image();
	 	upperPole.src = './images/pipeNorth.png';
	 	lowerPole.src = './images/pipeSouth.png';

	 	ctx.drawImage(upperPole, this.startPos, -650+this.poleHeight, this.poleWidth, 650);
	 	ctx.drawImage(lowerPole, this.startPos, this.poleHeight+areaBtwnPoles, this.poleWidth , 650);
	}

	 movePoles(){ 
		this.poleRender();
		this.startPos = this.startPos - speed;
	}
}

class Bird{
	constructor(flapSpeed, birdPosX, birdPosY){
		this.birdWidth = 34;
		this.birdHeight = 24;
		this.birdPosX = birdPosX;
		this.birdPosY = birdPosY;
		this.birdSpeed = 0;
		this.flapSpeed = flapSpeed;
	}

	birdMaker() {
		let birdChar = new Image();
		birdChar.src = './images/bird_1.png';
		ctx.drawImage(birdChar, this.birdPosX, this.birdPosY, this.birdWidth , this.birdHeight);
		this.birdSpeed += GRAVITY;
		this.birdPosY += this.birdSpeed;
	}
}

birdObj = new Bird(15, 50 ,280);

const floorMaker = () => {
	let floor = new Image();
	floor.src = './images/fg.png';
	ctx.drawImage(floor, 0 , 500, 800 ,100);
}

const poleObjMaker = () => {
	for(let i =0 ; i < 5 ; i++){
			startPos += space;
			poleHeight = 100 + Math.floor(Math.random() * 150);
		 	poleObj[i] = new Poles(startPos, poleHeight);
		 	space = 400;
	}
}

const backgroundGenerator = () =>{
	let background = new Image();
	background.src="./images/background.png";
	ctx.drawImage(background , 0 , 0 , 200 , 600);
	ctx.drawImage(background , 200 , 0 , 200 , 600);
	ctx.drawImage(background , 400 , 0 , 200 , 600);
	ctx.drawImage(background , 600 , 0 , 200 , 600);
}

const polesGenerator = () =>{
	if((poleObj[poleObj.length - 1].startPos) === 800){
		startPos=poleObj[poleObj.length -1].startPos;
		startPos += space;
		poleHeight = 100 + Math.floor(Math.random() * 150);
		poleObj.push(new Poles(startPos, poleHeight));
	}
}
 
const scoreCounter = () => {
	poleObj.forEach( value =>{
		if(birdObj.birdPosX + birdObj.birdWidth === value.startPos+ value.poleWidth){
			scoreCount++;
			console.log(scoreCount);
			sfxScore.play();
		}
		ctx.font = "30px aerial";
		ctx.strokeText(scoreCount, 380 , 100);
	});
}

const animate = () =>{
	ctx.clearRect(0 , 0, 800, 600);

	if(!collisionDetection){
		let startAnimation = window.requestAnimationFrame(animate);
	}	

	backgroundGenerator();
	polesGenerator();
	floorMaker();
	birdObj.birdMaker();
	scoreCounter();
	collision();
	for(let i =0; i < poleObj.length ; i++){
		poleObj[i].movePoles();
	}

}

const gameReset = () =>{
	ctx.font = '40px aerial'
	ctx.fillText('your highscore is ' + scoreCount, 200,200);
	ctx.fillText('press any key to play again', 200,400);
}

const	collision = () => {
	poleObj.forEach( value => {
		if(( birdObj.birdPosX + birdObj.birdWidth >= value.startPos) 
														&& 
				(birdObj.birdPosX <= value.startPos + value.poleWidth)
														&&
				((birdObj.birdPosY) <= value.poleHeight 
														|| 
				(birdObj.birdPosY + birdObj.birdHeight) >= (value.poleHeight + areaBtwnPoles))
														||
				((birdObj.birdPosY + birdObj.birdHeight) >= 500)	
			)
		{
			collisionDetection = true;
			console.log(birdObj.birdPosY);
			gameReset();
			gameOver= true;
			sfxHit.play();
		}
	});	
}
		
poleObjMaker();	
animate();

document.addEventListener('keydown', (event) =>{
	if(event){
		if(!collisionDetection){
			birdObj.birdSpeed -= birdObj.flapSpeed;
			birdObj.birdPosY += birdObj.birdSpeed;
			sfxFlap.play();
		}
 }
});

document.addEventListener('keydown', event =>{
	if(gameOver){
		if(event){
			document.location.reload(true);
		}
	}
})



