//Bugs:  
//      On mobile, the game doesn't resize in landscape
//      Test prison break some more
//      sun doesn't always get deleted

//To Do: 

//      Limit objects to certain classes
//      finish corner interactions
//      Add glowing rock mechanic
//      Create world events      
//      Add monster side effects
//      Arrange night monsters
//      Make spiders
//      Make fairy
//      Create Ant Pet
//      Add players turn to card and visual marker 
//      Does destroying the questMarker from the list reduce the list size?


//Later:
//      Music & Sound effects
//      Make mini game
//      Polish 

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

var bonus1 = ["none", "none"];
var bonus2 = ["none", "none"];
var bonus3 = ["none", "none"];
var bonus4 = ["none", "none"];
var bonus5 = ["none", "none"];
var bonus6 = ["none", "none"];
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
var dieResult;

var question;

var token1;
var token2;
var token3;
var token4;
var token5;
var token6;
var tokenList;
var tokenName;

var dice;
var rollTime;
var ready = 0;

var currentRace;
var getPlayer;

var boardSpaces = [];
var boardSpacesInner = [];
var spaceMaker = 0;
var boardLevel = [1,1,1,1,1,1];

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
var caveButton;
var choiceText;
var questionUp = false;

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
var isMagic = false;

var emitter;
var emitter1;
var emitter2;
var emitter3;
var emitter4;
var emitter5;
var emitter6;
var emitterList = [emitter, emitter1, emitter2, emitter3, emitter4, emitter5, emitter6];

var particleList = ['goldParticle', 'lifeParticle', 'luckParticle', 'speedParticle', 'strengthParticle' ];

var useMagicButton;
var noMagicButton;
var magicUsed;
var reroll = false;
var cave;
var timerBackground;
var backgroundAsset;
var sun;
var timer;
var timerGroup;

//testing keys
var key0;
var key9;

//movement testing keys
var key1;
var key2;
var key3;
var key4;
var key5;
var key6;

var dayNight = 1;
var clouds;
var stars;
var moon;
var cloudsBack;

var teleport;
var inOut;
var choice;
var noButton;
var yesButton;
var arrested = [false, false, false, false, false, false];
var isFrog = [false, false, false, false, false, false];
var frog = false;
var saveStat = [0,0,0,0,0,0];
var hasQuest = [[false, "none", 0], [false, "none", 0], [false, "none", 0], [false, "none", 0], [false, "none", 0], [false, "none", 0]];
var questMarker;
var questList =[questMarker, questMarker, questMarker, questMarker, questMarker, questMarker];

//var prevOrientation;

var playState = {
 
create: function () {
    //prevOrientation = this.scale.screenOrientation;
    
    this.game.stage.backgroundColor = "#4488AA";
    
    sun = this.game.add.sprite(5,5, "sun");
    //Create Game Board
    board = this.game.add.sprite(300,0, 'board');
    var leftBorder = this.game.add.sprite(board.x - 50, board.y - 64, 'leftBorder');
    var rightBorder = this.game.add.sprite(board.x + board.width - 10, board.y - 64, 'rightBorder');
    this.game.world.sendToBack(leftBorder);
    this.game.world.sendToBack(rightBorder);
    tokenList = this.game.add.group();
    tokenList = [token1, token2, token3, token4, token5, token6];
    
    
    //Create Character Frames
    c1 = this.game.add.sprite(100, 30, 'sheet');
    c2 = this.game.add.sprite(100, 180, 'sheet');
    c3 = this.game.add.sprite(100, 330, 'sheet');
    
    c4 = this.game.add.sprite(1000, 30, 'sheet');
    c5 = this.game.add.sprite(1000, 180, 'sheet');
    c6 = this.game.add.sprite(1000, 330, 'sheet');
    
    cList = [c1,c2,c3,c4,c5,c6];
    
    TurnOnCharacters();

    //Create Card
    card = this.game.add.button (950, 500, 'card', ShowQuestion, this, 2,1,0);
    
    //Create Die    
    dice = this.game.add.sprite(175, 500, 'die');
    dice.animations.add('roll', [0,1,2,3,4,5], 10, true);
    dice.inputEnabled = true;
    dice.events.onInputDown.add(RollDie, this);
    
    CreateBoardSpaces();
    CreateInnerBoard();
    
    //Create Turn Management Button...this just starts the game and identifies what to do
    turnManagerButton = this.game.add.button(0, 480, "turnButton", ManageTurn, 2,1,0);
    turnText = this.game.add.text(turnManagerButton.width/2, turnManagerButton.height/2,  "Ready?", { font: "40px Arial", fill: "black", align: "center" }); 
    turnManagerButton.addChild(turnText);
    turnText.anchor.set(0.5, 0.5);
    
    //These keys are just for testing...delete when done.
    key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key4 = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    key5 = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    key6 = this.game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    
    key0 = this.game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    key9 = this.game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    
    key1.onDown.add(KeyMove, this);
    key2.onDown.add(KeyMove, this);
    key3.onDown.add(KeyMove, this);
    key4.onDown.add(KeyMove, this);
    key5.onDown.add(KeyMove, this);
    key6.onDown.add(KeyMove, this);
    
    key0.onDown.add(TestThis0, this);
    key9.onDown.add(TestThis9, this);
    
    clouds = this.game.add.group();
    clouds.enableBody = true;
    
    
    CloudGenerator();
    cloudsBack = this.game.add.group();
        
    for (var i = 0; i < 30; i++) {
        
        
        
        var xRandom = getRandomInt(0, this.game.width);
        var yRandom = getRandomInt(0, this.game.height);
        var randomScale = (Math.random() * (0.60 - .40) + 0.40).toFixed(2);
        
        var backCloud = cloudsBack.create(xRandom, yRandom, "cloud");   
        backCloud.alpha = .60;
        backCloud.scale.setTo(randomScale,randomScale);
        if ((xRandom > 300 && xRandom < 379) || (xRandom < 900 && xRandom > 821)) {
            
            backCloud.angle += 90;
            
        }
        
    }
    
    this.game.world.sendToBack(cloudsBack);
    
    //Create Particles
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
    this.scale.setScreenSize( true );
},

update: function() {
    
    

},

preUpdate: function() {
    
    // if (this.scale.screenOrientation !== prevOrientation) {
        
    //     this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
    //     this.scale.setScreenSize( true );
        
    // }

}
  
};

//***************Basic Board Management

function KeyMove(number) {
    
    if (questionUp == true) {
                
        DeleteQuestion();    
    }
    
    switch (number) {
        case key1:
            CreateMovementToken(1);
            break;
            
        case key2:
            
            CreateMovementToken(2);
            break;
            
        case key3:
            
            CreateMovementToken(3);
            break;
            
        case key4:
            
            CreateMovementToken(4);
            break;
            
        case key5:
            
            CreateMovementToken(5);
            break;
            
        case key6:
            
            CreateMovementToken(6);
            break;

    }
    
}

function TestThis0() {
    
    dieResult = 6;
    DieResult();
    console.log(questList);
}
function TestThis9() {
    
    dieResult = 5;
    DieResult();
    
    
}

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

