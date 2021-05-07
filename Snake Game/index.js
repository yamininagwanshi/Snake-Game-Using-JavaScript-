const board = document.getElementById("board");
const board_ctx = board.getContext("2d");


class SnakePart
{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}
}

const snakeParts = [];
let tailLength = 1;


let speed = 4;

let tilecount = 20;
let tilesize = board.width/tilecount - 2; //18

let headX= 10;
let headY = 10;

let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;


let score = 0;

//Main Function 
function drawGame() {

	changeSnakePosition();
	let result = isGameOver();
	if(result)
		return;

	clearScreen();
	
	if (score>7)
	{
		speed = 7;
	}
	if(score>15)
	{
		speed = 10
	}

	appleCollision();

	drawApple();

	drawSnake();


	//console.log("draw game") 
	setTimeout(drawGame,1000 / speed);

}

//Condition to End to Game 
function isGameOver() {
	let gameover = false;

	//head and part are at same position in start, so if the velocity is zero,that means game is not started yet it implies that gameover must be false.
	if(xVelocity==0 && yVelocity==0)
		return false;

	//Colliding walls

	//Colliding Left Wall
	if(headX<0)
	{
		gameover = true;
	}
	//Colliding Right Wall
	else if(headX>=tilecount)
	{
		gameover = true;
	}
	//Colliding Up Wall
	else if(headY<0)
	{
		gameover = true;
	}
	//Colliding Bottom Wall
	else if(headY>=tilecount)
	{
		gameover = true;
	}

	//Collision with snake body
	for (let i = 0;i<snakeParts.length; i++) 
	{
		let part = snakeParts[i];
		if (part.x == headX && part.y == headY) 
		{
			gameover=true;
			break;
		}

	}

	//Draw Game Over text when collision take place
	if (gameover)
	{	
		board_ctx.fillStyle = 'black';
		board_ctx.fillRect(0,0,board.width,board.height);

		board_ctx.fillStyle = 'White';
		board_ctx.font = '55px Verdana';
		
		board_ctx.fillText('Game Over',board.width/6.5,board.height/2.5);
		board_ctx.fillStyle = 'White';
		board_ctx.font = '30px Verdana';
		board_ctx.fillText("Score = " + score, board.width/3,board.height/1.5);

	}

	
	return gameover;
}

function clearScreen() {
	board_ctx.fillStyle ='black';
	board_ctx.fillRect(0,0,board.width,board.height);
}

function drawSnake() {
	
	board_ctx.fillStyle = 'green';
	for (let i=0; i < snakeParts.length; i++) 
	{
		let part = snakeParts[i];
		board_ctx.fillRect(part.x*tilecount , part.y*tilecount , tilesize,tilesize);

	}
	//Put an item at the end of the list and next to the head
	snakeParts.push(new SnakePart(headX,headY));
	if(snakeParts.length>tailLength) //0>2 
	{
		snakeParts.shift();//remove the furtherest element 
	}
	//console.log("===",snakeParts)

	//Snake Head
	board_ctx.fillStyle = 'orange';
	board_ctx.fillRect(headX*tilecount,headY*tilecount,tilesize,tilesize); //(x,y,w,h)

}

//To Change the position of Snake
function changeSnakePosition() {
	headX = headX + xVelocity;
	headY = headY + yVelocity;

}

// Draw Apple in Canvas
function drawApple(argument) {
	board_ctx.fillStyle = 'red';
	board_ctx.fillRect(appleX*tilecount,appleY*tilecount,tilesize,tilesize);
}


//When Snake Eats Apple
function appleCollision() {
	//If Position of apple and head of snake is same-change apple position
 	if(appleX==headX && appleY==headY) 
 	{
 		appleX = Math.floor(Math.random() * tilecount);
 		appleY = Math.floor(Math.random() * tilecount);
 		tailLength++;
 		//console.log("Tail Length", tailLength)
 		score++;
 	}
 } 


//Any Key press 
document.body.addEventListener('keydown',keyDown);

function keyDown(event) 
{
	//Move Up
	if(event.keyCode == 38)
	{
		if(yVelocity==1) 
			return;

		yVelocity = -1;
		xVelocity = 0;
	}
	//Move Down
	if(event.keyCode == 40)
	{
		if(yVelocity==-1) 
			return;
		yVelocity = 1;
		xVelocity= 0;
	}
	//Move Left
	if(event.keyCode == 37)
	{
		if(xVelocity==1) 
			return;
		yVelocity = 0;
		xVelocity = -1;
	}
	//Move Right
	if(event.keyCode == 39)
	{
		if(xVelocity==-1) 
			return;
		yVelocity = 0;
		xVelocity = 1;
	}

}



drawGame();
