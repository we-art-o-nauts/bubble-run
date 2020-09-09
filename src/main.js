/**
 * Bubble Run!
 *
 * @author Xuechun Wu
 * @author Xuan Huang
 * @author Oleg Lavrovsky
 */

var quotes = [
	"Seek those who fan your flames",
	"Just before sunrise there is a dark night",
	"Motivation comes from working on things we care about",
	"Be who you want you to be, not who they want you to be",
	"Float like a butterfly sting like a bee"
];

var fairy;
var bubbles = [];
var reapers = [];
var numNPC = 15;
var canvasSize = 600;
var gameOver = false;
var gameFinished = false;
var timer;
var globalSpeed;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	initGame()
	initUI()
}

function initUI(){
	gj = document.querySelector('#gamejam');
	gj.style.display='none';
}

function initGame(){
	gameOver = false;
	globalSpeed = 1;
	fairy = new Fairy();
  for (var i = 0; i < this.numNPC; i++) {
    bubbles[i] = new Bubble(random(0, width), random(height, 2 * height));
    reapers[i] = new Reaper(random(0, width), random(height, 2 * height));
  }
}

function hitTest(c1, c2){
	return dist(c1.x, c1.y, c2.x, c2.y) <= (c1.size + c2.size)/2;
}

function draw() {
	// guard.
	if (gameOver && !gameFinished) {

		gj = document.querySelector('#gamejam');
		gj.style.display='block';

		var inspiration = quotes[Math.round(Math.random()*(quotes.length-1))];
		inspiration = '«' + inspiration.toUpperCase() + '»';

		background(254, 210, 43);
		textAlign(CENTER);
		var margin = 50;
		fill(255);
		textSize(80);
		text(inspiration, margin, 220, width-2*margin, height/2)

		fill(0);
		textSize(60);
		text("Join us for #PlayBern 🚀 15-18.10.2020", margin, margin, width-2*margin, height/2)

		fill(0);
		textSize(36);
		text("⌛ " + Math.round(timer) + " seconds", margin, height-margin*5, width-2*margin, height/2)

		gameFinished = true;
		return;
	}
	if (gameOver && gameFinished) { return; }


	// hit test
  for (var i = 0; i < this.numNPC; i++) {
		if (hitTest(fairy, reapers[i])) {
			reapers[i] = new Reaper(random(0, width), height * 1.2);
			// console.log("hit reaper " + i);
			fairy.size = fairy.size - 20
			if (fairy.size <= 0) {
				gameOver = true;
			}
		}
		if (hitTest(fairy, bubbles[i])) {
			bubbles[i] = new Bubble(random(0, width), height * 1.2)
			// console.log("hit bubble " + i);
			fairy.size = fairy.size + 10
		}
  }

	// draw
	background(0, 190, 220);
  for (var i = 0; i < this.numNPC; i++) {
    bubbles[i].display();
    bubbles[i].bubbleRise(globalSpeed);
    bubbles[i].bubbleWrap();

    reapers[i].display();
    reapers[i].bubbleRise(globalSpeed);
    reapers[i].bubbleWrap();

    fairy.move();
    fairy.display();
	}

	// update timer
	timer = (millis()/1000).toFixed(3);
	textSize(20);
	text("🕑 " + timer, 10, 10, width, height)

	// update speed
	globalSpeed = int(timer) / 4;
	if (globalSpeed < 1) globalSpeed = 1;
}