function CreateInnerBoard () {
        
        spaceMaker = 0;
        
        for (var i = 0; i < 16; i++) {
        
        var space = [0,0];
        
        boardSpacesInner.splice(i,0, space);
        
        if (i < 4) {
            
            boardSpacesInner[i][0] = (board.x + 110) + (spaceMaker * 77);
            boardSpacesInner[i][1] = (board.y + 107);
        }
        
        if (i > 3 && i < 8) {
            
            boardSpacesInner[i][0] = (board.x + (board.width - 187));
            boardSpacesInner[i][1] = (board.y + 107) + (spaceMaker * 78);
            
        }
        
        if (i > 7 && i < 12) {
        
            boardSpacesInner[i][0] = (board.x + (board.width - 187) - (spaceMaker * 77));
            boardSpacesInner[i][1] = (board.height - 185);
        
        }
        
        if (i > 11 && i < 16) {
            
            boardSpacesInner[i][0] = (board.x + 110);
            boardSpacesInner[i][1] = ((board.height - 185) - (spaceMaker * 78));
            
        }
        
        console.log("i is " + i + " " +  boardSpacesInner[i][0], boardSpacesInner[i][1]);
        
        
        spaceMaker += 1;
        
        if (spaceMaker == 4) {
            spaceMaker = 0;
            
        }
        
        
    }
}

function ManageTurn () {
    console.log("turn on MT = " + turn);
    turnManagerButton.inputEnabled = false;
    
    switch (turn) {
        case 0:
            if (arrested[currentPlayer - 1] == true) {
                
                turnText.setText("castle \nprison");
                turn = 19;
                arrested[currentPlayer - 1] = false;
                backgroundAsset = "castleBackground";
                 
                
            } else if (isFrog[currentPlayer - 1] == true) {
                
                frog = true;
                CreateMovementToken(1);
                turn = 1;
                
                
            } else {
                
                
                
                turnText.setText("player " + currentPlayer + "\nroll");
                turn = 1;   
                
            }
            
            break;
            
        case 1:
            UpdateTurnText(updatePos);
            turn = 2;
            break;
    }
 
}

function RollDie() {
    
    for (var i = 0; i < cSet.length; i++) {
        
        if (cSet[i] == true) {
            
            ready += 1;
            
        }
        
    }
    
    if (ready > 0 && turn > 0) {
        
        dice.animations.play('roll');
    
        //timer
        var rollTimer = this.game.time.create(false);
        
        rollTime = Math.floor(((Math.random() * 3) + 3) * 1000);
        
        rollTimer.add(rollTime, StopDie, this);
        
        rollTimer.start();
        
        if (questionUp == true) {
            
            deleteQuestion.input.enabled = false;
            
        }
        
        
        if (turnText.text.includes("village") || turnText.text.includes("castle") || turnText.text.includes("witch") || turnText.text.includes("forest")) {
            
            StartSun();
            timer = this.game.time.create(false);
            
            timer.add(rollTime, StopSun, this);
            timer.start();
            
            
        }
        
    } else if (ready == 0 && turn == 0) {
        
        turnText.setText("make\nplayers");
        
    } else if (ready > 0 && turn == 0) {
        
        turnText.setText("Click here\nto start");
        
    }
    
    ready = 0;

}

function StopDie () {
    
    dice.animations.stop();
    dieResult = dice.animations.currentAnim.frame + 1;
    
    DieResult();
    
    if (questionUp == true) {
    
        deleteQuestion.input.enabled = true;    
        
    }
    
}

function DieResult() {
    
    switch (turn) {
        //turn start
        case 1:
             CreateMovementToken(dieResult);
        
            //This deletes the question after a movement reroll from a quest.
            if (reroll == true && questionUp == true) {
            
                DeleteQuestion();
            
            }
            break;
        case 3:
            //treasurehunt & rest & monsterhunt timer;
            break;
        
        case 4:
            AttackResult();
            break;
    
        case 18:
            VillageResult();
            break;
            
        case 19:
            if (questionUp == true) {
                
                CastleResult();    
                
            }
            
            break;   
            
        case 20:
            ForestResult();
            break;     
            
        case 21:
            WitchResult();
            break;
            
        case 22:
            TunnelResult();
            break;
            
        case 23:
            AntsResult();
            break;
            
        case 24:
            DragonResult();
            break;
            
        case 25:
            PoolResult();
            break;
            
        case 26:
            WitchResult();
            break;
            
        case 27:
            TunnelResult();
            break;
            
        case 28:
            ManageChallenge();
            break;

    }
    
}

