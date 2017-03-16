var c1;
var c2;
var c3;
var c4;
var c5;
var c6;
var cList;
var cSet = [false, false, false, false, false, false];

var p1;
var p2;
var p3;
var p4;
var p5;
var p6;
var pList = [0,1,2,3,4,5];

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
//var deleteX;

var card;

var question;
var test;

var token;

var dice;
//var dieRoll;

var currentRace;
var playerNumber = 0;
var players = [];


var playState = {
 
create: function () {

    //Create Game Board
    game.add.sprite(300,0, 'board');
    
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
    
    
    
    
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
    this.scale.setScreenSize( true );
},

update: function() {


}
  
};

function rollDie() {
    
    dice.animations.play('roll');
    
    //timer
    var rollTimer = this.game.time.create(false);
    
    var rollTime = Math.floor(((Math.random() * 3) + 3) * 1000);
    
    rollTimer.loop(rollTime, stopDie, this);
    
    rollTimer.start();
}

function stopDie () {
    
    dice.animations.stop();
    
}


function TurnOnCharacters () {
    
    for (var i = 0; i < 6; i++) {
        
        cList[i].inputEnabled = true;
        cList[i].events.onInputDown.add(AddStats, cList[i]);
        cList[i].name = "c" + (i + 1).toString();
        
        packList[i] = game.add.group();
    }
}


function AddStats(player) {
        
        for (var i = 0; i < cSet.length; i++) {
            
            var pName = player.name;
            
            var setPlayer = parseInt(pName.substring(1,2)) - 1;
            
            if (setPlayer == i && cSet[i] == false) {
                
                cSet[i] = true;
                
                PickRace(player);
        
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
                    var deletePlayer = this.game.add.button(80, -10, 'deleteX', DeletePlayer, this, 2,1,0);
                   
                    
                }
                else {
                
                    goldText = this.game.add.text(72, 3, gold, goldStyle);
                    attackText = this.game.add.text(79, 46, attack, attackStyle);
                    lifeText = this.game.add.text(72, 88, life, lifeStyle);
                    deletePlayer = this.game.add.button(-20, -10, 'deleteX', DeletePlayer, this, 2,1,0);
                    
                }
                
                deletePlayer.name = "delete" + player.name;
                
                player.addChild(goldText);
                player.addChild(attackText);
                player.addChild(lifeText);
                player.addChild(deletePlayer);
                
                packList[i].add(goldText);
                packList[i].add(attackText);
                packList[i].add(lifeText);
                packList[i].add(deletePlayer);
                
                
                deletePlayer.input.priorityID = 10;
                
                CreateToken();
                
                return;
            }
            
            
            
        }
        
        

    
}


function PickRace(player) {
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
            p1 = this.game.add.sprite(x, y, 'elf');
            player.addChild(p1);
            p1.anchor.set(0.5,0.5);
            currentRace = "elf";
            break;
        
        case 1:
            p2 = this.game.add.sprite(x, y, 'hobbit');
            player.addChild(p2);
            p2.anchor.set(0.5,0.5);
            currentRace = "hobbit";
            break;
        
        case 2:
            p3 = this.game.add.sprite(x, y, 'knight');
            player.addChild(p3);
            p3.anchor.set(0.5,0.5);
            currentRace = "knight";
            break;
                
        case 3:
            p4 = this.game.add.sprite(x, y, 'ogre');
            player.addChild(p4);
            p4.anchor.set(0.5,0.5);
            currentRace = "ogre";
            break;
    
        case 4:
            p5 = this.game.add.sprite(x, y, 'warrior');
            player.addChild(p5);
            p5.anchor.set(0.5,0.5);
            currentRace = "warrior";
            break;
        
        case 5:
            p6 = this.game.add.sprite(x, y, 'wizard');
            player.addChild(p6);
            p6.anchor.set(0.5,0.5);
            currentRace = "wizard";
            break;
   
    }
    
}

function CreateToken() {
    
    token = this.game.add.sprite(350, 50, currentRace);
    token.inputEnabled = true;
    token.input.enableDrag(false);
    playerNumber += 1;
    token.name = currentRace + playerNumber.toString();
    players.push(token);
    
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
    
    //var text = game.add.text(200,200, this.name, { font: "200px Arial", fill: "#ff0044", align: "center" });
     
    //rollDie();
    // var getPlayer = this.name;
    // var thisPlayer;
    // for (var i = 0; i < cList.length; i++) {
        
    //     if (i.name == getPlayer ){
    //         thisPlayer = i;
    //     }
        
        
    // }
    
    //this.removeChildren(0, this.name.length - 1);
    
}
    
}