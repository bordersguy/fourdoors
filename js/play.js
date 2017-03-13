var panel;
var player;
var platforms;
var cursors;

var bubbles;
var score = 0;
var scoreText;

var timer;
var total;
var timeText;

var emitter;
var emitter2;
var emitter3;
var emitter4;

var letterText;
var wordList = ['GAMEDESIGN', 'HAVEFUN', 'EDUCATION'];

var word;
var scoreWord;

var introText;
var finalPoint;

var directions;
var leftButton;
var leftClick;
var rightButton;
var rightClick;
var jumpButton1;
var jumpButton2;
var jumpClick;


var playState = {
 
create: function () {
    
 
    //create background

    game.add.sprite(300,0, 'board');
 

    

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
    this.scale.setScreenSize( true );
},

update: function() {


}
  
};