function CreateMovementToken(moves) {
    
    console.log (boardLevel[currentPlayer - 1]);
    
    if (boardLevel[currentPlayer - 1] == 1) {
        
        if (cSet[currentPlayer - 1]) {
    
            newSpot1 = (moves) + cPosSet[currentPlayer - 1];
            newSpot2 = cPosSet[currentPlayer - 1] - (moves);

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
            return;
            
        }
        else {
        
            currentPlayer +=1;
            CreateMovementToken(moves);
            return;
        }
        
        
            
    }
    
    if (boardLevel[currentPlayer - 1] == 2) {
        
        if (cSet[currentPlayer - 1]) {
    
            newSpot1 = (moves) + cPosSet[currentPlayer - 1];
            newSpot2 = cPosSet[currentPlayer - 1] - (moves);

            if (newSpot1 > 15) {
                
                newSpot1 -= 16;
                
            }
            
            if (newSpot2 <= -1) {
                
                newSpot2 = 16 + newSpot2;
            }
            
            var aX2 = boardSpacesInner[newSpot1][0];
            var aY2 = boardSpacesInner[newSpot1][1];
            var bX2 = boardSpacesInner[newSpot2][0];
            var bY2 = boardSpacesInner[newSpot2][1];
            
            
            
            aSpot = this.game.add.button(aX2, aY2, "aSpot", MovePlayer, this, 2,1,0);
            bSpot = this.game.add.button(bX2, bY2, "bSpot", MovePlayer, this, 2,1,0);
            
            turnText.setText("move");
            return;
            
        }
        else {
        
            currentPlayer +=1;
            CreateMovementToken(moves);
            return;
        }
            
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

    aSpot.destroy();
    bSpot.destroy();

    ManageTurn();
    
    reroll = false;
    
}

function LevelSwitch(where) {
    
    switch (where) {
        
        case "in10":
            console.log("LS in is okay");
            tokenList[currentPlayer - 1].position.x = boardSpacesInner[10][0];
            tokenList[currentPlayer - 1].position.y = boardSpacesInner[10][1];
            cPosSet[currentPlayer - 1] = 10;
            
            ResetTurn();
    
            reroll = false;
            break;
            
        case "out15":
            
            console.log("LS out is okay");
            tokenList[currentPlayer - 1].position.x = boardSpaces[15][0];
            tokenList[currentPlayer - 1].position.y = boardSpaces[15][1];
            cPosSet[currentPlayer - 1] = 15;
            
            ResetTurn();
    
            reroll = false;
            break;
            
        case "teleport":
            
            var level;
            
            
            if (inOut == 0) {
                
                level = boardSpaces;
                boardLevel[currentPlayer - 1] = 1;
                
                
            } else {
                
                level = boardSpacesInner;
                boardLevel[currentPlayer - 1] = 2;
            }
            
            tokenList[currentPlayer - 1].position.x = level[teleport][0];
            tokenList[currentPlayer - 1].position.y = level[teleport][1];
            cPosSet[currentPlayer - 1] = teleport;
            
            ResetTurn();
    
            reroll = false;
            break;
            
        case "teleportInner":
            
            teleport = getRandomInt(0, boardSpacesInner.length);
            
            tokenList[currentPlayer - 1].position.x = boardSpacesInner[teleport][0];
            tokenList[currentPlayer - 1].position.y = boardSpacesInner[teleport][1];
            cPosSet[currentPlayer - 1] = teleport;
            
            boardLevel[currentPlayer - 1] = 2;
            
            ResetTurn();
    
            reroll = false;
            break;
            
            
        
        
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
            
            var setPlayer = parseInt(pName.substring(1,2), 10) - 1;
            
            if (setPlayer == i && cSet[i] == false) {
                
                cSet[i] = true;
                
                totalPlayers += 1;
                
                turnText.setText(totalPlayers + "\nplayers");
                
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
                
                // if (player == c1 || player == c2 || player == c3) {
                
                goldText = this.game.add.text(6, 3, gold, goldStyle);
                goldText.name = "goldText";
                attackText = this.game.add.text(98, 118, attack, attackStyle);
                attackText.name = "attackText";
                lifeText = this.game.add.text(7, 118, life, lifeStyle);
                lifeText.name = "lifeText";
                deletePlayer = this.game.add.button(80, -10, 'deleteX', DeletePlayer, this, 2,1,0);
                packList[i].add(deletePlayer);
                packList[i].add(goldText);
                packList[i].add(attackText);
                packList[i].add(lifeText);
                    
                //}
                // else {
                
                //     goldText = this.game.add.text(92, 3, gold, goldStyle);
                //     goldText.name = "goldText";
                //     attackText = this.game.add.text(105, 50, attack, attackStyle);
                //     attackText.name = "attackText";
                //     lifeText = this.game.add.text(92, 95, life, lifeStyle);
                //     lifeText.name = "lifeText";
                //     deletePlayer = this.game.add.button(-20, -10, 'deleteX', DeletePlayer, this, 2,1,0);
                //     packList[i].add(deletePlayer);
                //     packList[i].add(goldText);
                //     packList[i].add(attackText);
                //     packList[i].add(lifeText);
                // }

                playerName = this.game.add.text(20, 92, currentRace + " " + (i + 1).toString(), { font: "20px Arial", fill: "black", align: "center" }, packList[i]); 

                deletePlayer.input.priorityID = 10;
                
                CreateToken(i);
                console.log(packList[0]);
                return;
            }
 
        }
}

function PickRace(player, number) {
    var randomChoice = Math.floor(Math.random() * 6);
    
       if (player == c1 || player == c2 || player == c3) {
        
            var x = 65;
            var y = 65;
        }
        else {
        
            x = 65;
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

    tokenList[player] = this.game.add.sprite(tokenX, tokenY, currentRace);
    tokenList[player].x = tokenX; 
    tokenList[player].inputEnabled = true;
    tokenList[player].input.enableDrag(true);

    tokenList[player].name = currentRace + (player).toString();
    tokenName = this.game.add.text(0, 0, currentRace + (player + 1).toString(), { font: "20px Arial", fill: "white", align: "center" });
    tokenList[player].addChild(tokenName);
    tokenName.y = tokenList[player].height;
    
    this.game.world.bringToTop(clouds);

}

function ShowQuestion() {

    
    if (questionUp == false) {
        
        if (turnText.text == "Quest!" || turnText.text == "cave" || turnText.text == "exit") {
        
            
        questionPanel = this.game.add.sprite(300, 0, 'answersheet');
        question = this.game.add.group();
        question.width = questionPanel.width;
        questionPanel.addChild(question);
            
        wrongButton = this.game.add.button(100, 400, 'wrong', CheckAnswer, this, 2,1,0);
        correctButton = this.game.add.button(400, 400, 'correct', CheckAnswer, this, 2,1,0);
        revealButton = this.game.add.button(250, 500, 'reveal', ShowAnswer, this, 2,1,0);
   
        GetQuestion();    
        
        questionText = this.game.add.text(20, 150, getQuestion, { font: "40px Arial", fill: "black", align: "center", wordWrap: true, wordWrapWidth: question.width - 20 });
        questionExplain = this.game.add.text(20, 50, qType, { font: "40px Arial", fill: "blue", align: "center", wordWrap: true, wordWrapWidth: question.width - 20 }); 
        
        deleteQuestion = this.game.add.button (520, 15, 'deleteX', DeleteQuestion, this, 2,1,0);
        question.addChild(deleteQuestion);
        
        question.addChild(wrongButton);
        question.addChild(correctButton);
        question.addChild(questionExplain);
        question.addChild(questionText);
        question.addChild(revealButton);

        questionUp = true;
   
        } else if (turnText.text == "village" || turnText.text == "castle" || turnText.text == "forest"
            || turnText.text == "witch" || turnText.text == "ants" || turnText.text == "stairs" || 
            turnText.text == "dragon" || turnText.text == "pool" || turnText.text == "castle \nprison") {
    
            questionPanel = this.game.add.sprite(300, 0, 'answersheet');
            question = this.game.add.group();
            question.width = questionPanel.width;
            questionPanel.addChild(question);
            
            deleteQuestion = this.game.add.button (520, 15, 'deleteX', DeleteQuestion, this, 2,1,0);
            question.addChild(deleteQuestion);
            
            GetCorner();

            questionUp = true;
        }
    }
}

function GetCorner() {
    
    switch (turnText.text) {
        
        case 'castle \nprison':
            GoToQuest();
            break;
        
        case 'castle':
            GoToQuest();
            break;
            
        case 'village':
            GoToQuest();
            break;
     
        case 'witch':
            GoToQuest();
            break;
            
        case 'forest':
            GoToQuest();
            break;
            
        case 'ants':
            GoToQuest();
            break;
            
        case 'dragon':
            GoToQuest();
            break;
            
        case 'pool':
            GoToQuest();
            break;
            
        case 'stairs':
            GoToQuest();
            break;

        
    }
    
    
}

function DeletePlayer() {

    getPlayer = parseInt(this.name.substring(1,2), 10) - 1;
    
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
            
            turnText.setText(totalPlayers + "\nplayers");
            
            return;
            
        }
    }
}

function ResetCurrentPlayer () {
      
    currentPlayer += 1;
    
    if (currentPlayer > totalPlayers) {
        
        currentPlayer = 1;
        DayNight();
    }
}    

function UpdateTurnText(box) {

    var checkSpace;
    
    if (box != 0 && box != 6 && box != 12 && 
        box != 18 && box != 15 && boardLevel[currentPlayer - 1] == 1) {
        
        checkSpace = 1;
        
    }
    else if (box != 0 && box != 4 && box != 8 && 
            box != 12 && box != 10 && boardLevel[currentPlayer - 1] == 2) {
        
        checkSpace = 1;
        
    } else {
        
        checkSpace = box;
    }
    
    if (boardLevel[currentPlayer - 1] == 1) {
        
        var night;
        
        if (dayNight == 1) {
            
            night = "";
            
        } else {
            
            night = "Night"
            
        }
        
        switch (checkSpace) {
            case 1 :
                turnText.setText("Quest!");
                backgroundAsset = "roadBackground" + night;
                break;
                
            case 0 :
                turnText.setText("castle");
                backgroundAsset = "castleBackground" + night;
                break;
                
            case 6 :
                turnText.setText("witch");
                backgroundAsset = "witchBackground" + night;
                break;
                
            case 12 :
                turnText.setText("forest");
                backgroundAsset = "forestBackground" + night;
                break;
                
            case 15 :
                turnText.setText("cave");
                backgroundAsset = "caveBackground" + night;
                break;
                
            case 18 :
                turnText.setText("village");
                backgroundAsset = "villageBackground" + night;
                break;
            
       
        }
   
    } else {
        
        if (boardLevel[currentPlayer - 1] == 2) {
        
        switch (checkSpace) {
            
            case 1 :
                turnText.setText("Quest!");
                backgroundAsset = "caveBackground";
                break;
            
            case 0 :
                turnText.setText("stairs");
                backgroundAsset = "stairsBackground";
                break;
                
            case 4 :
                turnText.setText("ants");
                backgroundAsset = "antsBackground";
                break;
                
            case 8 :
                turnText.setText("dragon");
                backgroundAsset = "dragonBackground";
                break;
                
             case 10 :
                turnText.setText("exit");
                backgroundAsset = "exitBackground";
                break;
                
            case 12 :
                turnText.setText("pool");
                backgroundAsset = "poolBackground";
                break;

            
       
        }
   
    }
        
    }

    
    
    
}

