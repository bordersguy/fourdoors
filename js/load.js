var loadState = {
    
    preload: function () {
        
        //menu and settings
        game.load.image('panel', 'assets/panel.png');
        game.load.image('startbutton', 'assets/startbutton.png');
        game.load.image('playagain', 'assets/playagainbutton.png');
        game.load.image('settings', 'assets/settingsbutton.png');
        game.load.image('settingspanel', 'assets/settingspanel.png');
        game.load.image('submit', 'assets/submitbutton.png');
        game.load.image('clear', 'assets/clearbutton.png');
        game.load.image('mainmenu', 'assets/mainmenu.png');
        game.load.image('deleteX', 'assets/deleteX.png');
        
        //Boarditems
        game.load.image('board', 'assets/boardgame.png');
        game.load.spritesheet('die', 'assets/dice.png', 79, 75);
        game.load.image('sheet', 'assets/characterFrame.png');
        game.load.image('sheetX', 'assets/characterFrameX.png');
        game.load.image('card', 'assets/cardCover.png');
        game.load.image('answersheet', 'assets/answersheet.png');
        game.load.image('outerSpace', 'assets/invisibleOuter.png');
        game.load.image('turnButton', 'assets/turnButton.png');
        game.load.image('aSpot', 'assets/aMarker.png');
        game.load.image('bSpot', 'assets/bMarker.png');
        game.load.image('correct', 'assets/correct.png');
        game.load.image('wrong', 'assets/wrong.png');
        game.load.image('reveal', 'assets/revealAnswer.png');
        //Characters
        game.load.image('elf', 'assets/elf.png');
        game.load.image('hobbit', 'assets/hobbit.png');
        game.load.image('ogre', 'assets/ogre.png');
        game.load.image('knight', 'assets/knight.png');
        game.load.image('warrior', 'assets/warrior.png');
        game.load.image('wizard', 'assets/wizard.png');
        game.load.image('token', 'assets/token.png');
    },
    
    create: function () {
        
        game.add.sprite(600,300,'ogre');
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
        game.scale.setScreenSize( true )
        
        var loadingText = game.add.text(300,150, 'Loading...', { fill: '#ffffff', fontSize: '60px' });
        
        var timerload = game.time.create(false);
    
        timerload.start();
        
    
        timerload.add(2000, startMenu, this);
        
       
     //   game.state.start('menu');
        
        
        
        
    }
    
    
    
};


function  startMenu () {
        
        game.state.start('menu');
        
}