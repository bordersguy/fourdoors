var c1;
var c2;
var c3;
var c4;
var c5;
var c6;
var cList;
var cSet = [false, false, false, false, false, false];
var totalPlayers = 0;
//var playersList = [];

//vars used to set the position of the tokens
var cPos1;
var cPos2;
var cPos3;
var cPos4;
var cPos5;
var cPos6;
var cPosSet = [cPos1,cPos2,cPos3, cPos4, cPos5,cPos6];

var bonus1;
var bonus2;
var bonus3;
var bonus4;
var bonus5;
var bonus6;
var playerBonus = [bonus1, bonus2, bonus3, bonus4, bonus5, bonus6];

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
//var test;

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

var questionPanel;
var questionText;
var getQuestion = "What's your favorite color?";
var qType;
var questionExplain;
var answer;
var wrongButton;
var correctButton;
var shuffledWord;
var showAnswer;
var revealButton;
var deleteQuestion;
var restButton;
var treasureButton;
var monsterButton;
var choiceText;

var monsterModifier;
var monster;

var treasureType;
var bonusType;
var currentItem;
var itemModifier;
var itemObject;
var garbageButton;
var keepButton;
var inventory;
var displayItem;
var hasItem;
var hasBonus;

var emitter;
var emitter1;
var emitter2;
var emitter3;
var emitter4;
var emitter5;
var emitter6;
var emitterList = [emitter, emitter1, emitter2, emitter3, emitter4, emitter5, emitter6];

var particleList = ['goldParticle', 'lifeParticle', 'luckParticle', 'speedParticle', 'strengthParticle' ];

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
    dice.events.onInputDown.add(RollDie, this);
    
    CreateBoardSpaces();
    
    //Create Turn Management Button
    turnManagerButton = this.game.add.button(1050, 500, "turnButton", ManageTurn, 2,1,0);
    turnText = this.game.add.text(turnManagerButton.width/2, turnManagerButton.height/2,  "start", { font: "40px Arial", fill: "black", align: "center" }); 
    turnManagerButton.addChild(turnText);
    turnText.anchor.set(0.5, 0.5);
    
    //Create Particles
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

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

function ManageTurn () {
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

function RollDie() {
    
    dice.animations.play('roll');
    
    //timer
    var rollTimer = this.game.time.create(false);
    
    var rollTime = Math.floor(((Math.random() * 3) + 3) * 1000);
    
    rollTimer.add(rollTime, StopDie, this);
    
    rollTimer.start();
}

function StopDie () {
    
    dice.animations.stop();
    
    if (turn == 1) {
        
        CreateMovementToken();
        
        
    }
    
    if (turn == 4) {
        
        AttackResult();
        
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
        
        
        
        aSpot = this.game.add.button(aX, aY, "aSpot", MovePlayer, this, 2,1,0);
        bSpot = this.game.add.button(bX, bY, "bSpot", MovePlayer, this, 2,1,0);
        
        turnText.setText("move");
        
    }
    else {
    
        currentPlayer +=1;
        CreateMovementToken();
        
    }
    
    
    
    
}

function MovePlayer (spot) {
    
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
    ManageTurn();
    
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
    
    questionPanel = this.game.add.sprite(300, 0, 'answersheet');
    question = this.game.add.group();
    question.width = questionPanel.width;
    questionPanel.addChild(question);
    
    deleteQuestion = this.game.add.button (500, 525, 'deleteX', DeleteQuestion, this, 2,1,0);
    wrongButton = this.game.add.button(100, 400, 'wrong', CheckAnswer, this, 2,1,0);
    correctButton = this.game.add.button(400, 400, 'correct', CheckAnswer, this, 2,1,0);
    revealButton = this.game.add.button(250, 500, 'reveal', ShowAnswer, this, 2,1,0);
    
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
    
    var pickPuzzle = Math.floor(Math.random() * 4);
    //var pickPuzzle = 4;
    var deconstructed;
    var toDelete;
    var startPoint;
    var randomPick;
    var sentenceLength;
    var newOrder;
    
    
    
    switch(pickPuzzle) {
        
        case 0:
            
            qType = "Fill in the Blank";
            getQuestion = "My favorite food is cheese pizza!";
            answer = getQuestion;
            deconstructed = getQuestion.split(" ");
            toDelete = Math.round(deconstructed.length/2);
            startPoint = Math.floor(Math.random() * (toDelete + 1));
       
            for (var i = 0; i < deconstructed.length; i++) {
                
               if (i >= startPoint && i < (startPoint + (toDelete)))  {
                   
                    deconstructed.splice(i, 1,  "_____");
                    console.log("checked");
               }
            }
            getQuestion = deconstructed.join(" ");
            break;
            
        case 1:
            qType = "Answer the Question";
            getQuestion = "What's your name?";
            answer = "My name is ______ .";
            deconstructed = getQuestion.split(" ");
          
            break;
        
        case 2:
            qType = "Sentence Scramble";
            getQuestion = "My favorite food is cheese pizza!";
            answer = getQuestion;
            deconstructed = getQuestion.split(" ");
            newOrder = [];
            sentenceLength = deconstructed.length;
            
           
            for (var i = 0; i < sentenceLength; i++) {
                    
                    randomPick = Math.floor(Math.random() * deconstructed.length);
                    console.log(randomPick);
   
                    newOrder[i] = deconstructed[randomPick];
                    
                    deconstructed.splice(randomPick, 1);
            }

            getQuestion = newOrder.join(" ");

            break;
            
            
            case 3:
            qType = "Scramble Words";
            getQuestion = "My favorite food is cheese pizza!";
            answer = getQuestion;
            deconstructed = getQuestion.split(" ");
            newOrder = [];
            sentenceLength = deconstructed.length;
            
           
                for (var i = 0; i < sentenceLength; i++) {
                    
                    var word = deconstructed[i];
                    //var wordLength = deconstructed[i];
                    
                    ShuffleWord(word);
                    
                    newOrder[i] = shuffledWord;
                    
                }

            getQuestion = newOrder.join(" ");
            break;
        
    }
    
}

function ShuffleWord (word){
    shuffledWord = '';
    var charIndex = 0;
    word = word.split('');
    while(word.length > 0){
        charIndex = word.length * Math.random() << 0;
        shuffledWord += word[charIndex];
        word.splice(charIndex,1);
    }
    return shuffledWord;
}

function CheckAnswer(result) {

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

        var allKids = 0;
        
        question.forEach(function(child) {

                allKids += 1;
    
            });

        for (var i = 0; i < allKids - 1; i++) {
            
            question.getChildAt(1).destroy();
            
        }
        
        GoToQuest();

    }
    
    
}

