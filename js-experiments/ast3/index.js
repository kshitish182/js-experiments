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
let birdPosX = 50;
let birdPosY = 280;
let birdWidth = 34;
let birdHeight = 24;
let birdSpeed = 0;
let keyUpCount = 1;
let flap = 15;
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

const floorMaker = () => {
	let floor = new Image();
	floor.src = './images/fg.png';
	ctx.drawImage(floor, 0 , 500, 800 ,100);
}

const birdMaker = () => {
	let birdChar = new Image();
	birdChar.src = './images/bird_1.png';
	ctx.drawImage(birdChar, birdPosX, birdPosY, birdWidth , birdHeight);
	birdSpeed += GRAVITY;
	birdPosY += birdSpeed;
	// fallCount++;
	// console.log(fallCount);
	// if(fallCount>=15){
	// 	birdSpeed = 20;
	// }
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
		// console.log(startPos);
		startPos += space;
		// console.log(startPos);
		poleHeight = 100 + Math.floor(Math.random() * 150);
		poleObj.push(new Poles(startPos, poleHeight));
	}
}

// const scoreGenerator = () =>{
// 	let scoreCount = 0;
//  	scoreCount = scoreCounter(scoreCount);
// 	scoreImage = new Image();
// 	scoreImage.src="./images/" + scoreCount + ".png";
// 	ctx.drawImage(scoreImage , 380 , 100);
// } 

const scoreCounter = () => {
	poleObj.forEach( value =>{
		// scoreimageStore();
		// if(scoreCount === 0){
		// 	ctx.drawImage(scoreImage[0] , 380 , 100);
		if(birdPosX + birdWidth === value.startPos+ value.poleWidth){
			scoreCount++;
			console.log(scoreCount);
			sfxScore.play();
		}
		// scoreImage = new Image();
		// scoreImage.src="./images/" + scoreCount + ".png";
		ctx.font = "30px aerial";
		ctx.strokeText(scoreCount, 380 , 100);
		// ctx.drawImage(scoreImage , 380 , 100);
		// if(scoreCount >=10){
		// 	let scoreCountString = scoreCount.toString();
		// 	console.log(scoreCountString);
		// 	for(let i =0 ; i<length.scoreCountString; i++){
		// 		console.log(scoreCountString[i]);
		// 		scoreImage.src = "./images" + scoreCountString[i] + ".png";
		 //	}
		//}
		// scoreImage = new Image();
		// scoreImage.src="./images/" + scoreCount + ".png";
		// ctx.drawImage(scoreImage , 380 , 100);
			// ctx.drawImage(scoreImage[scoreCount] , 380 , 100);
			// if(scoreCount >= 10){
			// 	let plotSpace = 0;
			// 	scoreCount = scoreCount.toString();
			// 	for(let i=0; i < scoreCount.length ; i++){
			// 		ctx.drawImage(scoreImage[parseInt(value)] , 380 + plotSpace , 100);
			// 		plotSpace += 5;
			// 	}
			// }
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
	birdMaker();
	scoreCounter();
	collision();
	// for(let i =0; i < poleObj.length ; i++){
	// 	poleObj[i].movePoles();
	// }
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
		if(( birdPosX + birdWidth >= value.startPos) 
														&& 
				(birdPosX <= value.startPos + value.poleWidth)
														&&
				((birdPosY) <= value.poleHeight 
														|| 
				(birdPosY + birdHeight) >= (value.poleHeight + areaBtwnPoles))
														||
				((birdPosY + birdHeight) >= 500)	
			)
		{
			collisionDetection = true;
			gameReset();
			gameOver= true;
		}
	});	
}
		
poleObjMaker();	
animate();

// const birdFallAnimation = () => {
// 	birdPosY+=10;
// 	backgroundGenerator();
// 	polesGenerator();
// 	poleObj[poleObj.length - 1].poleRender();
// 	floorMaker();
// 	birdMaker();
// 	scoreCounter();
// 	if(birdPosY <= 500 - birdHeight){
// 		window.requestAnimationFrame(birdFallAnimation);
// 	}
// }

document.addEventListener('keydown', (event) =>{
	if(event){
		if(!collisionDetection){
			birdSpeed -= flap;
			birdPosY += birdSpeed;
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



