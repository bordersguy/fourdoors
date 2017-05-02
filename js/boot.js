var bootState = {
    
    init: function() {
        
        
        
    },
    
    preload: function () {
        
        // this.game.load.image('ogre', 'assets/ogre.png');
        
        // this.game.add.sprite(0,0,'ogre');
           
           
        var loadingText = this.game.add.text(300,150, 'Just will be a few seconds ^^', { fill: '#ffffff', fontSize: '60px' });
        
        this.game.load.image('ogre', 'assets/ogre.png');
        
        
    },
    
    create: function (){
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
       
        this.game.state.add('load', loadState);
        this.game.state.add('menu', menuState);
        this.game.state.add('play', playState);
        this.game.state.add('win', menuState);
       
        this.game.state.start('load');
       
          
        
    }
    
    
    
    
};

