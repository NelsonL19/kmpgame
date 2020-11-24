#!kmpgame

<h1>KMP's Spicy 9 Adventure GitHub ReadMe</h1>

## Gameplay Manual
<p>For both players, use the arrow keys to move around the board</p>
<h2>Controls</h2>
    <h3>Player 1</h3>
        <p>You Control KMP and your job is to collect all the sushi tiles before other CS professors can catch you!</p>

<h2>Player 2</h2>
    <p>You play as other CS Professors and your goal is to catch KMP before he can collect all the sushi!</p>

## Technical Details
<h2> Server-Side </h2>
    <h5>Controller.js<h5>
    <h5>Match.js</h5>
        <p>As multiple games may occur and often do occur simultaneously, we need a way to track various instances of MVC objects. Math.js is an object that creates and stores the Controller, Game (model), and both View objects. It also stores the connections related to each player to allow information to be passed to the correct location.</p>
    <h5>Game.js</h5>
        <p>This is the model for the game and dictates interaction between the players and objects on the board, as well as the movement of the NPCs. The file consists of one object class, Game, similar to the engine of 2048. It also is responsible for parsing premade board arrays and constructing the board table.</p>
    <h5>View.js</h5>
        <p>View.js creates a view object representation of the current game, indicated by the socket object created and provided by clientView.js. This file handles and sends information of current game (players, score, and time) and handles when a game ends and who the winner is.</p>
    <h5>Index.js</h5>
        <p>The main role of Index.js is to organize connections and allow sockets to communicate with eachother. If one socket needs to communicate with another, generally it will send its communication to Index.js who will then pass it to the right socket. It also handles the in-game chat, invitation system, and creates new Match objects.</p>
    <h5>Boards.js</h5>
        <p>A collection of pre-made boards on our backend which are passed into Game.js. Game.js will render both a string an object representation of these boards.</p>
<h2> Client-Side </h2>
    <h5>clientView.js</h5>
        <p> The clientView.js mainly serves the purpose of dynamically rendering HTML and taking using input. It does do some communication with Index.js, requesting for information to be updated, deleted, or given. It also serves as half of the bridge linking backend View object to the client-facing view.</p>

## Socket.io/Express Handling
<h5>Socket.on</h5>  
    <p>Socket.on registers an event listener to that particular connection. When it recieves the correct emit (as specified in the listener), it will execute the provided callback function, passing any parameters in the order sent by the emit.</p>
<h5>Socket.emit</h5>
    <p>Socket.emit allows one connection to send a message to another connection or connection(s), telling them to execute the callback functions associated with the emit message. The emit can also include parameters and passes them in the order they are provided.</p>

## Gameplay Production Code
<h5>CSS Files</h5>
    <h6>styles.css</h6>
        <p>A custom made stylesheet providing images for each table cell based on class name (i.e. player, enemy, sashimi, munsell, etc.). Also adds customization to our lobby room chat box.</p>
    <h6>bulma</h6>
        <p>External css stylesheet</p>
<h5>Images</h5>
    <p>Game images desgined by Alex Harvey</p>
    <p>Logos designed by Andres Menjivar</p>
<h5>Music</h5>
    <p>Music by Alex Harvey</p>
<h5>NPC A.I. development</h5>
    <p>Souls thrust into the computer science professors by Sam Miller</p>
<h5>Realtime Gameplay Integration (Genius behind socket.io)</h5>
    <p>Sam Miller</p>
<h5>Data Base and Backend</h5>
    <p>Nelson Lopez and Andres Menjivar</p>

<!--<p>Nelson Lopez originally established this in the early 1700s on dare from Kris Jordan's Ancestors. They all said he couldn't do it, especially considering computers hadn't been invented yet. But who's laughing now? Not Kris Jordan, that's for sure.</p>-->

## Final Thoughts 
<p>We had a lot of fun making this game and will continue develop it even after this course concludes.</p>

## Credits
<h3>Nelson Lopez [Assistant to the Assistant to the Regional Manager]: Full Stack Development</h3>
<h3>Sam Miller [Assistant to the Regional Manager]: Full Stack Development</h3>
<h3>Andres Menjivar [Regional Manager]: Frontend Development and Design</h3>
<h3>Alexander Harvey [District Manager]: Frontend Development and Art</h3>
