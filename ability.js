class AbilityItem {
    constructor() {
        this.pos = createVector(random(50, width - 50), random(50, height - 50));
    }

    draw() {
        push();
        fill(255, 215, 0); // Gold color for the ability item
        ellipse(this.pos.x, this.pos.y, 20, 20);
        pop();
    }
}   