function ShowAnswer(argument) {
    
    showAnswer = this.game.add.text(20, 250, answer, { font: "40px Arial", fill: "green", align: "center", wordWrap: true, wordWrapWidth: question.width - 20 }); 
    question.addChild(showAnswer);
    
}

function GoToQuest() {
    
    choiceText = this.game.add.text(50, 50, "Great!  Here's 1 Gold. \nWhat now?", { font: "40px Arial", fill: "green", align: "center", wordWrap: true, wordWrapWidth: question.width - 20 });
    
    restButton = this.game.add.button(250, 200, "restButton", ManageQuest, 2,1,0);
    monsterButton = this.game.add.button(100, 400, "monsterButton", ManageQuest, 2,1,0);
    treasureButton = this.game.add.button(400, 400, "treasureButton", ManageQuest, 2,1,0);
    
    question.addChild(restButton);
    question.addChild(monsterButton);
    question.addChild(treasureButton);
    
    question.addChild(choiceText);
}

function ManageQuest(choice) {
    
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    
    question.getChildAt(1).destroy();
    question.getChildAt(1).destroy();
    question.getChildAt(1).destroy();
    
    switch (choice) {
        case restButton:
            
            var resting = Math.floor(Math.random() * 10 + 1);
           
           
            
            if (resting == 1) {
                
                getGold = getGold.setText((parseInt(getGold.text, 10) - 1).toString());
                getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
                choiceText.setText("Oh no!  While you were sleeping a thief stole 1 gold! \nGain 1 life.");
                
            }
            else if (resting == 2) {
                choiceText.setText("No sleep!  A monster wakes you up!");
                turn = 4;
                FightMonster();
                
            }
            else {
                choiceText.setText("Sweet Dreams! \nGain 1 life.");
                getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
                
            }
            
            
            break;
        
        case monsterButton:
            turn = 4;
            FightMonster();
            break;
            
        case treasureButton:
            
            TreasureHunt();
            break;
    }
    
    
    
    
}

function FightMonster() {
    
    var monsterList = ['dragon', 'zombie', 'ghost', 'troll',
    'giant snake', 'werewolf', 'thief', 'vampire'];
    
    var pickMonster = Math.floor(Math.random() * monsterList.length);
    monster = monsterList[pickMonster];
    monsterModifier = getRandomInt(2,4);
    
    CheckInventory("sword", "strength");

    choiceText.setText("A " + monster + " is attacking you! \nRoll to fight! \nYou need a " + monsterModifier.toString() + " to win!!!" );
    
}

