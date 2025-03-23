export class Ball {
    x;
    y;
    rad;
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.strokeStyle = "blue";
        ctx.strokeWidth = 1;
        ctx.fill();
        ctx.stroke();
    }
}