var bootState = {
    
    preload: function () {
        
        game.load.image('ogre', 'assets/ogre.png');
        
    },
    
    create: function (){
        
           game.physics.startSystem(Phaser.Physics.ARCADE);
           
           game.add.sprite(0,0,'ogre');
           
           
           var loadingText = game.add.text(300,150, 'Enjoy!', { fill: '#ffffff', fontSize: '60px' });
           
           game.state.start('load');
           
          
        
    }
    
    
    
    
};