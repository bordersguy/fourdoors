var c1;
var c2;
var c3;
var c4;
var c5;
var c6;
var cList;
var cSet = [false, false, false, false, false, false];
var totalPlayers = 0;
var playersList = [];

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
var newSpot1;
var newSpot2;
var updatePos;

var questionText;
var getQuestion = "What's your favorite color?";
var qType;
var questionExplain;
var answer;
var wrongButton;
var correctButton;


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
    turnText = this.game.add.text(turnManagerButton.width/2, turnManagerButton.height/2,  "start", { font: "40px Arial", fill: "black", align: "center" }); 
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
            
        case 1:
            UpdateTurnText(updatePos);
            turn += 1;
            break;
    }
    
    
    
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
        
        CreateMovementToken();
        
        
    }
    
}

function CreateMovementToken() {
    
    
    if (cSet[currentPlayer - 1]) {
    
        //console.log("after roll...CP is " + currentPlayer);
        newSpot1 = (dice.animations.currentAnim.frame + 1) + cPosSet[currentPlayer - 1];
        newSpot2 = cPosSet[currentPlayer - 1] - (dice.animations.currentAnim.frame + 1);
        //console.log("turn = " + currentPlayer);
        //console.log("NS1 = " + newSpot1);
        //console.log("NS2 = " + newSpot2);
        
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
        
        turnText.setText("move");
        
    }
    else {
    
        currentPlayer +=1;
        CreateMovementToken();
        
    }
    
    
    
    
}

