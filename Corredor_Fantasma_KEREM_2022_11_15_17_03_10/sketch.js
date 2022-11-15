var torre,torreImg;
var fantasma,fantasmaImg;
var door, doorimg
var barandal,barandalimg;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var sonido;

function preload(){
  towerImg=loadImage("tower.png");
  fantasmaImg=loadImage("fj.png","fs.png");
  doorimg=loadImage("door.png");
  barandalimg=loadImage("climber.png");
  sonido=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  torre= createSprite(300,300);
  torre.addImage("tower",towerImg);
  torre.velocityY=2;
  doorgroup=new Group();
  barandalgroup= new Group();
  pisoinvgruup= new Group();
  fantasma=createSprite(300,300,50,50);
  fantasma.addImage(fantasmaImg);
  fantasma.scale=0.3;
  fantasma.debug=true
  sonido.play();
}

function draw(){
  background("black");
  drawSprites();
  



  fill ("yellow")
  text(mouseX + " - " + mouseY, mouseX,mouseY);

  if (gamestate===PLAY){
    if(torre.y>550 ){
      torre.y = 0;
   }
   
   if(keyDown("space"))// Si presiona la tecla espacio
      {
        fantasma.velocityY=-5; // movimiento hacia arriba
      }
   
   if(keyDown("left")){
    fantasma.x= fantasma.x - 5;
   }
   
   if(keyDown("right")){
       fantasma.x= fantasma.x + 5;   
   }
   
   
   fantasma.velocityY=fantasma.velocityY + 0.8;// Gravedad.
   createwindow();
   if (barandalgroup.isTouching(fantasma)){
    gamestate=END;
   }


   if (pisoinvgruup.isTouching(fantasma)){
    fantasma.velocityY=0
    fantasma.setCollide(pisoinvgruup);
   }
  }

  if (gamestate===END||fantasma.y>700){
    fantasma.velocityY=0
    fill("red");
    textSize(30);
    text("GAME OVER",230,250,);
    doorgroup.setVelocityYEach(0);
    barandalgroup.setVelocityYEach(0);
    torre.velocityY=0;
    fantasma.destroy();
    pisoinvgruup.setVelocityYEach(0);
  }



}

function createwindow(){
var frecuencia
var doorpos
doorpos=Math.round(random(77,522));
frecuencia=Math.round(random(100,300));
if (frameCount %frecuencia  === 0){
door=createSprite(doorpos,-5,30,30);
door.addImage(doorimg);
door.velocityY=5;
door.lifetime=350;
fantasma.depth=door.depth+1;
barandal=createSprite(200,10,);
barandal.addImage(barandalimg);
barandal.velocityY=door.velocityY;
barandal.x=door.x;
barandal.y=barandal.y+50;
barandal.lifetime=350;
fantasma.depth=barandal.depth+1;
doorgroup.add(door);
barandalgroup.add(barandal);
pisoinvisible=createSprite(200,15);
pisoinvisible.width=barandal.width
pisoinvisible.height=2
pisoinvisible.velocityY=door.velocityY;
pisoinvisible.x=barandal.x;
pisoinvisible.y=pisoinvisible.y+35
pisoinvgruup.add(pisoinvisible);
pisoinvisible.visible=false;
barandal.debug=true;
barandal.setCollider("rectangle",0,0,50,20 )
}
}
