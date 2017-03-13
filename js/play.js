var c1;
var c2;
var c3;
var c4;
var c5;
var c6;

var card;

var token;


var playState = {
 
create: function () {


    game.add.sprite(300,0, 'board');
    
    c1 = game.add.sprite(100, 50, 'sheet');
    c2 = game.add.sprite(100, 200, 'sheet');
    c3 = game.add.sprite(100, 350, 'sheet');
    
    c4 = game.add.sprite(1000, 50, 'sheetX');
    c5 = game.add.sprite(1000, 200, 'sheetX');
    c6 = game.add.sprite(1000, 350, 'sheetX');
    
    card = game.add.sprite(125, 500, 'card');
    
    token = game.add.sprite(350, 50, 'token');
    token.inputEnabled = true;
    token.input.enableDrag(false);
 
    
   
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
    this.scale.setScreenSize( true );
},

update: function() {


}
  
};

