var c1;
var c2;
var c3;
var c4;
var c5;
var c6;
var cList;
var cSet = [false, false, false, false, false, false];

//vars used to set the position of the tokens
var cPos1;
var cPos2;
var cPos3;
var cPos4;
var cPos5;
var cPos6;
var cPosSet = [cPos1,cPos2,cPos3, cPos4, cPos5,cPos6];


var race;

//vars used to set character information
var pack1;
var pack2;
var pack3;
var pack4;
var pack5;
var pack6;
var packList = [pack1, pack2, pack3, pack4, pack5, pack6];

var goldText;
var attackText;
var lifeText;
var playerName;
var deletePlayer;


var card;
var board;

var question;
var test;

var token1;
var token2;
var token3;
var token4;
var token5;
var token6;
var tokenList;
var tokenName;

var dice;

var currentRace;
var getPlayer;

var boardSpaces = [];
var spaceMaker = 0;

var turn = 0;
var turnManagerButton;
var turnText;
var currentPlayer = 1;
var aSpot;
var bSpot;


var playState = {
 
create: function () {

    //Create Game Board
    board = this.game.add.sprite(300,0, 'board');
    
    tokenList = this.game.add.group();
    tokenList = [token1, token2, token3, token4, token5, token6];
    
    
    //Create Character Frames
    c1 = this.game.add.sprite(100, 50, 'sheet');
    c2 = this.game.add.sprite(100, 200, 'sheet');
    c3 = this.game.add.sprite(100, 350, 'sheet');
    
    c4 = this.game.add.sprite(1000, 50, 'sheetX');
    c5 = this.game.add.sprite(1000, 200, 'sheetX');
    c6 = this.game.add.sprite(1000, 350, 'sheetX');
    
    cList = [c1,c2,c3,c4,c5,c6];
    
    TurnOnCharacters();

    //Create Card
    card = this.game.add.button (75, 500, 'card', ShowQuestion, this, 2,1,0);
    
    //Create Die    
    dice = this.game.add.sprite(950, 500, 'die');
    dice.animations.add('roll', [0,1,2,3,4,5], 10, true);
    dice.inputEnabled = true;
    dice.events.onInputDown.add(rollDie, this);
    
    CreateBoardSpaces();
    
    //Create Turn Management Button
    turnManagerButton = this.game.add.button(1050, 500, "turnButton", manageTurn, 2,1,0);
    turnText = this.game.add.text(turnManagerButton.width/2, turnManagerButton.height/2, "start", { font: "40px Arial", fill: "black", align: "center" }); 
    turnManagerButton.addChild(turnText);
    turnText.anchor.set(0.5, 0.5);
    
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
    this.scale.setScreenSize( true );
},

update: function() {
    
    

}
  
};

function CreateBoardSpaces() {
    
    for (var i = 0; i < 24; i++) {
        
        var space = [0,0];
        
        boardSpaces.splice(i,0, space);
        
        if (i < 6) {
            
            boardSpaces[i][0] = (board.x + (spaceMaker * 85.71));
            boardSpaces[i][1] = (board.y);
        }
        
        if (i > 5 && i < 12) {
            
            boardSpaces[i][0] = (board.x + (board.width - 85.71));
            boardSpaces[i][1] = (board.y + (spaceMaker * 85.71));
            
        }
        
        if (i > 11 && i < 18) {
        
            boardSpaces[i][0] = (board.x + (board.width - 85.71) - (spaceMaker * 85.71));
            boardSpaces[i][1] = (board.height - 85.71);
        
        }
        
        if (i > 17 && i < 25) {
            
            boardSpaces[i][0] = (board.x);
            boardSpaces[i][1] = ((board.height - 85.71) - (spaceMaker * 85.71));
            
        }

        spaceMaker += 1;
        
        if (spaceMaker == 6) {
            spaceMaker = 0;
            
        }
        
        
    }
    
    
    
}

function manageTurn () {
    //console.log(turn);
    switch (turn) {
        case 0:
            turnText.setText("roll");
            turn += 1;
            break;
    }
    
    
    
}

