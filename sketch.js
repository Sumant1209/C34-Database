var ball;
var database, position, score

function setup(){
    createCanvas(500,500);
    database = firebase.database()
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballRef = database.ref("ball/position")
    ballRef.on("value",readposition)

    var scoreRef = database.ref("score")
    scoreRef.on("value",readscore)
}

function draw(){
    background("white");
    
    if(position!=undefined){
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
        changeScore(1)
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
        changeScore(1)
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
        changeScore(1)
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
        changeScore(1)
    }
    drawSprites();
    textSize(20)
    fill("red")
    text("Score : "+score,200, 50)
    }
}
function readposition(data){
    position = data.val()
    console.log(position)
    ball.x = position.x
    ball.y = position.y
}

function changePosition(x,y){
    database.ref("ball/position").update({
        x:position.x + x,
        y:position.y + y
    })
}
function readscore(data){
    score = data.val()
}
function changeScore(data){
    database.ref("/").update({ 
        score : score + data
    })
}