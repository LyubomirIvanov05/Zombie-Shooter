let dashSound;
let shootingSound;



class Player {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.angle = 0;
        this.bullets = [];

        this.isDashing = false;
        this.dashSpeed = 8;
        this.dashDuration = 15; // frames
        this.dashCooldown = 60; // frames
        this.dashTimer = 0;
        this.dashCooldownTimer = 0;
        this.dashDirection = createVector(0, 0);

        this.hasAutoGun = false; // Indicates if the player has the auto gun
        this.autoGunTimer = 0; 

    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rect(0, 0, 20, 20);
        pop();

        for (let bullet of this.bullets) {  // add this
            bullet.update();
            bullet.draw();
        }

        this.drawDashCooldownBar();
    }
    
    drawDashCooldownBar() {
        push();
        const barWidth = 150; // Width of the bar
        const barHeight = 20; // Height of the bar
        const barX = 100; // Fixed position in the top left
        const barY = 50;
    
        const progress = (this.dashCooldown - this.dashCooldownTimer) / this.dashCooldown;

    
        noStroke();
        fill(200); 
        rect(barX, barY, barWidth, barHeight);

        fill(100, 255, 100);
        rect(barX, barY, barWidth * progress, barHeight);

        fill(0);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("Dash Cooldown", barX - barWidth / 4, barY - barHeight);

        stroke(0);
        noFill();
        rect(barX, barY, barWidth, barHeight);
        pop();
    }


    update() {

        if (this.dashCooldownTimer > 0) {
            this.dashCooldownTimer--;
        }

        if (this.isDashing) {
            this.pos.add(this.dashDirection.copy().mult(this.dashSpeed));
            this.dashTimer--;

            if (this.dashTimer <= 0) {
                this.isDashing = false;
                this.dashCooldownTimer = this.dashCooldown;
            }
            return; 
        }

        let xSpeed = 0;
        let ySpeed = 0;
        //65 - A 83 - S 68 - D 87 - W
        if(keyIsDown(87)) {
            ySpeed -= 3;
        }

        if(keyIsDown(83)) {
            ySpeed += 3;
        }

        if(keyIsDown(65)) {
            xSpeed -= 3;
        }

        if(keyIsDown(68)) {
            xSpeed += 3;
        }

        let movement = createVector(xSpeed, ySpeed);
        if (movement.mag() > 0) {
            movement.normalize();
        }
        this.pos.add(movement.mult(2));
        this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);

        if (keyIsDown(32) && this.dashCooldownTimer <= 0 && movement.mag() > 0) {
            this.isDashing = true;
            this.dashTimer = this.dashDuration;
            this.dashDirection = movement.copy(); // Store the current direction

            if (!dashSound.isPlaying()) {
                dashSound.play();
            }
        }

        if (this.hasAutoGun) {
            this.autoGunTimer--;
            if (this.autoGunTimer <= 0) this.hasAutoGun = false;
            if (mouseIsPressed) this.shoot();
        }
        
    }
    shoot() { // add this
        shootingSound.play();
        this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
    }

    hasShot(zombie) {
    for (let i = 0; i < this.bullets.length; i++) {
        if (dist(this.bullets[i].x, this.bullets[i].y, zombie.pos.x, zombie.pos.y) < 15) {
        this.bullets.splice(i, 1);
        return true;
        }
    }
        return false;
    }

    collectAbility(item) {
        if (dist(this.pos.x, this.pos.y, item.pos.x, item.pos.y) < 20) {
            this.hasAutoGun = true;
            this.autoGunTimer = 600; // Auto gun lasts 10 seconds (assuming 60 FPS)
            return true;
        }
        return false;
    }
}