var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'gamehere');




this.game.state.add('boot', bootState);

this.game.state.start('boot');