function ResetTurn() {
    
    

    isMagic = false;
    turn = 0;
    ManageTurn();
}

function CreateSun() {
    
    var sunX;
    
    if (backgroundAsset.includes("cave") || backgroundAsset.includes("castle")) {
        
        sunX = 350;
        
    } else {
        
        sunX = 550;
        
    }
    
    if (dayNight == 1) {
        
        sun = this.game.add.sprite(sunX, 300, "sun");
            
    } else {
        
        sun = this.game.add.sprite(sunX, 300, "moon");
        
    }
}

function StartSun() {
    
    this.game.physics.enable(sun);
    sun.enableBody = true;
    sun.body.gravity.setTo(0, 0);
    sun.body.velocity.setTo( 4, -15);
    
    deleteQuestion.input.enabled = false;
    
    
}

function StopSun() {
    //sun.body.velocity.setTo(0, 0);
    //question.add(sun);
    var newSun;
    
    if (dayNight == 1 ) {
        
        newSun = this.game.add.sprite(sun.x - 300, sun.y, "sun");    
        
    } else {
        
        newSun = this.game.add.sprite(sun.x - 300, sun.y, "moon");    
        
    }
    
    question.add(newSun);
    sun.destroy();
    console.log("stop sun before dq");
    
    deleteQuestion.input.enabled = true;
    console.log("stop sun after dq");
}

function CloudGenerator() {
    
    if (clouds.length > 0) {
        
        var cloudClean = [];
    
        clouds.forEach(function(cloud) {
            
            if (cloud.x < -100) {
                
                cloudClean.push(cloud);
                
            }
        
        });
        
        for (var i = 0; i < cloudClean.length; i++) {
            
            cloudClean[i].destroy();
            
        }
        
        
    }

    
    
    for (var i = 0; i < 5; i++) {
 
        if (clouds.length < 5) {
            
            var yRandom = Math.floor(Math.random() * (this.game.height - 100) + 50);
            var xRandom = getRandomInt(20, 1000);
            
            var randomScale = getRandomInt(.75,3);
            var cloud = clouds.create(this.game.width + xRandom, yRandom , 'cloud');
            console.log("x = " + this.game.width + " and y = " + yRandom);
            
            cloud.body.gravity.setTo(0, 0);
            cloud.body.velocity.setTo( -10, 0);
            cloud.scale.setTo(randomScale,randomScale);
            
            cloud.inputEnabled = true;
            cloud.events.onInputDown.add(DestroyThis, this);
        }     
        
    }
    console.log("CLA is " + clouds.length);

    
    

}

function DayNight() {
    
    var xRandom;
    var yRandom;
    var randomScale;
    
    
    dayNight += 1;
    
    if (dayNight == 3) {
        
        dayNight = 1;
        
    }
    
    if (dayNight == 2) {
        
        this.game.stage.backgroundColor = "#000000";
        sun.destroy();
        cloudsBack.destroy();
        moon = this.game.add.sprite(5,5, "moon");
        
        
        stars = this.game.add.group();
        
        for (var i = 0; i < 100; i++) {
            
            
            
            xRandom = getRandomInt(0, this.game.width);
            yRandom = getRandomInt(0, this.game.height);
            
            randomScale = (Math.random() * (0.30 - .05) + 0.05).toFixed(2);
            
            var star = stars.create(xRandom, yRandom, "star");   
         
            star.scale.setTo(randomScale,randomScale);
            
            
        }
        
      this.game.world.sendToBack(stars);
        
    } else if ( dayNight == 1) {
        
        this.game.stage.backgroundColor = "#4488AA";
        moon.destroy();
        sun = this.game.add.sprite(5,5, "sun");
        stars.destroy();
        
        cloudsBack = this.game.add.group();
        
        for (var i = 0; i < 20; i++) {
            
            
            
            xRandom = getRandomInt(0, this.game.width);
            yRandom = getRandomInt(0, this.game.height);
            randomScale = (Math.random() * (0.60 - .40) + 0.40).toFixed(2);
            
            var backCloud = cloudsBack.create(xRandom, yRandom, "cloud");   
            backCloud.alpha = .60;
            backCloud.scale.setTo(randomScale,randomScale);
            
             if ((xRandom > 300 && xRandom < 379) || (xRandom > 810 && xRandom < 900)) {
            
                backCloud.angle += 90;
            
            }
            
        }
        
        this.game.world.sendToBack(cloudsBack);
        
    } 
    
    
    
    
}

//***********Question & Puzzle**************

function GetQuestion() {

    getQuestion = "What's your favorite color?";
    
    CreateQuestion(getQuestion);

}

