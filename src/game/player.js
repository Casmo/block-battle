var player = {
    x: 20,
    y: 20,
    mouseX: 0,
    mouseY: 0,
    minX: 0,
    minY: 0,
    maxX: 1900, // 1920 - (20 / 2)
    maxY: 1060, // 1080 - (20 / 2)
    size: 20,
    color: 'green',
    speedX: 0,
    speedY: 0,
    maxSpeed: 8,

    render: function(ctx) {
        // Draw the square on the canvas
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo((this.x + this.size / 2),(this.y + this.size / 2));
        ctx.lineTo(this.mouseX, this.mouseY);
        ctx.stroke();
    },

    addSpeedX: function (speed) {
        this.speedX += speed;
        if (this.speedX > this.maxSpeed) {
            this.speedX = this.maxSpeed;
        }
        else if (this.speedX < (-this.maxSpeed)) {
            this.speedX = (-this.maxSpeed);
        }
    },

    addSpeedY: function (speed) {
        this.speedY += speed;
        if (this.speedY > this.maxSpeed) {
            this.speedY = this.maxSpeed;
        }
        else if (this.speedY < (-this.maxSpeed)) {
            this.speedY = (-this.maxSpeed);
        }
    },

    animate: function() {
        // Animate the square by moving it to the right
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < this.minX) {
            this.x = this.minX;
            this.speedX = (-this.speedX);
        }
        else if (this.x > this.maxX) {
            this.x = this.maxX;
            this.speedX = (-this.speedX);
        }
        if (this.y < this.minY) {
            this.y = this.minY;
            this.speedY = (-this.speedY);
        }
        else if (this.y > this.maxY) {
            this.y = this.maxY;
            this.speedY = (-this.speedY);
        }

        this.speedY = this.speedY * .99;
        this.speedX = this.speedX * .99;
    }
}

export { player };