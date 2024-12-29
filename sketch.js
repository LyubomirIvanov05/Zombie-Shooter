let player;
let zombies = [];
let zombieSpawnTime = 300;
let zombieMaxSpeed = 2;
let frame = 0
let score = 0;
let abilityItem;
let lastAbilitySpawnTime = 0;

function preload(){
  dashSound = loadSound('/dashing.mp4');
  shootingSound = loadSound('/shooting.mp4');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
}

function draw() {
  background(220);
  rectMode(CENTER);
  player.draw();
  player.update();

  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].draw();
    zombies[i].update();

    if (zombies[i].ateYou()) { // add this
      restart();
      break;
    }
    
    if (player.hasShot(zombies[i])) {
      score++;
      zombies.splice(i, 1);
    }
  }

    if (millis() - lastAbilitySpawnTime > 60000) {
      abilityItem = new AbilityItem();
      lastAbilitySpawnTime = millis();
    }

  if (abilityItem) {
      abilityItem.draw();
      if (player.collectAbility(abilityItem)) {
          abilityItem = null; // Remove the ability item after collection
      }
  }
  
  if (frame >= zombieSpawnTime) {
    zombies.push(new Zombie(2));
    zombieSpawnTime *= 0.97;
    frame = 0;
  }
  if (frameCount % 1000 == 0) { // add this
    zombieMaxSpeed += 0.1;
  }
  frame++;

  textAlign(CENTER);
  textSize(40);
  text(score, width/2, 100);
}

function restart() {
  player = new Player();
  zombies = [];
  zombieSpawnTime = 300;
  zombieMaxSpeed = 2;
  score = 0;
  frame = 0;
}
function mouseClicked() {
  player.shoot();
}