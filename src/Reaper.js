class Reaper {
  // Properties are placed inside of the constructor
  // Constructor runs when an object is first made
  constructor(x, y) {
    this.x = x;
    this.y = y; ;
    this.size = random(30, 50);
    this.alpha = random(200, 255)
  }

  display() {
    noStroke();
    fill(211, 91, 140, this.alpha);
    ellipse(this.x, this.y, this.size, this.size);
		// add flame
		textSize(this.size*0.8);
		text('🔥', this.x-this.size/2, this.y+this.size/5);
		fill(0, 102, 153);
  }

	bubbleRise(speed) {
		// decrease Y position of each bubbles
		this.y = this.y - speed;
	}

  bubbleWrap() {
    if (this.y < -this.size) {
      this.y = height + this.size;
      this.x = random(0, width);
    }
  }
}
