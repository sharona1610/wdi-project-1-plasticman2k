// function setup() {
//   createCanvas(600, 300);
// }
//
// function draw() {
//   ellipse(50, 50, 80, 80);
//   border(white);
// }

// function draw() {
//   var canvas = document.getElementById('myCanvas');
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');
//
//     ctx.fillRect(500, 500, 300, 300);
//     ctx.clearRect(45, 45, 60, 60);
//     ctx.strokeRect(50, 50, 50, 50);
//   }
// }
//
// var canvas = document.getElementById('myCanvas');
//     if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');
//
//     ctx.fillStyle = 'rgb(200, 0, 0)';
//     ctx.fillRect(10, 10, 50, 50);
//
//     ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';      ctx.fillRect(30, 30, 50, 50);
// }

// var canvas = document.createElement("canvas");
// var ctx = canvas.getContext("2d");
// canvas.width = 600;
// canvas.height = 300;
// document.body.appendChild(canvas);
//
// var bgReady = false;
// var bgImage = new Image();
// bgImage.onload = function () {
// 	bgReady = true;
// };
// bgImage.url = "http://cdn6.bigcommerce.com/s-yyj2m/products/333/images/1191/PM0088-trench-run-starwars__96258.1470248288.250.300.jpg?c=2";
//
// var hero = {
// 	speed: 256, // movement in pixels per second
// 	x: 0,
// 	y: 0
// };
// var monster = {
// 	x: 0,
// 	y: 0
// };
// var monstersCaught = 0;
//
// var keysDown = {};
//
// addEventListener("keydown", function (e) {
// 	keysDown[e.keyCode] = true;
// }, false);
//
// addEventListener("keyup", function (e) {
// 	delete keysDown[e.keyCode];
// }, false);
//
// var reset = function () {
// 	hero.x = canvas.width / 2;
// 	hero.y = canvas.height / 2;
//
// 	// Throw the monster somewhere on the screen randomly
// 	monster.x = 32 + (Math.random() * (canvas.width - 64));
// 	monster.y = 32 + (Math.random() * (canvas.height - 64));
// };
//
// var update = function (modifier) {
// 	if (38 in keysDown) { // Player holding up
// 		hero.y -= hero.speed * modifier;
// 	}
// 	if (40 in keysDown) { // Player holding down
// 		hero.y += hero.speed * modifier;
// 	}
// 	if (37 in keysDown) { // Player holding left
// 		hero.x -= hero.speed * modifier;
// 	}
// 	if (39 in keysDown) { // Player holding right
// 		hero.x += hero.speed * modifier;
// 	}
//
// 	// Are they touching?
// 	if (
// 		hero.x <= (monster.x + 32)
// 		&& monster.x <= (hero.x + 32)
// 		&& hero.y <= (monster.y + 32)
// 		&& monster.y <= (hero.y + 32)
// 	) {
// 		++monstersCaught;
// 		reset();
// 	}
// };
//
// var render = function () {
// 	if (bgReady) {
// 		ctx.drawImage(bgImage, 0, 0);
// 	}
//
// 	if (heroReady) {
// 		ctx.drawImage(heroImage, hero.x, hero.y);
// 	}
//
// 	if (monsterReady) {
// 		ctx.drawImage(monsterImage, monster.x, monster.y);
// 	}
//
// 	// Score
// 	ctx.fillStyle = "rgb(250, 250, 250)";
// 	ctx.font = "24px Helvetica";
// 	ctx.textAlign = "left";
// 	ctx.textBaseline = "top";
// 	ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
// };
//
// var main = function () {
// 	var now = Date.now();
// 	var delta = now - then;
//
// 	update(delta / 1000);
// 	render();
//
// 	then = now;
//
// 	// Request to do this again ASAP
// 	requestAnimationFrame(main);
// };
//
// // var w = window;
// requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
//
// // Let's play this game!
// var then = Date.now();
// reset();
// main();

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
