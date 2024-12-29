class Zombie{
    constructor(speed){
        this.speed = speed;
        let y;
        if (random(1) < 0.5){
            y = random(-400, 0);
        }
        else {
            y = random(height, height + 400);
        }

        let x = random(-400, width + 400);
        this.pos = createVector(x, y);
    }

    draw(){
        push();
        fill(100, 255, 100);
        rect(this.pos.x, this.pos.y, 20, 20);
        pop();
    }

    update() {
        let difference = p5.Vector.sub(player.pos, this.pos);
        difference.limit(this.speed);
        this.pos.add(difference);
    }

    ateYou() {
        return dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 20;
      }
}