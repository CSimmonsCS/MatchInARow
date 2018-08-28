function initialize() {
		//part4
		//timeCount = 60 * 1000; // 1 minute
		timeCount = 30 * 1000; //30 sec pt 11
		score = 0;//pt7


		//creates ball objects
		for(var x=0; x<10; x++) {
			balls[x] = [];
			for(var y = 0; y<10; y++){
				balls[x][y] = new Ball(x,y); 
			}
		}

		//Sets color
		for(var x = 0; x<10; x++){
			for(var y = 0; y < 10; y++){
				while(true){
					var colorNum = getRandomNum(6);
					if(checkColor(x, y, colorNum)){
						balls[x][y].color = colorNum;
						break;
					}
				}
			}
		}

		

		//Set mouse events
		canvas.onmousedown = myMouseDown;
		canvas.onmouseup = myMouseUp;

		//Start timer (pt3)
		timer = setInterval(checkBallStatus, 25);
		bgm.play();//pt8

		//paint();

	}

	function checkBallStatus(){//pt3
		//Decrement time count
		timeCount -= 25;//pt11

		//Speed up background music (bgm) last 5 seconds
		if(bgm.playbackRate == 1 && timeCount < 5000){
			bgm.pause();
			bgm.playbackRate = 1.5;
			bgm.play();
		}

		if (moves.length > 0){

		//Decremenent gapCount//pt4
		for(var i = 0; i< moves.length; i++) {
			moves[i].update();
		}

		//If gapCount remaines, put it back
		moves = moves.filter(//pt4
			function (ball) {
				return ball.gapCount != 0;
			}
		);

		//Moving done
		if(moves.length == 0){
			setRemoveFlag();
			fall();
		}

			
		}

		paint();

		//pt6
		//Game Over
		if(moves.length == 0 && timeCount <= 0){
			clearInterval(timer);
			timer = null;
			bgm.pause();
			bgm.currentTime = 0;
			setTimeout('gameOver()', 500);
			
		}
	}

	

	function paint(){

		//Clear canvas
		ctx.clearRect(0, 0, 600, 700);


		for(var x = 0; x<10; x++){
			for (var y = 0; y<10; y++){
				//drawImage(image, x, y, width, height)
				ctx.drawImage(imageList[balls[x][y].color], x*60, balls[x][y].getY(), 60 ,60);
			}
		}

		//Text
		ctx.font = 'bold 20px Open Sans';
		//ctx.textAlign = 'center';

		//time pt11
		var sec = Math.floor(timeCount / 1000);
		var mSec = timeCount % 1000;

		if(sec < 0) {
			sec = '00';
		}
		else if (sec < 10) {
			sec = '0' + sec;
		}

		if(mSec < 0) mSec = '00';

		//ctx.textAlign = 'center';
		ctx.fillText('Time Left: ' + sec + ' : ' + mSec, 80, 50);
		ctx.fillText('Score: ' + score, 380, 50);
	}