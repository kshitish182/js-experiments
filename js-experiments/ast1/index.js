var imgContainer = document.getElementById('myContainer');
var mainContainer = document.getElementById('mainContainer');
var rightArrow = document.createElement('span');
var leftArrow = document.createElement('span');

var marLeft= 0;
var speed = 20;
var returnSpeed = 40;
var marginCounter=0;
var imageCounter = 0;
var sliderCounter = 0;
var MAX_SLIDE_LIMIT = 2800;
var MIN_SLIDE_LIMIT = 0;
var IMG_WIDTH = 700;
var children = imgContainer.childNodes;


mainContainer.style.position = 'relative';

imgContainer.style.marginLeft = '0px';

rightArrow.style.position = 'absolute';
rightArrow.style.width = '32px';
rightArrow.style.height = '32px';
rightArrow.style.backgroundImage = 'url("./images/right-arrow.png")';
rightArrow.style.top = '50%';
rightArrow.style.right = '2%';

leftArrow.style.position = 'absolute';
leftArrow.style.width = '32px';
leftArrow.style.height = '32px';
leftArrow.style.backgroundImage = 'url("./images/left-arrow.png")';
leftArrow.style.top = '50%';
leftArrow.style.left = '2%';

mainContainer.appendChild(rightArrow);
mainContainer.appendChild(leftArrow);

children.forEach(function (value , i) {
	if(value.tagName === 'LI'){
		imageCounter++;
		indexCircle= document.createElement('div');
		indexCircle.setAttribute('id', 'indexId' + i);
		indexCircle.style.width = '10px';
		indexCircle.style.height = '10px';
		indexCircle.style.border = '1px solid white';
		indexCircle.style.borderRadius = '50%';
		indexCircle.style.position = 'absolute';
		indexCircle.style.top = '95%';
		indexCircle.style.left = 47 + imageCounter*3 + '%';
		mainContainer.appendChild(indexCircle);
	}
});

var dot1 = document.getElementById('indexId1');
var dot2 = document.getElementById('indexId3');
var dot3 = document.getElementById('indexId5');

function nextSlide(){
	if(sliderCounter < (imageCounter-1)){
		marLeft += speed;
		marginCounter+= speed;
		imgContainer.style.marginLeft = -marLeft + 'px';
		if(marginCounter >= IMG_WIDTH){
			sliderCounter++;
			marginCounter = 0;
		}
	}else if(sliderCounter === (imageCounter-1)){
		sliderReturn();
	}
	if(marginCounter){
	window.requestAnimationFrame(nextSlide);
	}
	sliderArrowDisplay();
}

function prevSlide(){

 if(sliderCounter > 0){
			marLeft = marLeft - speed;
			marginCounter = marginCounter + speed;
			imgContainer.style.marginLeft = -marLeft + 'px';
			if(marginCounter >= IMG_WIDTH){
				sliderCounter--;
				marginCounter = 0;
			}
	}
	if(marginCounter){
		window.requestAnimationFrame(prevSlide);
	}
	sliderArrowDisplay();
}

function sliderArrowDisplay(){

	if(sliderCounter === (imageCounter-1)){
		// marginCounter = 1;
		rightArrow.style.display = 'none';
	}else{
		rightArrow.style.display = 'block';
	}

	if(sliderCounter === 0){
		// marginCounter = 1;
		leftArrow.style.display = 'none';
	}else{
		leftArrow.style.display = 'block';
	}
}

function sliderReturn(){
if(sliderCounter === (imageCounter-1)){
		marLeft = marLeft - returnSpeed;
		marginCounter = marginCounter + returnSpeed;
		imgContainer.style.marginLeft = -marLeft + 'px';
		if(marginCounter >= MAX_SLIDE_LIMIT){
			marginCounter = 0;
			sliderCounter = 0;
		}
	}
}

rightArrow.addEventListener('click', function (){
	nextSlide();
});

leftArrow.addEventListener('click', function (){
	prevSlide();
});

setInterval(function(){
	nextSlide();
}, 8000);

sliderArrowDisplay();