function movePlayer (spot) {
    
    tokenList[currentPlayer - 1].position.x = spot.x;
    tokenList[currentPlayer - 1].position.y = spot.y;
    
    
    
    if (spot == aSpot) {
        
        updatePos = newSpot1;
    }
    else {
        
        updatePos = newSpot2;
        
    }
    
    cPosSet[currentPlayer - 1] = updatePos;
    
    // console.log("CP is " + currentPlayer);
    // console.log("totalPlayers is " + totalPlayers);
    
    aSpot.destroy();
    bSpot.destroy();
    
    //UpdateTurnText(updatePos);
    manageTurn();
    
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
            
            var setPlayer = parseInt(pName.substring(1,2), 10) - 1;
            
            if (setPlayer == i && cSet[i] == false) {
                
                cSet[i] = true;
                
                totalPlayers += 1;
                
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
                    goldText.name = "goldText";
                    attackText = this.game.add.text(9, 46, attack, attackStyle);
                    attackText.name = "attackText";
                    lifeText = this.game.add.text(16, 88, life, lifeStyle);
                    lifeText.name = "lifeText";
                    deletePlayer = this.game.add.button(80, -10, 'deleteX', DeletePlayer, this, 2,1,0);
                    packList[i].add(deletePlayer);
                    packList[i].add(goldText);
                    packList[i].add(attackText);
                    packList[i].add(lifeText);
                    
                }
                else {
                
                    goldText = this.game.add.text(72, 3, gold, goldStyle);
                    goldText.name = "goldText";
                    attackText = this.game.add.text(79, 46, attack, attackStyle);
                    attackText.name = "attackText";
                    lifeText = this.game.add.text(72, 88, life, lifeStyle);
                    lifeText.name = "lifeText";
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
    var deleteQuestion = this.game.add.button (500, 525, 'deleteX', DeleteQuestion, this, 2,1,0);
    wrongButton = this.game.add.button(100, 400, 'wrong', CheckAnswer, this, 2,1,0);
    correctButton = this.game.add.button(400, 400, 'correct', CheckAnswer, this, 2,1,0);
    var revealButton = this.game.add.button(250, 500, 'reveal', ShowAnswer, this, 2,1,0);
    
    question.addChild(deleteQuestion);
    GetQuestion();
    questionText = this.game.add.text(20, 150, getQuestion, { font: "40px Arial", fill: "black", align: "center", wordWrap: true, wordWrapWidth: question.width - 20 });
    questionExplain = this.game.add.text(20, 50, qType, { font: "40px Arial", fill: "blue", align: "center", wordWrap: true, wordWrapWidth: question.width - 20 }); 
    
    question.addChild(wrongButton);
    question.addChild(correctButton);
    question.addChild(questionExplain);
    question.addChild(questionText);
    question.addChild(revealButton);
}

function GetQuestion() {

    getQuestion = "What's your favorite color?";
    
    CreateQuestion(getQuestion);

}

function CreateQuestion(puzzle) {
    
    //var pickPuzzle = Math.floor(Math.random() * 3);
    var pickPuzzle = 2;
    var deconstructed;
    
    switch(pickPuzzle) {
        
        case 0:
            qType = "Fill in the Blank";
            getQuestion = "My favorite food is cheese pizza!";
            answer = getQuestion;
            deconstructed = getQuestion.split(" ");
            var toDelete = Math.round(deconstructed.length/2);
            var startPoint = Math.floor(Math.random() * (toDelete + 1));
            
            // console.log(deconstructed);
            // console.log("TD is " + toDelete);
            // console.log("sp is " + startPoint);
            for (var i = 0; i < deconstructed.length; i++) {
                
               if (i >= startPoint && i < (startPoint + (toDelete)))  {
                   
                    deconstructed.splice(i, 1,  "_____");
                    console.log("checked");
               }
                
                
            }
            
            getQuestion = deconstructed.join(" ");
            
            //getQuestion = getQuestion.splice(startPoint, toDelete, "_____");
        
            break;
            
        case 1:
            qType = "Answer the Question";
            getQuestion = "What's your name?";
            answer = "My name is ______ .";
            deconstructed = getQuestion.split(" ");
          
            
            //getQuestion = getQuestion.splice(startPoint, toDelete, "_____");
        
            break;
        
        
        case 2:
            qType = "Sentence Scramble";
            getQuestion = "My favorite food is cheese pizza!";
            answer = getQuestion;
            deconstructed = getQuestion.split(" ");
            var newOrder = [];
            var sentenceLength = deconstructed.length;
           
            for (var i = 0; i < sentenceLength; i++) {
                    
                    var randomPick = Math.floor(Math.random() * deconstructed.length);
                    console.log(randomPick);
                    
                    
                    
                    newOrder[i] = deconstructed[randomPick];
                    
                    deconstructed.splice(randomPick, 1);
               
               
               
                
                
            }
            
            getQuestion = newOrder.join(" ");

            
            
            //getQuestion = getQuestion.splice(startPoint, toDelete, "_____");
        
            break;
        
    }
    
}

function CheckAnswer(result) {
    
    //console.log("cp is " + currentPlayer);
    
    //console.log(packList[currentPlayer - 1].getChildAt(2).text);
    // console.log(packList[currentPlayer - 1].getChildAt(0));
    // console.log(packList[currentPlayer - 1].getChildAt(1));
    // console.log(packList[currentPlayer - 1].getChildAt(2));
    // console.log(packList[currentPlayer - 1].getChildAt(3));
    // console.log(packList[currentPlayer - 1].getChildAt(4));
    
    
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    
    //ADD RESULT OF LIFE = 0 WHEN ADDING DEATH CODE
    if (result == wrongButton) {
        
        if (parseInt(getGold.text, 10) >= 1) {
            
            getGold = getGold.setText((parseInt(getGold.text, 10) - 1).toString());
                
        }
        else {
            
            getLife = getLife.setText((parseInt(getLife.text, 10) - 1).toString());
            
        }
        
        
        
    }
    else {
        
         getGold = getGold.setText((parseInt(getGold.text, 10) + 1).toString());
        
        
    }
    
    
}

function ShowAnswer(argument) {
    
    var showAnswer = this.game.add.text(20, 250, answer, { font: "40px Arial", fill: "green", align: "center", wordWrap: true, wordWrapWidth: question.width - 20 }); 
    question.addChild(showAnswer);
    
}

function DeleteQuestion() {
    
    question.destroy();
    
    //YOU HAVE TO MOVE THIS!!! THIS WILL BE LAID DOWN LAST!!!!!S
    ResetCurrentPlayer();
    
    ResetTurn();

}

function DeletePlayer() {

    getPlayer = parseInt(this.name.substring(1,2), 10) - 1;
    console.log(getPlayer);
    for (var i = 0; i < packList.length; i++) {
        
        if (i == getPlayer ) {
            
            totalPlayers -= 1;
            
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
    
    
function ResetCurrentPlayer () {
        
    currentPlayer += 1;
    
    if (currentPlayer > totalPlayers) {
        
        currentPlayer = 1;
        
    }
}    

function UpdateTurnText(box) {

    var checkSpace;
    
    if (box != 0 && box != 6 && box != 12 && box != 18) {
        
        checkSpace = 1;
        
    }
    else {
        
        checkSpace = box;
        
    }
    
    
    switch (checkSpace) {
        case 1 :
            turnText.setText("Quest!");
            break;
            
        case 0 :
            turnText.setText("castle");
            break;
            
        case 6 :
            turnText.setText("witch");
            break;
            
        case 12 :
            turnText.setText("forest");
            break;
            
        case 18 :
            turnText.setText("village");
            break;
        
       
    }
    
    
    
}

function ResetTurn() {
    
    turn = 0;
    manageTurn();
}