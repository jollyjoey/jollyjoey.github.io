


let player = new Image();
let landscape = new Image();
let aboutPic = new Image();

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let canvasTwo = document.getElementById("canvasTwo");
let ctxTwo = canvasTwo.getContext("2d");
let canvasThree = document.getElementById("canvasThree");
let ctxThree = canvasThree.getContext("2d");


const idle = 0;
const runRight = 1;
const runLeft = 2;
const jump = 3;
const jumpDown = 4;
let frameLimit = 10;
const cycleLoop = [0, 1, 2, 3];
const scale = .4;
//change positionX back to middleScreen when done
const width = 26;
const scaledWidth = scale * width;
let middleScreen = 200 - scaledWidth/2;
let endScreen = 6800 - scaledWidth/2;
const height = 83;

const scaledHeight = scale * height;
const movementSpeed = 2;
const gravity = 0.2;
//const jumpCondition = {cycleLoop:3, currentDirection:jump};
let positionX = 100;
let positionY = 117;
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = idle;
let keyPresses = {};
let positioningX = 100;
let positioningY = 100;
let theKeyIsUp = false;

let backpack = document.getElementById("inventory");
let skills = document.getElementById("skills");

window.addEventListener("keydown", keyDownListener, false);
function keyDownListener(event){
	keyPresses[event.key] = true;
}

window.addEventListener("keyup", keyUpListener, false);
function keyUpListener(event){
	//if(event.key === 73){backpack.classList.toggle("hide");}
	keyPresses[event.key] = false;
}

window.addEventListener("keyup", function(inv){if(inv.keyCode === 73){backpack.classList.toggle("hide")}}, false);
window.addEventListener("keyup", function(inv){if(inv.keyCode === 83){skills.classList.toggle("hide")}}, false);
function loadImage(){
window.onload = function(){ 
player.src = "thepersonalstickfigurewithwhiteheads.png";
	window.requestAnimationFrame(gameLoop);
	};
	landscape.src = "viewportcanvas.png";
	aboutPic.src = "conventionpic.jpg";
}

function clamp(value, min, max){
	if(value < min) return min;
	else if(value > max) return max;
	return value;
}

function draw(){
	ctxTwo.setTransform(1,0,0,1,0,0);
	ctxTwo.clearRect(0,0,canvasTwo.width, canvasTwo.height);
	var camX = clamp(-positioningX + canvasTwo.width/2, -7200 + canvasTwo.width, 0);
	var camY = clamp(-positioningY + canvasTwo.height/2, -1000 + canvasTwo.height, canvasTwo.height);//fix this later
	ctxTwo.translate(camX, camY);
	ctxTwo.drawImage(landscape, 0, 0, 7200, 1000, 0, 0, 7200, 1000);
//Home	
	ctxTwo.font = "900 15px Georgia";//sans-serif or georgia
	ctxTwo.fillText("It's so bad that it's good!", 16, 170);
	ctxTwo.fillText("v0.1.1 - Experimental", 16, 190)
//About
	ctxTwo.drawImage(aboutPic, 269, 234, 120, 100);
	ctxTwo.font = "900 10px Georgia";
	ctxTwo.fillText("Joey's Manifesto", 80, 210);
	ctxTwo.font = "600 10px Georgia";
	ctxTwo.fillText("Greetings! My name is Joey and you've stumbled", 8, 225);
	ctxTwo.fillText("upon my website either by chance, or more likely", 3, 235); 
	ctxTwo.fillText("by mistake. So why not turn a mistake into a", 3, 245); 
	ctxTwo.fillText("moment of amusement? It has been a difficult", 3, 255); 
	ctxTwo.fillText("journey so far in the world of coding, what with", 3, 265); 
	ctxTwo.fillText("dealing with rogue navbars, menacing links, and", 3, 275); 
	ctxTwo.fillText("other malicious data structures, however, my", 3, 285); 
	ctxTwo.fillText("resolve is at least stable since I last checked.", 3, 295);
//Blog
	ctxTwo.fillText("8.8.20", 150, 617);
	ctxTwo.fillText("Step right up!!!", 10, 630);
	ctxTwo.fillText("Click on a blog, any blog!", 7, 645);
//CAQ
	ctxTwo.font = "15px Georgia";
	ctxTwo.fillText("'Joey, you couldn't possibly know how to do this website", 10, 820);
	ctxTwo.fillText("stuff. How did you do this? Who owed you money?'", 10, 840);	
	ctxTwo.fillText("'I have one word for your disbelief: Quarantine.'", 10, 885);
	ctxTwo.fillText("'Does this website have cupholders?'", 60, 975);
	ctxTwo.fillText("'How long does it take to get to the", 450, 835); 
	ctxTwo.fillText("tootsie center of a tootsie pop?'", 455, 850);
	ctxTwo.fillText("'Googled it, 364'", 555, 895);
	
	ctxTwo.fillText("'No.'", 335, 975);
	ctxTwo.font = "900 10px Georgia";
	ctxTwo.fillText("-Fake Reader #1", 275, 860);
	ctxTwo.fillText("-Fake Reader #2", 80, 995);
	ctxTwo.fillText("-Jack*, Real Reader #1", 415, 875);
	ctxTwo.fillText("Want your question on CAQ?", 400, 970); 
	ctxTwo.fillText("Email joefliva@optimum.net or dm my IG @jo_yful", 400, 980);
	ctxTwo.fillText("*Names have been changed.", 400, 995);
	ctxTwo.fillText("Commonly Asked Questions", 95, 920);
}

