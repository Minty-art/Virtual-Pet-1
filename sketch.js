//Create variables here
var Pet, happyPet
var dog, happydog
var database
var foodS, foodStock
var canvasWidth, canvasHeight
function preload()
{
	//load images here
  Pet = loadImage("images/dogImg.png")
  happyPet = loadImage("images/dogImg1.png")
  canvasWidth = 500
  canvasHeight = 500
}


function setup() {
	createCanvas(500,500);
  database = firebase.database()
  foodStock =  database.ref('foodS');
  foodStock.on("value", readStock);
  dog = createSprite(canvasWidth/2, canvasHeight/1.25, 60, 60)
  dog.addImage(Pet)
  dog.scale = 0.2
}

function draw() {
  background(46,139,87);

 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(happyPet);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+ foodStock,170,200);
  textSize(20);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodStock= data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<= 0){
    x = 0;
  }else{
    x= x - 1;
  } 
  database.ref('/').update({
    foodS:x
  })
}