function movePlayer (spot) {
    
    tokenList[currentPlayer - 1].position.x = spot.x;
    tokenList[currentPlayer - 1].position.y = spot.y;
    
    //YOU HAVE TO MOVE THIS!!! THIS WILL BE LAID DOWN LAST!!!!!S
    
    if (currentPlayer > tokenList.length) {
        
        currentPlayer = 1;
        
    }
    else {
    
        currentPlayer += 1;
        
    }
    
    
    
    aSpot.destroy();
    bSpot.destroy();
    
    
    
}


function rollDie() {
    
    dice.animations.play('roll');
    
    //timer
    var rollTimer = this.game.time.create(false);
    
    var rollTime = Math.floor(((Math.random() * 3) + 3) * 1000);
    
    rollTimer.add(rollTime, stopDie, this);
    
    rollTimer.start();
}

function stopDie () {
    
    dice.animations.stop();
    
    if (turn == 1) {
        
        var newSpot1 = (dice.animations.currentAnim.frame + 1) + cPosSet[currentPlayer - 1];
        var newSpot2 = cPosSet[currentPlayer - 1] - (dice.animations.currentAnim.frame + 1);
        console.log("turn = " + currentPlayer);
        console.log("NS1 = " + newSpot1);
        console.log("NS2 = " + newSpot2);
        
        if (newSpot1 > 23) {
            
            newSpot1 -= 24;
            
        }
        
        if (newSpot2 <= -1) {
            
            newSpot2 = 24 + newSpot2;
        }
        
        var aX = boardSpaces[newSpot1][0];
        var aY = boardSpaces[newSpot1][1];
        var bX = boardSpaces[newSpot2][0];
        var bY = boardSpaces[newSpot2][1];
        
        aSpot = this.game.add.button(aX, aY, "aSpot", movePlayer, this, 2,1,0);
        bSpot = this.game.add.button(bX, bY, "bSpot", movePlayer, this, 2,1,0);
    }
    
}


function TurnOnCharacters () {
    
    for (var i = 0; i < 6; i++) {
        
        cList[i].inputEnabled = true;
        cList[i].events.onInputDown.add(AddStats, cList[i]);
        cList[i].name = "c" + (i + 1).toString();
        
        packList[i] = this.game.add.group();
    }
}


function AddStats(player) {
        
        for (var i = 0; i < cSet.length; i++) {
            
            var pName = player.name;
            
            var setPlayer = parseInt(pName.substring(1,2)) - 1;
            
            if (setPlayer == i && cSet[i] == false) {
                
                cSet[i] = true;
                
                player.addChild(packList[i]);
                
                PickRace(player, i);
        
                var modifier = [-1, 1, 2];
                var pick = Math.floor(Math.random() * modifier.length);
                var gold = (4 + modifier[pick]).toString();
                modifier.splice(pick, 1);
                
                pick = Math.floor(Math.random() * modifier.length);
                var attack = (4 + modifier[pick]).toString();
                modifier.splice(pick, 1);
                
                var life = (4 + modifier[0]).toString();
                
                var goldStyle = { font: "25px Impact", fill: "green", 
                wordWrap: true, align: "center", backgroundColor: "transparent" };
                
                var attackStyle = { font: "25px Impact", fill: "white", 
                wordWrap: true, align: "center", backgroundColor: "transparent" };
                
                var lifeStyle = { font: "25px Impact", fill: "black", 
                wordWrap: true, align: "center", backgroundColor: "transparent" };
                
                if (player == c1 || player == c2 || player == c3) {
                
                    goldText = this.game.add.text(16, 3, gold, goldStyle);
                    attackText = this.game.add.text(9, 46, attack, attackStyle);
                    lifeText = this.game.add.text(16, 88, life, lifeStyle);
                    deletePlayer = this.game.add.button(80, -10, 'deleteX', DeletePlayer, this, 2,1,0);
                    packList[i].add(deletePlayer);
                    packList[i].add(goldText);
                    packList[i].add(attackText);
                    packList[i].add(lifeText);
                    
                }
                else {
                
                    goldText = this.game.add.text(72, 3, gold, goldStyle);
                    attackText = this.game.add.text(79, 46, attack, attackStyle);
                    lifeText = this.game.add.text(72, 88, life, lifeStyle);
                    deletePlayer = this.game.add.button(-20, -10, 'deleteX', DeletePlayer, this, 2,1,0);
                    packList[i].add(deletePlayer);
                    packList[i].add(goldText);
                    packList[i].add(attackText);
                    packList[i].add(lifeText);
                }

                playerName = this.game.add.text(10, 120, currentRace + (i + 1).toString(), { font: "20px Arial", fill: "white", align: "center" }, packList[i]); 

                deletePlayer.input.priorityID = 10;
                
                CreateToken(i);
                
                return;
            }
            
            
            
        }
}