function getMousePos(canvas, event){
	var rect = canvas.getBoundingClientRect();
	return{
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}
function isInside(pos, rect){
	return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
}
var rect = {
	x: 460,
	y: 17,
	width: 624,
	height: 69
};

canvasTwo.addEventListener("click", function(e){
	var mousePos = getMousePos(canvasTwo, e)
	if(isInside(mousePos, rect) && positioningX === 60 && positioningY === 700){
		location.href = "https://joeyliva.com";
	}
}, false);

function drawFrame(frameX, frameY, canvasX, canvasY){
	ctx.drawImage(player,
		frameX * width, frameY * height, width, height,
		canvasX, canvasY, scaledWidth, scaledHeight
		)
}
function stillAnimate(frameX, frameY, canvasX, canvasY){
	ctxThree.drawImage(player, 
		frameX * width, frameY * height, width, height,
		canvasX, canvasY, scaledWidth, scaledHeight)
}

loadImage();


function gameLoop(){


if(positionX <= middleScreen){
	ctx.clearRect(positionX, positionY, scaledWidth, scaledHeight);
}
//else if(positionX >= middleScreen && positionX < endScreen){
//	ctx.clearRect(middleScreen, positionY, scaledWidth, scaledHeight);
//}
else{
	ctx.clearRect(middleScreen, positionY, scaledWidth, scaledHeight);
}

let hasMoved = false;
let hasJumped = false;

//function jumpUp(){
//	moveCharacter(0, -movementSpeed - 5, jump);// slash this out
//}


if(keyPresses.ArrowLeft){
	moveCharacter(-movementSpeed, 0, runLeft);
	hasMoved = true;
} else if(keyPresses.ArrowRight){
	moveCharacter(movementSpeed, 0, runRight);
	hasMoved = true;
}

// if(keyPresses.i){
// 	backpack.classList.toggle("hide");
// }



 

// if(keyPresses.s){
// 	skills.classList.toggle("hide");
// 	console.log("fired");
// }



//if(keyPresses.ArrowUp && positionY >= 117){//slash out
//	jumpUp();
//	hasMoved = true;
//	hasJumped = true;
//}
//if(positionY < 117 && jumpCondition){
//	moveCharacter(0, gravity, jumpDown)//slash out
//}
if(hasMoved && hasJumped){
frameLimit = 20;
frameCount++;
		if(frameCount >= frameLimit){
		frameCount = 0;
		currentLoopIndex++;
			if(currentLoopIndex >= cycleLoop.length){
			currentLoopIndex = 0;
			}
		}
}
else{
	frameLimit = 15;
if(hasMoved){

	frameCount++;
		if(frameCount >= frameLimit){
		frameCount = 0;
		currentLoopIndex++;
			if(currentLoopIndex >= cycleLoop.length){
			currentLoopIndex = 0;
			}
		}
	}
else{
	currentDirection = idle;
	frameCount++;
	if(frameCount >= frameLimit){
		frameCount = 0;
		currentLoopIndex++;
		if(currentLoopIndex >= cycleLoop.length){
			currentLoopIndex = 0;
		}
	}
}}

let doorOne = false;
let doorTwo = false;
let doorThree = false;
let doorFour = false;
let doorFive = false;
let doorSix = false;
let doorSeven = false;
if(positioningY > 99 && positioningY < 149){
if(positionX > 260 && positionX < 298){ doorOne = true;}
else if(positionX > 319 && positionX < 357){ doorTwo = true;}
else if(positionX > 378 && positionX < 416){doorThree = true;}
else if(positionX > 437 && positionX < 459){doorFour = true;}
else if(positionX > 4615 && positionX < 4653){doorFive = true;}
else if(positionX > 6955 && positionX < 6993){doorSix = true;}
}


//change below
if(doorOne && keyPresses.Enter){
	positionX = 60;
	positioningX = 60;
	positioningY = 300;
	positionY = 117;
	//console.log(positionY);
//	doorOne = false;
//	document.getElementById("home").click();
}
if(doorTwo && keyPresses.Enter){
	positionX = 60;
	positioningX = 60;
	positioningY = 500;
	positionY = 117;
//	doorTwo = false;
//	document.getElementById("about").click();
}
if(doorThree && keyPresses.Enter){

	positionX = 60;
	positioningX = 60;
	positioningY = 700;
	positionY = 117;
	//doorThree = false;
//	document.getElementById("projects").click();
}
if(doorFour && keyPresses.Enter){

	positionX = 60;
	positioningX = 60;
	positioningY = 900;
	positionY = 117;
	//doorFour = false;
//	document.getElementById("blog").click();
}
if(doorFive && keyPresses.Enter){
	//doorFive = false;
	//document.getElementById("updates").click();
}
if(doorSix && keyPresses.Enter){
	//doorSix = false;
//	document.getElementById("caq").click();
}

if(positioningY === 300){
	if(positionX > 16 && positionX < 54 && keyPresses.Enter){
		doorSeven = true;
	}
}

if(positioningY === 500){
	if(positionX > 16 && positionX < 54 && keyPresses.Enter){
		doorSeven = true;
	}
}
if(positioningY === 700){
	if(positionX > 16 && positionX < 54 && keyPresses.Enter){
		doorSeven = true;		
	}
}
if(positioningY === 900){
	if(positionX > 16 && positionX < 54 && keyPresses.Enter){
		doorSeven = true;		
	}
}

if(doorSeven){
	positionX = 360;
	positionY = 117;
	positioningY = 100;
	positioningX = 360;
}

//draw();
if(positionX <= middleScreen){
	drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY)
}
//else if(positionX >= middleScreen && positionX < endScreen){
//drawFrame(cycleLoop[currentLoopIndex], currentDirection, middleScreen, positionY);
//} //not sure why this
else{drawFrame(cycleLoop[currentLoopIndex], currentDirection, middleScreen, positionY)}

ctxThree.clearRect(4.8, 14, scaledWidth, scaledHeight);
stillAnimate(cycleLoop[currentLoopIndex], idle, 4.8, 14);

draw();
window.requestAnimationFrame(gameLoop);
}

function moveCharacter(deltaX, deltaY, direction){
	if(positionX + deltaX > 0 && positionX + deltaX + scaledWidth < 7025 && positioningY < 200){
	positionX += deltaX;
	positioningX += deltaX;
	}else{
		if(positionX + deltaX > 0 && positionX +deltaX +scaledWidth < 700){
			positionX += deltaX;
			positioningX += deltaX;
		}
	}
	if(positionY + deltaY > 0 && positionY + scaledHeight + deltaY < 1000){
	positionY += deltaY;
	}	
currentDirection = direction;
}




//Notes

//use event.stopPropagation for game over