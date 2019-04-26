let canvas = document.getElementById('canvas-id');
canvas.style.border = '1px solid black';
canvas.style.margin = "auto";
const PI =Math.PI;
const ctx = canvas.getContext('2d');
let flag;

class Ball {
	constructor(centerX , centerY , radius , color , ballVelocityX , ballVelocityY){
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
		this.color = color;
		this.canvasWidth = 1000;
		this.canvasHeight = 600;
		this.ballVelocityX = ballVelocityX;
		this.ballVelocityY = ballVelocityY;
	}

	plotCircle() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.centerX , this.centerY , this.radius , 0, 2*PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	moveCircle() {
		this.plotCircle();
		if((this.centerX + this.radius) > this.canvasWidth || (this.centerX-this.radius) < 0 ){
				this.ballVelocityX = -this.ballVelocityX;
				if(this.centerX -this.radius <= this.ballVelocityX+this.radius){
					this.ballVelocityX = -(this.centerX-this.radius);
				}
		} 
		if((this.centerY + this.radius) > this.canvasHeight || (this.centerY-this.radius) < 0){
			this.ballVelocityY = - this.ballVelocityY;
			if(this.centerY - this.radius <= this.ballVelocityY + this.radius){
				this.ballVelocityY = -(this.centerY - this.radius);
			}
		}
			this.centerY += this.ballVelocityY;
			this.centerX += this.ballVelocityX;
	}
}

let xCor;
let yCor;
let collisionFlag;
let ballNumber = 10; 
let ballRadius = 25;
let ballSpeedX = 8;
let ballSpeedY = 8;
let ball = [];

const centerDistance = (x1Cord , y1Cord , x2Cord , y2Cord) =>{
	let distanceX =  Math.pow((x1Cord - x2Cord),2);
	let distanceY = Math.pow((y1Cord - y2Cord),2);
	return Math.sqrt(distanceX + distanceY);
}

const checkOverlap = () => {
	for(let j=0; j < ball.length ; j++){
		if(centerDistance(ball[j].centerX, ball[j].centerY, xCor, yCor) <= 2*ball[j].radius){
			flag = 1;
		}
	}
}

const creatBallObj = () => {
	let flag = 0;
	for(let i = 0; i < ballNumber ; i++){
		xCor = ballRadius + ballSpeedX + parseInt(Math.random() * 800);
		yCor = ballRadius + ballSpeedY +  parseInt(Math.random() * 400);
			checkOverlap();
		if (flag === 1){
			i--;
			continue;
		}else{
 			ball[i] = new Ball(xCor, yCor, ballRadius , 'red', ballSpeedX , ballSpeedY);
 		}
	}
}

const animate = () => {
	ctx.clearRect(0 , 0, 1000, 800);
	for(let i=0 ; i < ballNumber; i++){
		ball[i].moveCircle();
	}
	collision();
	if(collisionFlag){
		setTimeout( resetSpeed() , 1000);
	}
	window.requestAnimationFrame(animate);
}

const resetSpeed = () =>{
	for(let i = 0 ; i < ballNumber ; i++){
		if(Math.sign(ball[i].ballVelocityX) === -1){
			ball[i].ballVelocityX = -ballSpeedX;
		}else{
			ball[i].ballVelocityX = ballSpeedX;
		}

		if(Math.sign(ball[i].ballVelocityY) === -1){
			ball[i].ballVelocityY = -ballSpeedY;
		}else{
			ball[i].ballVelocityY = ballSpeedY;
		}
	}
}



const collision = () =>{
	for(let i = 0 ; i < ballNumber ; i++){
		for(let j=i+1 ; j< ballNumber ; j++){
			let colDistance = centerDistance(ball[i].centerX , ball[i].centerY , ball[j].centerX, ball[j].centerY);
			if(colDistance <= ( ball[i].radius + ball[j].radius )){
				ball[i].ballVelocityX =  -ball[i].ballVelocityX;
				ball[i].ballVelocityY =  -ball[i].ballVelocityY;
				ball[j].ballVelocityX =  -ball[j].ballVelocityX;
				ball[j].ballVelocityY =  -ball[j].ballVelocityY;
				
				if(ball[i].radius + ball[j].radius + ball[i].centerX > ball[j].centerX
																			&&
					ball[i].radius + ball[j].radius + ball[j].centerX > ball[i].centerX
																			&&
					ball[i].radius + ball[j].radius + ball[i].centerY > ball[i].centerX 
																			&&
					ball[i].radius + ball[j].radius + ball[j].centerY > ball[j].centerY)
				{
						console.log('overlap');
						if(Math.sign(ball[i].ballVelocityX) === -1){
								ball[i].ballVelocityX = -ball[i].radius;
							}
							
							collisionFlag = true;
				}
			}
		}
	}
}


creatBallObj();
animate();
