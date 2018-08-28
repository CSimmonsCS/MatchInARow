# MatchInARow
Match-In-A-Row - JavaScript Canvas Game  This game has user switching colored balls to match 3-in-a-row to score the highest amount of points within a limited amount of moves or the user can choose a time trial to score as much as possible within 30 seconds.

This game utilizes a canvas that is initialized to show a randomized board of colored balls, as well as, a scoreboard & # of moves left.  'Basic' & 'Time Trial' buttons are pressed to initialize the board and start the game.  The board is represented with a double array that has a ball for each position.  Balls are shown on screen and when the mouse drags a ball to another, the balls switch colors.  When there’s 3-in-a-row (or more) either vertically or horizontally, the balls above the matched balls collapse down from the top.  When the balls fall down, an animation occurs as they fall.  Each ball that is matched is 100 points-per-ball.  When the # of ‘moves left’ reaches zero, the board is cleared, the ending score is shown, & the game goes back to the start screen.  There is a ‘try again’, ‘time trial’, and ‘basic’ button for the user to select what kind of game they want to play or if they want to retry the same board.  Javascript contains a style.css for the stylings of the game.  JavaScript files are filed dynamically.  The Basic game is as explained prior; limited moves to try to make the most points.  The Time Trial has the user trying to attain the most points as possible within a time limit (30 seconds w/ no limited moveset).  Once the time runs out, a game over screen is shown.

Starting screen:

<img width="605" alt="starting screen" src="https://user-images.githubusercontent.com/18220743/44701234-9b029000-aa42-11e8-8f42-6b87eebef0f6.png">


Basic Game:

Time Trial:

Balls Dropping:

Ending Screen:
