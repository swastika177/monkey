var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 200);
  
  monkey=createSprite(60,140,20,50);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
    ground = createSprite(40,199,2200,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  
  gameOver = createSprite(300,100);
    
  restart = createSprite(300,140);
  
  gameOver.scale = 1;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;


  
}


function draw() {
  
 background("skyblue");
  textSize(20);
  fill(255);
  text("Survivaltime: "+ score, 400,40);
  
  drawSprites();
  
  if (gameState===PLAY){
    if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }
  
    if(keyDown("space") && monkey.y >= 139) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
      
        if(keyDown("space") ) {
      monkey.velocityY = -12; 
          
       monkey.velocityY = monkey.velocityY + 0.8;
  
    }
    }
  
    monkey.collide(ground);
    
    spawnObstacles();
  
   if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
     
    } 
    if (bananaGroup.isTouching(monkey)){
      score=score+1;
      bananaGroup[0].destroy();
    }
  }
  
  else if (gameState === END ) {
    gameOver.visible = true;
    restart.visible = true;
    monkey.addAnimation("collided", monkey_collided);
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    monkey.changeAnimation("collided",monkey_collided);
    monkey.scale =0.35;
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
}

function spawnbanana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
      
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
         
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);    
    //generate random obstacles
    var rand = Math.round(random(1,8));
    switch(rand) {
       
      case 1: obstacle.addImage(sprite_1);
              break;
      case 2: obstacle.addImage(sprite_2);
              break;
      case 3: obstacle.addImage(sprite_3);
              break;
      case 4: obstacle.addImage(sprite_4);
              break;
      case 5: obstacle.addImage(sprite_5);
              break;
      case 6: obstacle.addImage(sprite_6);
              break;
      case 7: obstacle.addImage(sprite_7);
              break;
      case 8: obstacle.addImage(sprite_8);
              break;
              
      default: break;
    }
        
    obstacle.velocityX = -(6 + 3*score/100);
              
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
   gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  monkey.scale =0.5;
   stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);

}