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

var goldText;
var attackText;
var lifeText;

var card;

var token;

var dice;
var dieRoll;



var playState = {
 
create: function () {


    game.add.sprite(300,0, 'board');
    
    c1 = game.add.sprite(100, 50, 'sheet');
    c2 = game.add.sprite(100, 200, 'sheet');
    c3 = game.add.sprite(100, 350, 'sheet');
    
    c4 = game.add.sprite(1000, 50, 'sheetX');
    c5 = game.add.sprite(1000, 200, 'sheetX');
    c6 = game.add.sprite(1000, 350, 'sheetX');
    
    cList = [c1,c2,c3,c4,c5,c6];
    
    TurnOnCharacters();
    
    
    card = game.add.sprite(125, 500, 'card');
    
    token = game.add.sprite(350, 50, 'token');
    token.inputEnabled = true;
    token.input.enableDrag(false);
    
    dice = game.add.sprite(950, 500, 'die');
    dice.animations.add('roll', [0,1,2,3,4,5], 10, true);
    dice.inputEnabled = true;
    dice.events.onInputDown.add(rollDie, this);
    
    
    
    
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
    this.scale.setScreenSize( true );
},

update: function() {


}
  
};

function rollDie() {
    
    dice.animations.play('roll');
    
    //timer
    var rollTimer = game.time.create(false);
    
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
                
                    goldText = game.add.text(16, 3, gold, goldStyle);
                    attackText = game.add.text(9, 46, attack, attackStyle);
                    lifeText = game.add.text(16, 88, life, lifeStyle);
                }
                else {
                
                    goldText = game.add.text(72, 3, gold, goldStyle);
                    attackText = game.add.text(79, 46, attack, attackStyle);
                    lifeText = game.add.text(72, 88, life, lifeStyle);
                }
        
                player.addChild(goldText);
                player.addChild(attackText);
                player.addChild(lifeText);
                
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
        
            var x = 45;
            var y = 65;
        }
    
    
    switch (randomChoice) {
        case 0:
            p1 = game.add.sprite(x, y, 'elf');
            player.addChild(p1);
            p1.anchor.set(0.5,0.5);
            break;
        
        case 1:
            p2 = game.add.sprite(x, y, 'hobbit');
            player.addChild(p2);
            p2.anchor.set(0.5,0.5);
            break;
        
        case 2:
            p3 = game.add.sprite(x, y, 'knight');
            player.addChild(p3);
            p3.anchor.set(0.5,0.5);
            break;
                
        case 3:
            p4 = game.add.sprite(x, y, 'ogre');
            player.addChild(p4);
            p4.anchor.set(0.5,0.5);
            break;
    
        case 4:
            p5 = game.add.sprite(x, y, 'warrior');
            player.addChild(p5);
            p5.anchor.set(0.5,0.5);
            break;
        
        case 5:
            p6 = game.add.sprite(x, y, 'wizard');
            player.addChild(p6);
            p6.anchor.set(0.5,0.5);
            break;
   
    }
    
}