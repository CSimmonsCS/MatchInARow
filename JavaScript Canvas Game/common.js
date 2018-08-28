/*
Common Functions:

function getRandomNum(num)
function Ball(x,y)
function gameOver()
function fall()
function checkColor(x,y,c)
function myMouseDown(e)
function myMouseUp(e)



*/

	function getRandomNum(n){
		return Math.floor(Math.random() * n);
	}

	function Ball(x, y){
		this.x1 = x;
		this.y1 = y;
		this.x2 = x;
		this.y2 = y;
		this.gapCount = 0;//pt 4
		/////////////////////

		this.getY = function () {//pt4
			// Move ball down gradually
			return (this.y1 + (this.y2 - this.y1) * (this.gapCount) / 25) * 60 + 100;
		}

		this.moveBall = function (x2, y2, color) {
			this.x2 = x2;
			this.y2 = y2;
			this.color = color;
			this.moving = true;//pt3
			this.gapCount = 25;

			moves.push(this);//pt3
		}

		this.update = function () {//pt4
			this.gapCount--;
			if(this.gapCount <= 0){
				this.moving = false;
			}
		}

	}

	//pt6
	//Game Over function
	function gameOver() {
		ctx.clearRect(0,0, 600, 700);
		tryAgainBtn.style.display = 'inline';
		ctx.font = 'bold 30px Open Sans';//pt7
		ctx.textAlign = 'center';//pt11
		ctx.fillText('Score: ' + score, 300, 250);//pt7

	}

	function setRemoveFlag() {//pt3 this checks if 3 balls in the row
		//this checks if they are 3 in a row vertically
		for(var x=0; x<10; x++){
			var c0 = balls[x][0].color;
			var count = 1;
			for(var y = 1; y<10; y++){
				var c1 = balls[x][y].color;
				if(c0 == c1){
					count++;
					if(count >= 3) {
						balls[x][y-2].remove = true;
						balls[x][y-1].remove = true;
						balls[x][y].remove = true;
					}
				} else {
					c0 = c1;
					count = 1;
				}
			}
		}
		//this checks if they are 3 in a row horizontally
		for( var y = 0; y < 10; y++){
			var c0 = balls[0][y].color;
			var count = 1;
			for(var x = 1; x<10; x++) {
				var c1 = balls[x][y].color;
				if(c0 == c1) {
					count++;
					if(count >= 3) {
						balls[x-2][y].remove = true;
						balls[x-1][y].remove = true;
						balls[x][y].remove = true;
					}
				} else {
					c0 = c1;
					count = 1;
				}
			}
		}

	}

	function fall() {//pt 3 this causes all the balls to fall down
		for(var x = 0; x < 10; x++){
			for(var y = 9, z = 9; y >= 0; y--, z--){
				while(z >= 0){
					if(balls[x][z].remove){
						z--;
					} else {
						break;
					}
				}

				if(y != z) {
					var colorNum = (z >=0 ) ? balls[x][z].color : getRandomNum(6);
					balls[x][y].moveBall(x, z, colorNum);
				}
			}
		}

		//Update Remove Flag
		//Add Score pt7
		//Play sound pt8
		var soundFlag = true;
		for(var x = 0; x<10; x++){
			for(var y = 0; y <10; y++){
				if(balls[x][y].remove){
					balls[x][y].remove = false;
					score += 100;
					//Play sound pt8
					if(soundFlag){
						sound.pause();
						sound.currentTime = 0;
						sound.play();
						soundFlag = false;
					}
				}
			}
		}

	}


	function checkColor(x, y, c){
		var flag = true;
		//this checks if colors match
		if(x>1) {
			var c0 = balls[x-2][y].color;
			var c1 = balls[x-1][y].color;
			if(c0 == c1 && c1 == c){
				flag = false;
			}

		}	


	 	if(y > 1){
			var c0 = balls[x][y-2].color;
			var c1 = balls[x][y-1].color;
			if(c0 == c1 && c1 ==c){
				flag = false;
			}
		}

		return flag;

	}

	//////////////////////////////////////////////////////////



	function myMouseDown(e){
		mouseDownX = e.offsetX;
		mouseDownY = e.offsetY;
	}

	function myMouseUp(e){
		var ballX1 = Math.floor(mouseDownX / 60);
		var ballY1 = Math.floor((mouseDownY - 100) / 60);
		//console.log("ballX: " + ballX1);
		//console.log("ballY: " + ballY1);

		var ballX2 = ballX1;
		var ballY2 = ballY1;
		var mouseUpX = e.offsetX;
		var mouseUpY = e.offsetY;

		if(Math.abs(mouseUpX - mouseDownX) == 0 && Math.abs(mouseUpY - mouseDownX)== 0){
			return;
		} else if (Math.abs(mouseUpX - mouseDownX) > Math.abs(mouseUpY - mouseDownY)) {
			ballX2 += (mouseUpX - mouseDownX > 0) ? 1 : -1;
		} else {
			ballY2 += (mouseUpY - mouseDownY > 0) ? 1: -1;
		}
		//This flips the circles if they do not go out of bounds
		//the two circles are flipped in accordance

		//console.log("ballX: " + ballX2);
		//console.log("ballY: " + ballY2);

		if(balls[ballX1][ballY1].moving || balls[ballX2][ballY2].moving || timer == null) {
			return;

		}

		//Switch Balls Color
		var ballColor = balls[ballX1][ballY1].color;
		balls[ballX1][ballY1].moveBall(ballX2, ballY2, balls[ballX2][ballY2].color);
		balls[ballX2][ballY2].moveBall(ballX1, ballY1, ballColor);



		//pt6
		//Decrease move count
		moveCount--;

		paint();
	}