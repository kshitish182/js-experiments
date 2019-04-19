var imgContainer = document.getElementById('myContainer');
var mainContainer = document.getElementById('mainContainer');
var rightArrow = document.createElement('span');
var leftArrow = document.createElement('span');

var marLeft= 0;
var speed = 20;
var returnSpeed = 40;
var marginCounter=0;
var imageCounter = 0;
// var imgWidthCounter = 0;
var sliderCounter = 0;
var MAX_SLIDE_LIMIT = 1400;
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
		marLeft = marLeft - returnSpeed;
		marginCounter = returnSpeed + marginCounter;
		imgContainer.style.marginLeft = -marLeft + 'px';
		if(marginCounter >= MAX_SLIDE_LIMIT ){
			sliderCounter = 0;
			marginCounter = 0;
		}
	}
	if(marginCounter){
	window.requestAnimationFrame(nextSlide);
	}
	dotController();
}

function prevSlide(){
	if(sliderCounter === 0){
		marLeft += returnSpeed;
		marginCounter += returnSpeed;
		imgContainer.style.marginLeft = -marLeft + 'px';
		if(marginCounter >= MAX_SLIDE_LIMIT){
			sliderCounter = (imageCounter-1);
			marginCounter = 0;
		}
	}else if(sliderCounter > 0){
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
	dotController();
}

function dotController(){
	if(sliderCounter === 0){
		dot1.style.backgroundColor = 'white';
		dot2.style.backgroundColor = 'transparent';
		dot3.style.backgroundColor = 'transparent';
	}else if(sliderCounter === 1){
		dot2.style.backgroundColor = 'white';
		dot1.style.backgroundColor = 'transparent';
		dot3.style.backgroundColor = 'transparent';
	}else if(sliderCounter === 2){
		dot3.style.backgroundColor = 'white';
		dot2.style.backgroundColor = 'transparent';
		dot1.style.backgroundColor = 'transparent';
	}
}

dot1.addEventListener('click', function(){
	if(sliderCounter === 1){
		prevSlide();
	}else if(sliderCounter === 2){
		prevSlide();
		prevSlide();
	}
});

dot2.addEventListener('click', function(){
	if(sliderCounter === 0){
		nextSlide();
	}else if(sliderCounter === 2){
		prevSlide();
	}
});

dot3.addEventListener('click', function(){
	if(sliderCounter === 0){
		nextSlide();
		nextSlide();
	}else if(sliderCounter === 1){
		nextSlide();
	}
});


rightArrow.addEventListener('click', function (){
	nextSlide();
});

leftArrow.addEventListener('click', function (){
	prevSlide();
});

setInterval(function(){
	nextSlide();
}, 8000);

dotController();