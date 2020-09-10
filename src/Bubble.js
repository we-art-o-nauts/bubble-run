class Bubble {
	// Constructor runs when an object is first made
	constructor(x, y, active=true, responsiveFactor=1) {
		this.x = x;
		this.y = y;
		this.size = random(20, 70) * responsiveFactor;
		this.alpha = random(80, 160);
		this.active = active;
		this.alive = true;
		if (!active) {
			this.alpha = this.alpha/2;
			this.size = this.size/2;
		}
	}

	display() {
		if (!this.alive) return;
		if (!this.active) {
			noStroke();
			fill(255,255,255, this.alpha);
			ellipse(this.x, this.y, this.size, this.size)
			return;
		}
		noStroke();
		fill(76, 102, 214, this.alpha);
		ellipse(this.x, this.y, this.size, this.size)
		// add thumb
		textSize(this.size*0.8);
		text('👍', this.x-this.size/2, this.y+this.size/5);
		fill(0, 102, 153);
	}

	bubbleRise(speed) {
		if (!this.alive) return;
		// decrease Y position of each bubbles
		this.y = this.y - speed;
	}

	bubbleWrap() {
		if (!this.alive) return;
		if (this.y < -this.size) {
			if (!this.active) {
				this.alive = false;
			}
			this.y = height + this.size;
			this.x = random(0, width);
		}
	}
}
