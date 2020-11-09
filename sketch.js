
var monkey , monkey_running
var ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var PLAY=1;
var END=0;
var gamestate=PLAY;
var survival_time=0;

function preload()
{
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup()
{
  monkey=createSprite(70,350,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  
  ground=createSprite(400,360,900,10);
  ground.velocityX=0;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
}


function draw() 
{
  background("white")
  monkey.collide(ground);
  if(gamestate===PLAY)
  {
  monkey.velocityY=monkey.velocityY+0.8;
    stroke("black");
    textSize(20);
    fill("black");
    survival_time=Math.ceil(frameCount/frameRate());
    text("Survival Time: "+survival_time,100,50)
  spawn_banana();
  spawn_obstacles();
  if(ground.x<0)
  {
    ground.x=ground.width/2;
  }
  if(keyDown("space")&& monkey.y>=324)
  {
    monkey.velocityY=-12;
  }
  if(obstacleGroup.isTouching(monkey))
  {
    gamestate=END;
  }
  }
  if(gamestate===END)
  {
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival Time: "+survival_time,100,50)
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1)
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }

  monkey.debug=false;
  drawSprites();
}

//spawn bananas
function spawn_banana()
  {
    if(frameCount%80==0)
      {
          banana=createSprite(400,Math.round(random(120,200)),20,20);
          banana.addImage(bananaImage);
          banana.scale=0.1;
          banana.velocityX=-5;
          banana.lifetime=80;
          FoodGroup.add(banana);
      }  
  }

//spawn obstacles
function spawn_obstacles()
  {
      if(frameCount%60==0)
        {
           obstacle=createSprite(Math.round(random(170,400)),335,20,20); 
           obstacle.addImage(obstacleImage);
           obstacle.scale=0.1;
           obstacle.velocityX=-5; 
           obstacle.lifetime=80;
           obstacleGroup.add(obstacle)
        }
  }