function CreateQuestion(puzzle) {
    
    var pickPuzzle = Math.floor(Math.random() * 5);
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
            
            case 4:
            qType = "Make a sentence";
            getQuestion = "grade";
            answer = "Your teacher will say if you are correct.";

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
    
    wrongButton.inputEnabled = false;
    correctButton.inputEnabled = false;
    
    //ADD RESULT OF LIFE = 0 WHEN ADDING DEATH CODE
    if (result == wrongButton) {
        turnText.setText("Next");
        if (parseInt(getGold.text, 10) >= 1) {
            
            getGold = getGold.setText((parseInt(getGold.text, 10) - 1).toString());
            questionExplain.setText("Sorry, you lose 1 gold."); 

        }
        else {
            
            getLife = getLife.setText((parseInt(getLife.text, 10) - 1).toString());
            questionExplain.setText("Sorry.  Oh no! You have no gold! \nLose 1 life.");
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

//*************Basic Card Interactions

function GoToQuest() {
    
    choiceText = this.game.add.text(50, 50, "Great!  Here's 1 Gold. \nWhat now?", { font: "40px Arial", fill: "green", align: "center", wordWrap: true, wordWrapWidth: question.width - 50 });
    var restName = packList[currentPlayer - 1].getChildAt(5).text.slice(0, -2);

    if (turnText.text === "Quest!") {
        turn = 3;
        
        
        
        restButton = this.game.add.button(250, 200, restName, StartActionTimer, 2,1,0);
        monsterButton = this.game.add.button(100, 400, "monsterButton", StartActionTimer, 2,1,0);
        treasureButton = this.game.add.button(380, 375, "treasureButton", StartActionTimer, 2,1,0);
        
        restButton.scale.setTo(1.5,1.5);
        var zees = this.game.add.sprite(55, -20, "sleeping");
        restButton.addChild(zees);
        
        question.addChild(restButton);
        question.addChild(monsterButton);
        question.addChild(treasureButton);
        
    } else if (turnText.text == "cave" || turnText.text == "exit") {
        
        turn = 3;
        restButton = this.game.add.button(400, 200, restName, StartActionTimer, 2,1,0);
        monsterButton = this.game.add.button(100, 400, "monsterButton", StartActionTimer, 2,1,0);
        treasureButton = this.game.add.button(400, 400, "treasureButton", StartActionTimer, 2,1,0);
        caveButton = this.game.add.button(100, 200, "caveButton", StartActionTimer, 2,1,0);
        
        question.addChild(restButton);
        question.addChild(monsterButton);
        question.addChild(treasureButton);
        question.addChild(caveButton);
 
    }
 
    else {
        
        //backgroundAsset = turnText.text + "Background";
        timerBackground = this.game.add.sprite(45,200, backgroundAsset);
        
        question.add(timerBackground);
        
        switch (turnText.text) {
            
            case "village":
                choiceText.setText("Welcome!  Take a look around our village! \nRoll the die.");
                turn = 18;
                CreateSun();
                break;
                
            case "witch":
                choiceText.setText("Do you want some help? \nRoll the die.");
                turn = 21;
                CreateSun();
                break;
            
            case "castle":
                choiceText.setText("Welcome!  Take a look around the castle! \nRoll the die.");
                turn = 19;
                CreateSun();
                break;
            
            case "forest":
                choiceText.setText("The forest can be a dangerous place! \nRoll the die.");
                turn = 20;
                CreateSun();
                break;
                
            case "ants":
                choiceText.setText("Aaaahhh!! Giant Ants!!! \nRoll the die.");
                turn = 23;
                break;
                
            case "dragon":
                choiceText.setText("The dragon stands up and.... \nRoll the die.");
                turn = 24;
                break;
    
            case "pool":
                choiceText.setText("You found a bright blue pool.... \nRoll the die.");
                turn = 25;
                break;
                
            case "stairs":
                choiceText.setText("You found the stairs to the 4 Doors.... \nRoll the die.");
                turn = 26;
                break;
                
            case "castle \nprison":
                choiceText.setText("You are free.  You may leave  \nnext turn.  Roll the die.");
                turn = 19;
                CreateSun();
                break;
       
        }
        
        
        
    }

    
    question.addChild(choiceText);
}

function StartActionTimer(action) {
    
    var buttons = 3;
    
    switch (action) {
        
        case restButton:
            choiceText.setText("You take a rest and......");
            RunTimer(action);
            break;
            
        case monsterButton:
            choiceText.setText("You go looking for a monster and......");
            RunTimer(action);
            break;
            
        case treasureButton:
            choiceText.setText("You look for some treasure and......");
            RunTimer(action);
            break;
            
        case caveButton:
            choiceText.setText("You walk to the cave...");
            buttons = 4;
            MakeCave();
            
        
            break;
            
        
    }
    
    for (var i = 0; i < buttons; i++) {
            
        question.getChildAt(1).destroy();
        
    }
    
    
    
}

function MakeCave() {
       // backgroundAsset = turnText.text + "Background";
        if (dayNight == 1) {
            
            cave = this.game.add.sprite(45,200, 'caveBackground');
            
        } else {
            
            cave = this.game.add.sprite(45,200, 'caveBackgroundNight');
            
        }
        
        CreateSun();
        StartSun();
        
        RollDie();
        timer = this.game.time.create(false);
        //var actionTime = Math.floor(((Math.random() * 3) + 3) * 1000);
        timer.add(rollTime, StopSun, this);
        timer.start();
        
        question.add(cave);
        
        
        if (boardLevel[currentPlayer - 1] == 1) {
            
            turn = 22;
            
        } else {
            
            turn = 27;
        }
       
}

function ManageQuest(choice) {
    
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    
  
    
    switch (choice) {
        case restButton:
            
            var resting = Math.floor(Math.random() * 10 + 1);
           
           
            
            if (resting == 1) {
                
                getGold = getGold.setText((parseInt(getGold.text, 10) - 1).toString());
                getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
                choiceText.setText("....Oh no!  While you were sleeping a thief stole 1 gold! \nGain 1 life.");
                turnText.setText("Next");
            }
            else if (resting == 2) {
                choiceText.setText("No rest for you!  A monster wakes you up!");
                turn = 4;
                RunDelay(FightMonster, "none", 3000);
                
                
            }
            else {
                choiceText.setText("....you had a great rest! \nGain 1 life.");
                getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
                turnText.setText("Next");
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
    'snake', 'werewolf', 'thief', 'vampire'];
    
    
    
    var pickMonster = Math.floor(Math.random() * monsterList.length);
    
    if (reroll == false) {

        monster = monsterList[pickMonster];
        monsterModifier = getRandomInt(2,4);
 
    }

    CheckInventory("sword", "strength");

    if (hasItem && hasBonus) {
        
        monsterModifier -= 2;
        
        
        
    } else if ((hasItem && !hasBonus) || (!hasItem && hasBonus)) {
        
        monsterModifier -= 1;
    }
    
    if (frog == true) {
        monsterModifier = 6;
        choiceText.setText("A " + monster + " is attacking you! \nRoll to fight! \nYou need a " + monsterModifier.toString() + " to win!!!" );
        
    } else {
        
        choiceText.setText("A " + monster + " is attacking you! \nRoll to fight! \nYou need a " + monsterModifier.toString() + " to win!!!" );    
        
    }
    
    reroll == false;
    
    var enemy = this.game.add.sprite(400, 200, monster);
    question.add(enemy);
}

function AttackResult() {
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getAttack = packList[currentPlayer - 1].getChildAt(3);
    //dieResult = dice.animations.currentAnim.frame + 1;
    
    if (dieResult == monsterModifier) {
        
        choiceText.setText("Try again! \nRoll Again!!");
        return;
        
    } else if (dieResult < monsterModifier) {
        
        CheckInventory("shield", "luck" );
        
        if (hasItem && hasBonus) {
            
            choiceText.setText("Uggghh! The " + monster + " won. \nYour shield saved 1 life.  \nDo you want to roll again?");    
            CreateMagicButtons();
            
            return;
        } else if (hasItem){
            
            choiceText.setText("Uggghh! The " + monster + " won. \nYour shield saved 1 life.");                
            turn = 3;
            turnText.setText("turn \nover");
            return;
        } else if (hasBonus) {
            
            choiceText.setText("Uggghh! The " + monster + " won. \nDo you want to roll again?");                
            CreateMagicButtons();
            
            return;
        } else {
            
            choiceText.setText("Uggghh! The " + monster + " won. \nLose 1 life.");
            getLife = getLife.setText((parseInt(getLife.text, 10) - 1).toString());
            turn = 3;
            turnText.setText("turn \nover");
        }
        
       
    }
    else {
        choiceText.setText("You won!!  \nGain 1 attack!");
        getAttack = getAttack.setText((parseInt(getAttack.text, 10) + 1).toString());
        turn = 3;
        
        if (hasQuest[currentPlayer - 1][0] == "witch") {
            
            turnText.setText("Mission");
            RunDelay(ManageChallenge, "none", 3000);
            
        } else {
            
            turnText.setText("turn \nover");
            
        }
        
    }
    
    
    
}

function CreateMagicButtons () {
    
    noMagicButton = this.game.add.button(100, 400, "noMagicButton", UseMagic, 2,1,0);
    useMagicButton = this.game.add.button(400, 400, "useMagicButton", UseMagic, 2,1,0);
    
    question.add(noMagicButton);
    question.add(useMagicButton);
    
}

function UseMagic(magic) {
    
    if (magic == noMagicButton) {
        
        if (turn == 4) {
            
             choiceText.setText("You still have your magic.");

            
        }
        
    } else {
        
        if (turn == 4) {
            
            reroll = true;
            emitterList[currentPlayer].destroy(); 
            DeleteInventory();
            playerBonus[currentPlayer - 1][1] = ["none"];
            FightMonster();
            
            
        }
        
    }
    
    
    
}

function CreateItem() {
    
    var giveBonus = Math.floor(Math.random() * 10 + 1);
    
    //sword is plus 1 in a fight, ring is nothing, shield will save a life in a fight once then break,
    //potion is bonus dependent, wand is bonus dependent, boots are bonus dependent.
    treasureType = ['sword', 'ring', 'shield', 'potion', 'wand', 'boots'];
    //gold is worth 2 gold, life adds 2 life(while wearing), strength adds 1 strength while wearing
    //luck lets you reroll once(anything) then its gone, speed lets you reroll movement twice then magic is gone.
    bonusType = ['gold', 'life', 'luck', 'speed', 'strength'];

    

    if (giveBonus > 4) {
        
        treasureType = ['sword', 'ring', 'shield', 'potion', 'wand', 'boots'];
        itemObject = treasureType[getRandomInt(0, treasureType.length)];
        itemModifier = bonusType[getRandomInt(0, bonusType.length)];
        currentItem = itemObject + " of " + itemModifier;
        isMagic = true;
        
    } else {
        
        treasureType = ['sword', 'shield', 'boots'];
        itemObject = treasureType[getRandomInt(0, treasureType.length)];
        itemModifier = "none";
        currentItem = itemObject;
        isMagic = false;
    }   

}

function DisplayItem(item) {
    
    displayItem = this.game.add.sprite(225 ,275, item);
    displayItem.name = "displayItem" + item;
    
    if (item != "coin") {
        
        garbageButton = this.game.add.button(50, 510, 'garbage', AddInventory, this, 2,1,0);
        keepButton = this.game.add.button(300, 510, 'take', AddInventory, this, 2,1,0);
        
        question.addChild(keepButton);
        question.addChild(garbageButton);
            
    }

    question.addChild(displayItem);
    
    console.log(question);
    
    if (isMagic == true) {
        
        CreateParticles(itemModifier + "Particle", displayItem, false);
            
    }
}

function AddInventory(choice) {

    if (choice == garbageButton) {
        
        if (isMagic == true) {
            
            emitterList[0].destroy();    
            question.getChildAt(6).destroy();
            
        } else {
            
            question.getChildAt(5).destroy();
            
        }
  
    } else {

        DeleteInventory();

        
        if (isMagic == true) {
            console.log(question);
            emitterList[0].destroy();
            question.getChildAt(6).destroy();
            inventory = this.game.add.sprite (40,110, itemObject);
            inventory.scale.setTo(.25,.25);
            packList[currentPlayer - 1].add(inventory);
            CreateParticles(itemModifier + 'Particle', inventory, true);
            playerBonus[currentPlayer - 1] = [itemObject, itemModifier];
            displayItem.destroy();
        } else {
            console.log(question);
            displayItem.destroy();
            inventory = this.game.add.sprite (40,110, currentItem);
            inventory.scale.setTo(.25,.25);
            packList[currentPlayer - 1].add(inventory);
        }
    }
    
    
    garbageButton.destroy();
    keepButton.destroy();
    turnText.setText("turn \nover");
    
}

function CreateParticles(particle, object, mini) {
    
    var getPos = cList[currentPlayer - 1];
    var currentEmitter;
    //StartParticles(emitter, particle);
    if (mini == true) {
        
        emitterList[currentPlayer] = this.game.add.emitter(getPos.x + getPos.width - 50  , getPos.y + getPos.height - 10, 100);

        currentEmitter = emitterList[currentPlayer];

        currentEmitter.maxParticleScale = .35;
        currentEmitter.minParticleScale = 0.15;
        
        currentEmitter.makeParticles(particle);


        currentEmitter.gravity = -200;

        currentEmitter.start(false, 500, 100);
        
        
    } else {
        emitterList[0] = this.game.add.emitter(600, object.world.y + object.height, 100);
        
        currentEmitter = emitterList[0];
        
        currentEmitter.maxParticleScale = 1.0;
        currentEmitter.minParticleScale = 0.5;
        
        currentEmitter.makeParticles(particle);


        currentEmitter.gravity = -200;

        currentEmitter.start(false, 1000, 100);
        
    }
    
    

    
}

function CheckInventory(item, modify) {
    
    console.log("inventory Checked");
    
    var treasure = playerBonus[currentPlayer - 1][0];
    var bonus = playerBonus[currentPlayer - 1][1];
    
    console.log(item + " and " + treasure);
    console.log(modify + " and " + bonus);
    
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

function DeleteInventory() {
    
    if (packList[currentPlayer - 1].length > 6) {
            
        packList[currentPlayer - 1].getChildAt(6).destroy();
        
        emitterList[currentPlayer].destroy();    
    }
    
}

function DeleteQuestion() {
    
    CloudGenerator();
    
    if (typeof displayItem !== "undefined") {
        
        if (isMagic == true) {
   
            emitterList[0].destroy();
        }    
        
    }

    questionPanel.destroy();
    questionUp = false;
    
    if (frog == true) {
        
        var getAttack = packList[currentPlayer - 1].getChildAt(3);
        var getRace = packList[currentPlayer - 1].getChildAt(5).text.slice(0, -2);
        
         isFrog[currentPlayer - 1] = false;
        packList[currentPlayer - 1].getChildAt(0).loadTexture(getRace);
        tokenList[currentPlayer - 1].loadTexture(getRace);
        getAttack = getAttack.setText(saveStat[currentPlayer - 1].toString());
        
        frog = false;
    }
    
    
    if (reroll == false) {
        
        ResetCurrentPlayer();
 
    }

    ResetTurn();
}


//*******************Corner Interactions

//Add tunnel results
function TunnelResult() {
    console.log("TR is okay");
    
    if (turn == 22) {
        
    choiceText.setText("You found a way in!");
    boardLevel[currentPlayer - 1] = 2;
    LevelSwitch("in10");
        
    }   else {
        
        choiceText.setText("You found a way out!");
        boardLevel[currentPlayer - 1] = 1;
        LevelSwitch("out15");
        
    }

}

function TreasureHunt() {
    
    
    
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    var treasureFound = getRandomInt(1,10);
    
    if (treasureFound == 1) {
        
        choiceText.setText("You looked all day!  \nSorry, but, you found nothing.");
        
    } else if (treasureFound == 2){
        
        choiceText.setText("No treasure....but you did \nfind 1 Gold.");
        getGold = getGold.setText((parseInt(getGold.text, 10) + 1).toString());
        DisplayItem("coin");
        
    } else if (treasureFound == 3) {
        
        turn = 4;
        RunDelay(FightMonster, "none", 3000);
        choiceText.setText("Uh oh...you found a monster!");
        
        
    } else {
        CreateItem();
        var article;
        console.log(itemObject.slice(-1));
        if (itemObject.slice(-1) == "s") {
            
            article = "some";
            
        } else {
            article = "a";
        }

        if (isMagic == true)  {
            
            choiceText.setText("Wow! You found " + article + "\n" + currentItem + "!");    
            
        } else {
            
            choiceText.setText("You found " + article + "\n" + currentItem + "!");
        }
        
        DisplayItem(itemObject);
    }
}
//village is done
function VillageResult() {
    console.log("VillageResult");
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    switch (dieResult) {
        
        case 1:
            choiceText.setText("A farmer gives you some food.  \nGain 1 life.");
            getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
            turnText.setText("next");
            break;
            
        case 2:
            choiceText.setText("A traveller gives you a ride.  \nGain 1 life and roll to move again.");
            getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
            turn = 1;
            reroll = true;
            break;
            
        case 3:
            choiceText.setText("While you are having fun, a thief steals 1 gold.");
            getGold = getGold.setText((parseInt(getGold.text, 10) - 1).toString());
            turnText.setText("next");
            break;
            
        case 4:
            choiceText.setText("A farmer gives you some food.  \nGain 1 life.");
            getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
            turnText.setText("next");
            break;
            
        case 5:
            choiceText.setText("A stranger gives you a glowing rock.  \nYou don't know what it does!?!");
            DisplayItem("rock");
            currentItem = "rock";
            break;
            
        case 6:
            choiceText.setText("You fight with some farmers.  \nThey kick you out!");
            reroll = true;
            RunDelay(CreateMovementToken, 1, 4000);
            RunDelay(DeleteQuestion, "none", 3500);
            
            break;

    }
    
    
}
//Castle is done
function CastleResult() {
    console.log("CastleResult");
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getAttack = packList[currentPlayer - 1].getChildAt(3);
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    
    switch (dieResult) {
        
        case 1:
            choiceText.setText("You eat at a delicious restaurant.  \nGain 1 life.");
            getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
            turnText.setText("turn \nover");
            break;
            
        case 2:
            choiceText.setText("A traveller gives you a ride.  \nGain 1 life and roll to move again.");
            getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
            turn = 1;
            reroll = true;
            break;
            
        case 3:
            choiceText.setText("While you are having fun, a thief steals 1 gold.");
            getGold = getGold.setText((parseInt(getGold.text, 10) - 1).toString());
            turnText.setText("turn \nover");
            break;
            
        case 4:
            choiceText.setText("You train with some soldiers.  \nGain 1 strength.");
            getAttack = getAttack.setText((parseInt(getAttack.text, 10) + 1).toString());
            turnText.setText("turn \nover");
            break;
            
        case 5:
            choiceText.setText("Soldiers think you're a thief. \nThey arrest you!!");
            RunDelay(Arrested, "none", 3000);
            
            break;
            
        case 6:
            choiceText.setText("The King wants to help you!.  \nHe shows you a secret way into the mountain!");
            LevelSwitch("teleportInner");
            turnText.setText("turn \nover");
            break;

    }
    
    
}
//Witch is done
function WitchResult() {
    console.log("WitchResult");
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getAttack = packList[currentPlayer - 1].getChildAt(3);
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    if (hasQuest[currentPlayer  -1][0] == true && dieResult == 6) {
        
        dieResult = getRandomInt(0,5);
        
    }
    
    
    switch (dieResult) {
        
        case 1:
            choiceText.setText("The witch heals you.  \nGain 1 life.");
            getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
            turnText.setText("turn \nover");
            
            break;
            
        case 2:
            choiceText.setText("She says, 'Good Luck!' and then \nteleports you inside the mountain!");
            LevelSwitch("teleportInner");
            turnText.setText("turn \nover");
            
            break;
            
        case 3:
            choiceText.setText("The witch makes you stronger!  \nGain 1 strength.");
            getAttack = getAttack.setText((parseInt(getAttack.text, 10) + 1).toString());
            turnText.setText("turn \nover");
            
            break;
            
        case 4:
            choiceText.setText("She makes you drink a potion.  \nGain 1 strength.");
            getAttack = getAttack.setText((parseInt(getAttack.text, 10) + 1).toString());
            turnText.setText("turn \nover");
            
            break;
            
        case 5:
            choiceText.setText("She says, 'Ooops!'  \nShe turns you into a frog.  You'll be okay after 1 turn.");
            FrogChange();
            turnText.setText("turn \nover");
            
            break;
            
        case 6:
            choiceText.setText("She says, 'Maybe you can help me.'  \nDo you help the witch?");
            choice = "helpwitch";
            Choice();

            
            break;

    }
    
    
}
//Forest: spider, treasure chest
function ForestResult() {
    
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getAttack = packList[currentPlayer - 1].getChildAt(3);
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    
    switch (dieResult) {
        
        case 1:
            choiceText.setText("You find some special fruit!.  \nGain 1 life.");
            getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
            turnText.setText("turn \over");
            break;
            
        case 2:
            choiceText.setText("You get lost and eat nothing!  \nLose 1 life.");
            getLife = getLife.setText((parseInt(getLife.text, 10) - 1).toString());
            turn = 1;
            //reroll = true;
            turnText.setText("turn \over");
            break;
            
        case 3:
            choiceText.setText("Oh no! A monster found you!");
            FightMonster();
            //turnText.setText("next");
            break;
            
        case 4:
            choiceText.setText("Giant spiders attack you!  \nCan you defeat them all!");
            GiantSpider();
            //turnText.setText("next");
            break;
            
        case 5:
            choiceText.setText("You find an old treasure chest.  \nDo you open it?.");
            Choice();
            choice = "treasurechest";
            turnText.setText("turn \over");
            break;
            
        case 6:
            choiceText.setText("You meet a group of thieves.  \nThey ask you for help!!");
            choice = "robinhood";
            Choice();


            break;

    }
    
    
}
//Pool: pool monster && fairygame
function PoolResult() {
    console.log("PoolResult");
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    switch (dieResult) {
        
        case 1:
            choiceText.setText("A fairy gives you some magic water.  \nGain 1 life.");
            getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
            turnText.setText("next");
            break;
            
        case 2:
            choiceText.setText("You find a door behind the pool.  \nDo you open it?");
            choice = "portal";
            Choice();
            break;
            
        case 3:
            choiceText.setText("Oh no! You woke up the Pool Monster!");
            turn = 4;
            PoolMonster();
            
            break;
            
        case 4:
            choiceText.setText("You find some gold in the pool!  \nGain 2 gold.");
            getGold = getGold.setText((parseInt(getGold.text, 10) + 2).toString());
            turnText.setText("next");
            break;
            
        case 5:
            choiceText.setText("You find a bright blue rock in the water.  \nYou don't know what it does!?!");
            //add blue rock
            DisplayItem("rock");
            currentItem = "rock";
            break;
            
        case 6:
            choiceText.setText("A fairy wants to play a game with you.  \nDo you want to play?");
            choice = "fairygame";
            Choice();
            
            
            break;

    }
    
    
}
//Dragon: fight dragon, rock, dragon game
function DragonResult() {
    console.log("DragonResult");
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    switch (dieResult) {
        
        case 1:
            choiceText.setText("...is hungry!!  \nGet ready!");
            FightDragon();
            break;
            
        case 2:
            choiceText.setText("...wants a rock.  \nDo you have a rock?");
            choice = "giverock";
            Choice();
            break;
            
        case 3:
            choiceText.setText("...is sleepy.  You both rest. \nGain 1 life.");
            getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
            break;
            
        case 4:
            choiceText.setText("...is happy to see you! \nHave a gift!");
            CreateItem();
            DisplayItem(currentItem);
            break;
            
        case 5:
            choiceText.setText("...gives you a bright red rock.  \nYou don't know what it does!?!");
            //add red rock
            DisplayItem("rock");
            currentItem = "rock";
            break;
            
        case 6:
            choiceText.setText("...wants to play a game with you!  \nDo you want to play?");
            choice = "dragongame";
            Choice();
            
            break;

    }
    
    
}
//Ants: fight ants, rock
function AntsResult() {
    console.log("AntsResult");
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    switch (dieResult) {
        
        case 1:
            choiceText.setText("The ants don't like you and take you away!  \nWhere are you?");
            Portal();
            break;
            
        case 2:
            choiceText.setText("...wants a rock.  \nDo you have a rock?");
            choice = "giverock";
            Choice();
            break;
            
        case 3:
            choiceText.setText("The ants are angry!! \nGet ready to fight!");
            FightAnts();
            break;
            
        case 4:
            choiceText.setText("One ant really likes you! \nYou have a pet!");
            PetAnt();
            break;
            
        case 5:
            choiceText.setText("The ants give you a yellow rock.  \nYou don't know what it does!?!");
            //add yellow rock
            DisplayItem("rock");
            currentItem = "rock";
            break;
            
        case 6:
            choiceText.setText("The ants want to play a game.  \nDo you want to play?");
            choice = "antsgame";
            Choice();
            
            break;

    }
    
    
}

function Portal() {
    
    var event = getComputedStyle(0,4);
    
    switch (event) {
        case 0:
            choiceText.setText("You find a treasure room!");
            CreateItem();
            DisplayItem(currentItem);
            break;
            
        case 1:
            choiceText.setText("You fall down a hole!  \nWhere are you?");
            Hole();
            break;
            
        case 2:
            choiceText.setText("You find a sleeping monster!  \nWhere are you?");
            FightMonster();
            break;
        
        
    }
    
    
}

function Hole() {
    
    inOut = getRandomInt(0,2);
    var area;
    if (inOut == 0) {
        
        area = boardSpaces;
        
    } else {
        
        area = boardSpacesInner;
    }
    
    teleport = getRandomInt(0, area.length);
    
    LevelSwitch("teleport");
    
    
}

function Choice() {
    
    switch (choice) {
        case "helpwitch":
            ActivateChoice(HelpWitch);
            break;
            
        case "robinhood":
            ActivateChoice(RobinHood);
            break;
            
        case "frog":
            
            ActivateChoice(FrogChange);
            break;
            
        case "treasurechest":
            
            ActivateChoice(TreasureChest);
            break;
            
        case "giverock":
            
            ActivateChoice(GiveRock);
            break;
            
        case "fairygame":
            
            ActivateChoice(FairyGame);
            break;
            
        case "dragongame":
            
            ActivateChoice(DragonGame);
            break;
            
        case "antsgame":
            
            ActivateChoice(AntsGame);
            break;
        
    }
    
    
}

function ActivateChoice(doThis) {
    
    noButton = this.game.add.button(50, 510, 'noButton', doThis, this, 2,1,0);
    yesButton = this.game.add.button(300, 510, 'yesButton', doThis, this, 2,1,0);
    
    question.addChild(noButton);
    question.addChild(yesButton);
    
    
}

function ManageChallenge() {
    
    var getLife = packList[currentPlayer - 1].getChildAt(4);
    var getAttack = packList[currentPlayer - 1].getChildAt(3);
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    switch (hasQuest[currentPlayer - 1][1]) {
        case 'witch':
            
            if (hasQuest[currentPlayer -1][2] == 0) {
                
                choiceText.setText("One more zombie to go.");
                hasQuest[currentPlayer - 1][2] += 1;
                
            } else {
                
                hasQuest[currentPlayer - 1][2] = 0;
                hasQuest[currentPlayer - 1][0] = false;
                hasQuest[currentPlayer - 1][1] = "none";
                choiceText.setText("Nice!  The witch is happy and gives you 1 gold, 1 life, and 1 strength!");
                getLife = getLife.setText((parseInt(getLife.text, 10) + 1).toString());
                getAttack = getAttack.setText((parseInt(getAttack.text, 10) + 1).toString());
                getGold = getGold.setText((parseInt(getGold.text, 10) + 1).toString());
                
                questList[currentPlayer - 1].destroy();
            }
            break;
            
            
        case 'robinhood':
            
            if (dieResult < 3) {
                
                choiceText.setText("Awww...the guards catch you!  Lose 1 life.");
                getLife = getLife.setText((parseInt(getLife.text, 10) - 1).toString());
                
            } else {
                
                hasQuest[currentPlayer - 1][0] = false;
                hasQuest[currentPlayer - 1][1] = "none";
                choiceText.setText("Nice!  The thieves are happy! Gain 5 gold");
                getGold = getGold.setText((parseInt(getGold.text, 10) + 5).toString());
                
                questList[currentPlayer - 1].destroy();
            }
            
            
            break;

    }
    
    
}

function FrogChange() {
    
    var getAttack = packList[currentPlayer - 1].getChildAt(3);
    
    saveStat[currentPlayer - 1] = parseInt(getAttack,10);
    getAttack = getAttack.setText("0");
    packList[currentPlayer - 1].getChildAt(0).loadTexture('frog');
    tokenList[currentPlayer - 1].loadTexture('frog');
    isFrog[currentPlayer - 1] = true;
    
    
    
    
}

function TreasureChest() {
    
    
    
}

function RobinHood(yesNo) {
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    if (yesNo == yesButton) {
        
        choiceText.setText("I'm good...like Robin Hood. Get my friend out of the castle prison and I'll reward you!");
        
        hasQuest[currentPlayer - 1][0] = true;
        hasQuest[currentPlayer - 1][1] = "robinhood";
        
        questList[currentPlayer - 1] = this.game.add.sprite(cList[currentPlayer - 1].x, cList[currentPlayer - 1].y +20, "questMarker");
        
    }else {
        
        choiceText.setText("Well, that's okay. \nI'll still give you a gold.");
        getGold = getGold.setText((parseInt(getGold.text, 10) + 1).toString());
    }
    
    
    noButton.destroy();
    yesButton.destroy();
    
    turnText.setText("turn \nover");
    
    
    
}

function GiantSpider() {
    
    
    
}

function FightDragon() {
    
}

function FightAnts() {
    // body...
}

function PetAnt() {
    // body...
}

function DragonGame() {
    //Create Telepathy Game here
}

function AntsGame() {
    //Create Telepathy Game here
}

function PoolMonster() {
    // body...
}

function FairyGame() {
    
    
}

function HelpWitch(yesNo) {
    
    var getGold = packList[currentPlayer - 1].getChildAt(2);
    
    if (yesNo == yesButton) {
        
    choiceText.setText("There are too many zombies! \nKill 2 zombies and I'll give you a nice present.");
    
    hasQuest[currentPlayer - 1][0] = true;
    hasQuest[currentPlayer - 1][1] = "witch";
    
    questList[currentPlayer - 1] = this.game.add.sprite(cList[currentPlayer - 1].x, cList[currentPlayer - 1].y +20, "questMarker");
        
    }else {
        
        choiceText.setText("Well, that's okay. \nI'll still give you a gold.");
        getGold = getGold.setText((parseInt(getGold.text, 10) + 1).toString());
    }
    
    
    noButton.destroy();
    yesButton.destroy();
    
    turnText.setText("turn \nover");
}

function Arrested() {
    
    choiceText.setText("Next turn you must stay here!.  You will make a castle roll only.");
    arrested[currentPlayer - 1] = true;
    
    if (hasQuest[currentPlayer - 1][1] == "robinhood") {
            
            turnText.setText("Mission");
            RunDelay(PrisonBreak, "none", 3000);
            
        }
}

function PrisonBreak() {
    
    choiceText.setText("You find the forest thief.  Do you try to escape with him?");
    
    ActivateChoice(PrisonBreakResult);
    
    
}

function PrisonBreakResult(yesNo) {
    
    if (yesNo == yesButton) {
        
        choiceText.setText("Roll the die to escape!");
        turn = 28;
        
    } else {
        
        choiceText.setText("The forest thief looks sad.");
        turnText.setText("turn \nover");
        
    }
    
    yesButton.destroy();
    noButton.destroy();
    
    
    
    
}

function GiveRock() {
    
}


//***************Tools


function RunTimer(doThis) {
    
    timerGroup = this.game.add.group();
    question.add(timerGroup);
    // timerGroup.x = question.x;
    // timerGroup.y = question.y;
    timerBackground = timerGroup.create(45,200, backgroundAsset);
    
    CreateSun();
    
    StartSun();

    timer = this.game.time.create(false);
   
    
    var actionTime = Math.floor(((Math.random() * 3) + 3) * 1000);
    
    timer.add(actionTime, StopSun, this);
    
    timer.add(actionTime, ManageQuest, this, doThis);

    timer.start();
    
}

function RunDelay(ToDo, arg, timeX) {
    
    timer = this.game.time.create(false);
    //var actionTime = Mavar actionTime = 4000;
    if (arg == "none") {
        
        timer.add(timeX, ToDo, this);    
        
    } else {
        
        timer.add(timeX, ToDo, this, arg);    
    }
    
    
    timer.start();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function DestroyThis (thing) {
    
    thing.destroy();
    
    
}