function PickRace(player, number) {
    var randomChoice = Math.floor(Math.random() * 6);
    
       if (player == c1 || player == c2 || player == c3) {
        
            var x = 55;
            var y = 65;
        }
        else {
        
            x = 45;
            y = 65;
        }
    
    
    
    switch (randomChoice) {
        case 0:
            race = this.game.add.sprite(x, y, 'elf');
            packList[number].add(race);
            race.anchor.set(0.5,0.5);
            currentRace = "elf";
            break;
        
        case 1:
            race = this.game.add.sprite(x, y, 'hobbit');
            packList[number].add(race);
            race.anchor.set(0.5,0.5);
            currentRace = "hobbit";
            break;
        
        case 2:
            race = this.game.add.sprite(x, y, 'knight');
            packList[number].add(race);
            race.anchor.set(0.5,0.5);
            currentRace = "knight";
            break;
                
        case 3:
            race = this.game.add.sprite(x, y, 'ogre');
            packList[number].add(race);
            race.anchor.set(0.5,0.5);
            currentRace = "ogre";
            break;
    
        case 4:
            race = this.game.add.sprite(x, y, 'warrior');
            packList[number].add(race);
            race.anchor.set(0.5,0.5);
            currentRace = "warrior";
            break;
        
        case 5:
            race = this.game.add.sprite(x, y, 'wizard');
            packList[number].add(race);
            race.anchor.set(0.5,0.5);
            currentRace = "wizard";
            break;
   
    }
    
}

function CreateToken(player) {
    //outer box = x85.71 y85.71
    //player is equal to i from AddStats()
    
    var startSpaceXY = Math.floor(Math.random() * 24);
    
    var tokenX = boardSpaces[startSpaceXY][0];
    var tokenY = boardSpaces[startSpaceXY][1];
    
    cPosSet[player] = startSpaceXY;
    console.log(cPosSet[player]);
    
    tokenList[player] = this.game.add.sprite(tokenX, tokenY, currentRace);
    tokenList[player].x = tokenX; 
    tokenList[player].inputEnabled = true;
    tokenList[player].input.enableDrag(false);

    tokenList[player].name = currentRace + (player).toString();
    tokenName = this.game.add.text(0, 0, currentRace + (player + 1).toString(), { font: "20px Arial", fill: "white", align: "center" });
    tokenList[player].addChild(tokenName);
    tokenName.y = tokenList[player].height;
    
 

}

function ShowQuestion() {
    
    question = this.game.add.sprite(300, 0, 'answersheet');
    var deleteQuestion = this.game.add.button (500, 50, 'deleteX', DeleteQuestion, this, 2,1,0);
    
    question.addChild(deleteQuestion);

}

function DeleteQuestion() {
    
    question.destroy();

}

function DeletePlayer() {

    getPlayer = parseInt(this.name.substring(1,2), 10) - 1;
    console.log(getPlayer);
    for (var i = 0; i < packList.length; i++) {
        
        if (i == getPlayer ) {
            
           
            
            packList[i].getChildAt(1).destroy();
            
            packList[i].forEach(function(child) {
                 
                 packList[i].removeChild(packList[i].getChildAt(0));
                     
            });

            tokenList[i].destroy(true,false);
            
            //Allows for new Character
            cSet[i] = false;

            return;
            
        }
    }
}
    
