var backGround, backGroundImage;
var ballon, ballonImage;
var obstacle, predio1Image, predio2Image, posteImage;
var obstacleGroup, birdsGroup;
var bird, birdImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOverImage;
var restart, restartImage;
var score = 0;
var bottomGround, topGround;
var morte, morteSound;


function preload(){
    backGroundImage = loadImage("assets/bg.png");
    ballonImage = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
    predio1Image = loadImage("assets/obsBottom1.png");
    posteImage = loadImage("assets/obsBottom2.png");
    predio2Image = loadImage("assets/obsBottom3.png");
    birdImage = loadImage("assets/obsTop2.png");
    gameOverImage = loadImage("assets/fimdejogo.png");
    restartImage = loadImage("assets/restart.png");
    morteSound = loadSound("assets/die.mp3");
    ballonParado = loadAnimation("assets/balloon2.png");
}

function setup(){
    createCanvas(1200, 600);

    // imagem de fundo
    backGround=createSprite(600, 300);
    backGround.addImage(backGroundImage);

    //criar balão
    ballon = createSprite(100, 300, 20, 50);
    ballon.addAnimation("balloon", ballonImage);
    ballon.scale = 0.35;



    //criando as bordas
    bottomGround = createSprite(600, 600, 1200, 10);
    bottomGround.visible = true;

    topGround = createSprite(600, 0, 1200, 10);
    topGround.visible = true;

    //criação do gameOver e restart
    gameOver = createSprite(600, 300);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.75;

    restart = createSprite(600, 350);
    restart.addImage(restartImage);
    restart.scale = 0.75;

    

    //criação dos grupos
    birdsGroup = new Group();
    obstacleGroup = new Group();

    


}

function draw() {
    background("black");

    if(gameState == PLAY){
        gameOver.visible = false;
        restart.visible = false;

        score = score + Math.round(frameCount/120);

        //fazendo o balão se movimentar
        if(keyDown("space")){
            ballon.velocityY = -5;
        }

        ballon.velocityY += 0.6;

        //chamar a função de spawnar obstaculos
        spawnObstacles();
        spawnBirds();

        //situação para perder o jogo
        if(obstacleGroup.isTouching(ballon)|| birdsGroup.isTouching(ballon)|| ballon.isTouching(topGround)|| ballon.isTouching(bottomGround)){
            gameState = END;
            morteSound.play();
        } 
    }
    if(gameState == END){
       

        gameOver.visible = true;
        restart.visible = true;

        ballon.velocityY = 0;
        birdsGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
        ballon.changeAnimation("collided", ballonParado);

        birdsGroup.setLifetimeEach(-1);
        obstacleGroup.setLifetimeEach(-1);

        

        if(mousePressedOver(restart)){
            reset();
        }
    }
 

    
    drawSprites();

    //configuração do placar
    push();
    fill(0);
    textSize(20);
    text("Distancia percorrida: " + score, 700, 70);
    pop();
}

function spawnObstacles() {
  if (frameCount%122 == 0){
    var obstacle = createSprite(1200, 550, 90, 120);
    obstacle.velocityX = -4;
    obstacle.scale = 0.22;

    // gerar os obstaculos de forma aleatória
    var rand = Math.round(random(1,3));
    switch(rand){
        case 1 : obstacle.addImage(predio1Image);
        break;

        case 2 : obstacle.addImage(posteImage);
        break;

        case 3 : obstacle.addImage(predio2Image);
        break;

        default:
        break;
    }
    obstacle.lifetime = 350;

    obstacleGroup.add(obstacle);
  }
}

function spawnBirds(){
    if(frameCount%122 == 0){
        var bird = createSprite(1000, 50, 40, 50);
        bird.addImage(birdImage);
        bird.velocityX = -4;
        bird.scale = 0.1;
        bird.y = Math.round(random(50, 380));
        bird.lifetime = 350;
        birdsGroup.add(bird);
    }
}

function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstacleGroup.destroyEach();
    birdsGroup.destroyEach();
    score = 0;
    ballon.y = 300;
}
