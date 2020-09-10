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

// Sampled color data (see README)
var aare = [
	[102, 132, 153],
	[173, 192, 186],
	[113, 174, 182],
	[136, 135, 131],
	[108, 144, 127],
	[ 98, 156, 169],
	[110, 139, 173],
	[106, 167, 156]
];
var bgcolor = aare[Math.round(Math.random()*(aare.length-1))];

var fairy;
var bubbles = [];
var reapers = [];
var poppers = [];
var numNPC = 15;
var numDECO = 100;
var decoSpeed = 7;
var canvasSize = 600;
var gameOver = false;
var gameFinished = false;
var responsiveFactor = 1;
var timer;
var globalSpeed;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	responsiveFactor = (width < 800) ? 0.5 : (width < 400) ? 0.25 : 1;
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
    bubbles[i] = new Bubble(random(0, width), random(height, 2 * height), true, responsiveFactor);
    reapers[i] = new Reaper(random(0, width), random(height, 2 * height), responsiveFactor);
  }
	// generate deco-bubbles
	poissonDisc = poissonDiscSampler(width, height, Math.round(width/2));
  for (var i = 0; i < this.numDECO; i++) {
		var coords = poissonDisc();
    poppers[i] = new Bubble(coords[0], coords[1], false, responsiveFactor);
  }
	// draw more bubbles from time to time
	setTimeout(moarBubbles, 5000);
}

function moarBubbles() {
	poissonDisc = poissonDiscSampler(width, height, Math.round(width/2));
  for (var i = 0; i < this.numDECO; i++) {
		var coords = poissonDisc();
    poppers[i] = new Bubble(coords[0], height+coords[1], false, responsiveFactor);
  }
	setTimeout(moarBubbles, 5000 + timer*200);
}

function hitTest(c1, c2){
	return dist(c1.x, c1.y, c2.x, c2.y) <= (c1.size + c2.size)/2;
}

function draw() {
	// guard.
	if (gameOver && !gameFinished) {
		return endGame();
	}
	if (gameOver && gameFinished) { return; }


	// hit test
  for (var i = 0; i < this.numNPC; i++) {
		if (hitTest(fairy, reapers[i])) {
			reapers[i] = new Reaper(random(0, width), height * 1.2, responsiveFactor);
			// console.log("hit reaper " + i);
			fairy.size = fairy.size - 20
			if (fairy.size <= 0) {
				gameOver = true;
			}
		}
		if (hitTest(fairy, bubbles[i])) {
			bubbles[i] = new Bubble(random(0, width), height * 1.2, true, responsiveFactor)
			// console.log("hit bubble " + i);
			fairy.size = fairy.size + 10
		}
  }

	// time penalty
	fairy.size = fairy.size - 0.1
	if (fairy.size <= 0) { gameOver = true; }

	// draw
	background(bgcolor); // (0, 190, 220);

	// draw decoration
  for (var i = 0; i < this.numDECO; i++) {
    poppers[i].display();
    poppers[i].bubbleRise(decoSpeed);
    poppers[i].bubbleWrap();
  }

	// draw NPCs
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

function endGame() {
	gj = document.querySelector('#gamejam');
	gj.style.display='block';

	var inspiration = quotes[Math.round(Math.random()*(quotes.length-1))];
	inspiration = '«' + inspiration.toUpperCase() + '»';

	background(254, 210, 43);
	textAlign(CENTER);
	var margin = 50;
	fill(255);
	textSize(80 * responsiveFactor);
	text(inspiration, margin, 120 + 100 * responsiveFactor, width-2*margin, height/2)

	fill(0);
	textSize(60 * responsiveFactor);
	text("You're invited to #PlayBern 🚀15-18.10.2020", margin, margin, width-2*margin, height/2)

	fill(0);
	textSize(36 * responsiveFactor);
	text("⌛ " + Math.round(timer) + " seconds", margin, height-margin*5, width-2*margin, height/2)

	gameFinished = true;
}