function AttackResult() {
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getAttack = packList[currentPlayer - 1].getChildAt(3);
    var dieResult = dice.animations.currentAnim.frame + 1;
    
    if (dieResult == monsterModifier) {
        
        choiceText.setText("Try again! \nRoll Again!!");
        return;
        
    } else if (dieResult < monsterModifier) {
        
        choiceText.setText("Uggghh! The " + monster + " won. \nLose 1 life.");
        getLife = getLife.setText((parseInt(getLife.text, 10) - 1).toString());
        turn += 1;
    }
    else {
        choiceText.setText("You won!!  \nGain 1 attack!");
        getAttack = getAttack.setText((parseInt(getAttack.text, 10) + 1).toString());
        turn += 1;
    }
    
    
    
}

function TreasureHunt() {
    
    CreateItem();
    
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    var treasureFound = getRandomInt(1,10);
    
    if (treasureFound == 1) {
        
        choiceText.setText("You looked all day!  \nSorry, but, you found nothing.");
        
    } else if (treasureFound == 2){
        
        choiceText.setText("No treasure....but you did \nfind 1 Gold.");
        getGold = getGold.setText((parseInt(getGold.text, 10) - 1).toString());
        DisplayItem("coin");
    } else if (treasureFound == 3) {
        
        turn = 4;
        choiceText.setText("Uh oh...you found a monster!");
        FightMonster();
        
    } else {
        
        choiceText.setText("Wow! You found a \n" + currentItem + " !");
        DisplayItem(itemObject);
    }
    
    //console.log(question);

}

function CreateItem() {
    //sword is plus 1 in a fight, ring is nothing, shield will save a life in a fight once then break,
    //potion is bonus dependent, wand is bonus dependent, boots are bonus dependent.
    treasureType = ['sword', 'ring', 'shield', 'potion', 'wand', 'boots'];
    //gold is worth 2 gold, life adds 2 life(while wearing), strength adds 1 strength while wearing
    //luck lets you reroll once(anything) then its gone, speed lets you reroll movement twice then magic is gone.
    bonusType = ['gold', 'life', 'luck', 'speed', 'strength'];
    
    itemObject = treasureType[getRandomInt(0, treasureType.length)];
    itemModifier = bonusType[getRandomInt(0, bonusType.length)];
    
    currentItem = itemObject + " of " + itemModifier;
}

function DisplayItem(item) {
    
    displayItem = this.game.add.sprite(200 ,200, item);
    
    if (item != "coin") {
        
        garbageButton = this.game.add.button(100, 400, 'garbage', AddInventory, this, 2,1,0);
        keepButton = this.game.add.button(400, 400, 'take', AddInventory, this, 2,1,0);
        
        question.addChild(keepButton);
        question.addChild(garbageButton);
            
    }
    
    console.log(question);
    

    question.addChild(displayItem);
    console.log(bonusType);
    
    if (item != "coin") {
        
        CreateParticles(itemModifier + "Particle", displayItem, false);
            
    }
    
    
}

function AddInventory(choice) {
    
    if (choice == garbageButton) {
        
        question.getChildAt(4).destroy();    
        
    } else {

        DeleteInventory();
        console.log(packList[currentPlayer - 1]);
        inventory = this.game.add.sprite (75,80, itemObject);
        inventory.scale.setTo(.25,.25);
        packList[currentPlayer - 1].add(inventory);
        CreateParticles(itemModifier + 'Particle', inventory, true);
        playerBonus[currentPlayer - 1] = [treasureType, bonusType];
    }
    
}

function CreateParticles(particle, object, mini) {
    
    

    //StartParticles(emitter, particle);
    if (mini == true) {
        
        var getPos = cList[currentPlayer - 1];
        
        emitterList[1] = this.game.add.emitter(getPos.x + getPos.width - 10  , getPos.y + getPos.height, 100);

        emitterList[1].maxParticleScale = .35;
        emitterList[1].minParticleScale = 0.15;
        
        emitterList[1].makeParticles(particle);


        emitterList[1].gravity = -200;

        emitterList[1].start(false, 500, 100);
        
        
    } else {
        emitter = this.game.add.emitter(600, object.world.y + object.height, 100);
        
        emitter.maxParticleScale = 1.0;
        emitter.minParticleScale = 0.5;
        
        emitter.makeParticles(particle);


        emitter.gravity = -200;

        emitter.start(false, 1000, 100);
        
    }
    
    

    
}


function CheckInventory(item, modify) {
    
    var treasure = playerBonus[currentPlayer - 1][0];
    var bonus = playerBonus[currentPlayer - 1][1];
    
    if (item == treasure) {
        
        hasItem = true;
        
    } else {
        
        hasItem = false;
        
    }
    
    if (bonus == modify) {
        
        hasBonus = true;
        
    } else {
        
        hasBonus = false;
    }
    
}

function DeleteQuestion() {
    
    questionPanel.destroy();
    if (emitter) {
            
        emitter.destroy();
    }
    
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

function DeleteInventory() {
    
    if (packList[currentPlayer - 1].length > 6) {
            
        packList[currentPlayer - 1].getChildAt(6).destroy();
            
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
    ManageTurn();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}