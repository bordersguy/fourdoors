var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'gamehere');



this.game.state.add('load', loadState);
this.game.state.add('menu', menuState);
this.game.state.add('play', playState);
this.game.state.add('win', menuState);
this.game.state.add('boot', bootState);

this.game.state.start('boot');
