let canvas = document.getElementById('canvas-id');
canvas.style.border = '1px solid black';
canvas.style.margin = "auto";
const PI =Math.PI;
const ctx = canvas.getContext('2d');
let flag;

class Ball {
	constructor(centerX , centerY , radius , color, canvasWidth , canvasHeight){
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
		this.color = color;
		this.canvasWidth = 600;
		this.canvasHeight = 800;
		this.ballVelocityX = 8;
		this.ballVelocityY = 8;
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
		if((this.centerX + this.radius) >= this.canvasWidth || (this.centerX-this.radius) <= 0 ){

				this.ballVelocityX = -this.ballVelocityX;
		} 
		if((this.centerY + this.radius) >= this.canvasHeight || (this.centerY-this.radius) <= 0){
			this.ballVelocityY = - this.ballVelocityY;
		}
			this.centerY += this.ballVelocityY;
			this.centerX += this.ballVelocityX;
	}
}

let xCor;
let yCor;
let ballNumber = 10 ;
let ballRadius = 50;
let ball = [];

const centerDistance = (x1Cord , y1Cord , x2Cord , y2Cord) =>{
	let distanceX =  Math.pow((x1Cord - x2Cord),2);
	let distanceY = Math.pow((y1Cord - y2Cord),2);
	return Math.sqrt(distanceX + distanceY);
}


for(let i = 0; i < ballNumber ; i++){
	xCor = ballRadius + parseInt(Math.random() * 500);
	yCor = ballRadius + parseInt(Math.random() * 700);

	console.log(xCor , yCor);
	
	if(i !== 0){
		for(let j = 0 ; i<ballNumber ; j++){
			if(centerDistance(ball[j].centerX, ball[j].centerY, xCor, yCor) - 2*ball[j].radius){
				flag=1;
				break;
			}	
		}
		if(flag === 1){
			i--;
			continue;
		}
	}
	// if(i !== 0 ){
	// 	for(let j=0; j< ballNumber; j++){
	// 		  let x2Cor = ball[j].centerX;
	// 			let y2Cor = ball[j].centerY;
	// 		if( centerDistance(x2Cor, y2Cor,xCor,yCor) - 2*ball[j].radius < 0 ){
	// 			xCor =ballRadius + parseInt(Math.random() * 700);
	// 			yCor = ballRadius + parseInt(Math.random() * 500);
	// 			j = -1;
	// 		}
	// 		break;
	// 	}
	// }

  ball[i] = new Ball(xCor, yCor, 25, 'red');
}


const animate = () => {
	 	ctx.clearRect(0 , 0, 1000, 800);
	 	for(let i=0 ; i < ballNumber; i++){
	 		ball[i].moveCircle();
	 }
	 collision();
	window.requestAnimationFrame(animate);

}

const collision = () =>{
	for(let i = 0 ; i < ballNumber ; i++){
		for(let j=i+1 ; j< ballNumber ; j++){
			// let distanceX = Math.pow((ball[i].centerX - ball[j].centerX),2);
			// let distanceY = Math.pow((ball[i].centerY - ball[j].centerY),2);
				let colDistance = centerDistance(ball[i].centerX , ball[i].centerY , ball[j].centerX, ball[j].centerY);
				if(colDistance < ( ball[i].radius + ball[j].radius )){
					ball[i].ballVelocityX = -ball[i].ballVelocityX;
					ball[i].ballVelocityY = -ball[i].ballVelocityY;
					ball[j].ballVelocityX = -ball[j].ballVelocityX;
					ball[j].ballVelocityY = -ball[j].ballVelocityY;
				}
			}
		}
	}



animate();






