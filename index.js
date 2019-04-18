var imgContainer = document.getElementById('myContainer');
var mainContainer = document.getElementById('mainContainer');
var rightArrow = document.createElement('div');
var leftArrow = document.createElement('div');

var marLeft= 0;
var leftPos;
var animationPause = 'on';
var flag=0;
var returnBack = 'no';
var imageCounter = 0;
var imgWidthCounter = 0;
var sliderCounter = 0;
var MAX_SLIDE_LIMIT = -1400;
var MIN_SLIDE_LIMIT = 0;
var IMG_WIDTH = 700;
var slideLeft = 0;
var children = imgContainer.childNodes;
// console.log(children); 

mainContainer.style.position = 'relative';
myContainer.style.marginLeft = 'Opx';

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


function animate(){
	if(flag === 0 && returnBack === 'no'){
		if(marLeft === MIN_SLIDE_LIMIT || imgWidthCounter === IMG_WIDTH){
			imgWidthCounter = 0;
			animationPause='on';
			flag = 1;
			setTimeout(function (){
				animationPause='off';
				window.requestAnimationFrame(animate);
			}, 2000)
		}
	}

	if( animationPause === 'off'){
		if(marLeft === MIN_SLIDE_LIMIT){
			leftPos= -1;
		}else if(marLeft === MAX_SLIDE_LIMIT){
			leftPos = 50;
			returnBack = 'yes';
		}

		marLeft+= leftPos;
		imgWidthCounter++;
		sliderCounter++;
		console.log("slider",imgWidthCounter);

		if(marLeft === 0)  returnBack = 'no';

		myContainer.style.marginLeft = marLeft + 'px';	
			
		window.requestAnimationFrame(animate);
		flag=0;
	}
	rightArrow.addEventListener('click', function(event) {
		console.log('event listner', sliderCounter);
		clearTimeout(animate);
		 if(animationPause === 'on'){
			slideLeft=IMG_WIDTH;	}
		 else if(animationPause === 'off'){
	 		slideLeft = IMG_WIDTH - sliderCounter;
	 	 }
	//  if(marLeft != MAX_SLIDE_LIMIT)
	//  slideLeft=imageIndex*IMG_WIDTH;
	myContainer.style.marginLeft = -slideLeft + 'px';
	window.requestAnimationFrame(animate);
})

}	

animate();

children.forEach(function (value) {
	if(value.tagName === 'IMG'){
		indexCircle= document.createElement('div');
		indexCircle.setAttribute('class', 'index-class');
		indexCircle.style.width = '10px';
		indexCircle.style.height = '10px';
		indexCircle.style.border = '1px solid white';
		indexCircle.style.borderRadius = '50%';
		indexCircle.style.position = 'absolute';
		indexCircle.style.top = '95%';
		indexCircle.style.left = 47 + imageCounter*3 + '%';
		imageCounter++;
		mainContainer.appendChild(indexCircle);
	}
})

// rightArrow.addEventListener('click', function(event) {
// 	marLeft = 700 - imgWidthCounter;
// 	myContainer.style.marginLeft = -marLeft + 'px';
// })
console.log(imageCounter);

