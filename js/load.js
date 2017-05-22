var loadingText;

var loadState = {
    
    init: function () {
        
        this.game.load.onFileComplete.add(fileComplete, this);
        
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
        this.game.scale.setScreenSize( true );
        
        loadingText = this.game.add.text(300,150, 'Loading...', { fill: '#ffffff', fontSize: '60px' });
        
        
        
        this.game.add.sprite(600,300,'ogre');

    },
    
    preload: function () {
        
        //menu and settings
        this.game.load.image('panel', 'assets/panel.png');
        this.game.load.image('startbutton', 'assets/startbutton.png');
        this.game.load.image('playagain', 'assets/playagainbutton.png');
        this.game.load.image('settings', 'assets/settingsbutton.png');
        this.game.load.image('settingspanel', 'assets/settingspanel.png');
        this.game.load.image('submit', 'assets/submitbutton.png');
        this.game.load.image('clear', 'assets/clearbutton.png');
        this.game.load.image('mainmenu', 'assets/mainmenu.png');
        this.game.load.image('deleteX', 'assets/deleteX.png');
        
        //Boarditems
        this.game.load.image('board', 'assets/boardgame.png');
        this.game.load.image('cloud', 'assets/cloud.png');
        this.game.load.image('moon', 'assets/moon.png');
        this.game.load.image('star', 'assets/star.png');
        this.game.load.image('rightBorder', 'assets/sideBoardRight.png');
        this.game.load.image('leftBorder', 'assets/sideBoardLeft.png');
        
        
        
        this.game.load.spritesheet('die', 'assets/dice.png', 79, 75);
        this.game.load.image('sheet', 'assets/characterFrame.png');
        this.game.load.image('sheetX', 'assets/characterFrameX.png');
        this.game.load.image('card', 'assets/cardCover.png');
        this.game.load.image('answersheet', 'assets/answersheet.png');
        this.game.load.image('outerSpace', 'assets/invisibleOuter.png');
        this.game.load.image('turnButton', 'assets/turnButton.png');
        this.game.load.image('aSpot', 'assets/aMarker.png');
        this.game.load.image('bSpot', 'assets/bMarker.png');
        this.game.load.image('correct', 'assets/correct.png');
        this.game.load.image('wrong', 'assets/wrong.png');
        this.game.load.image('reveal', 'assets/revealAnswer.png');
        this.game.load.image('monsterButton', 'assets/huntButton.png');
        this.game.load.image('treasureButton', 'assets/treasureButton.png');
        this.game.load.image('restButton', 'assets/restButton.png');
        this.game.load.image('stairsButton', 'assets/stairsButton.png');
        this.game.load.image('sleeping', 'assets/sleepingZs.png');
        this.game.load.image('caveButton', 'assets/caveButton.png');
        this.game.load.image('yesButton', 'assets/yesButton.png');
        this.game.load.image('noButton', 'assets/noButton.png');
        this.game.load.image('bubble', 'assets/bubble.png');
        this.game.load.image('doOverButton', 'assets/doOverButton.png');
        this.game.load.image('victoryButton', 'assets/victoryButton.png');
        this.game.load.image('defeatButton', 'assets/defeatButton.png');
        this.game.load.image('rpsButton', 'assets/rpsButton.png');
        this.game.load.image('blueDoorButton', 'assets/blueDoorButton.png');
        this.game.load.image('greenDoorButton', 'assets/greenDoorButton.png');
        this.game.load.image('redDoorButton', 'assets/redDoorButton.png');
        this.game.load.image('yellowDoorButton', 'assets/yellowDoorButton.png');
        this.game.load.image('skull', 'assets/skull.png');
        this.game.load.image('tokenSkull', 'assets/tokenSkull.png');
        this.game.load.image('zombieToken', 'assets/zombieToken.png');
        this.game.load.image('zombieHead', 'assets/zombieHead.png');
        this.game.load.image('monsterValue', 'assets/monsterAttackValueFrame.png');
        
        
        //Inventory
        this.game.load.image('ring', 'assets/ring.png');
        this.game.load.image('wand', 'assets/wand.png');
        this.game.load.image('boots', 'assets/boots.png');
        this.game.load.image('potion', 'assets/potion.png');
        this.game.load.image('sword', 'assets/sword.png');
        this.game.load.image('shield', 'assets/shield.png');
        this.game.load.image('coin', 'assets/coin.png');
        this.game.load.image('rockBlue', 'assets/rockBlue.png');
        this.game.load.image('rockGreen', 'assets/rockGreen.png');
        this.game.load.image('rockYellow', 'assets/rockYellow.png');
        this.game.load.image('rockRed', 'assets/rockRed.png');
        this.game.load.image('garbage', 'assets/garbageButton.png');
        this.game.load.image('take', 'assets/takeButton.png');
        this.game.load.image('lifeParticle', 'assets/lifeParticle.png');
        this.game.load.image('luckParticle', 'assets/luckParticle.png');
        this.game.load.image('strengthParticle', 'assets/strengthParticle.png');
        this.game.load.image('speedParticle', 'assets/speedParticle.png');
        this.game.load.image('goldParticle', 'assets/goldParticle.png');
        this.game.load.image('noMagicButton', 'assets/noMagic.png');
        this.game.load.image('useMagicButton', 'assets/useMagic.png');
        
        
        
        //Backgrounds
        this.game.load.image('sun', 'assets/sun.png');
        this.game.load.image('roadBackground', 'assets/roadBackground.png');
        this.game.load.image('villageBackground', 'assets/villageBackground.png');
        this.game.load.image('castleBackground', 'assets/castleBackground.png');
        this.game.load.image('witchBackground', 'assets/witchBackground.png');
        this.game.load.image('forestBackground', 'assets/forestBackground.png');
        this.game.load.image('caveBackground', 'assets/caveBackground.png');
        this.game.load.image('poolBackground', 'assets/poolBackground.png');
        this.game.load.image('antsBackground', 'assets/antsBackground.png');
        this.game.load.image('dragonBackground', 'assets/dragonBackground.png');
        this.game.load.image('stairsBackground', 'assets/stairsBackground.png');
        this.game.load.image('exitBackground', 'assets/exitBackground.png');
        this.game.load.image('roadBackgroundNight', 'assets/roadBackgroundNight.png');
        this.game.load.image('villageBackgroundNight', 'assets/villageBackgroundNight.png');
        this.game.load.image('castleBackgroundNight', 'assets/castleBackgroundNight.png');
        this.game.load.image('witchBackgroundNight', 'assets/witchBackgroundNight.png');
        this.game.load.image('forestBackgroundNight', 'assets/forestBackgroundNight.png');
        this.game.load.image('caveBackgroundNight', 'assets/caveBackgroundNight.png');
        this.game.load.image('innerBackground', 'assets/innerBackground.png');
        this.game.load.image('blizzard', 'assets/blizzard.png');
        this.game.load.image('earthquake', 'assets/earthquake.png');
        this.game.load.image('dragonAttack', 'assets/dragonAttack.png');
        this.game.load.image('storm', 'assets/storm.png');
        
        
        
        //NPC's
        this.game.load.image('dragon', 'assets/dragon.png');
        this.game.load.image('thief', 'assets/thief.png');
        this.game.load.image('zombie', 'assets/zombie.png');
        this.game.load.image('snake', 'assets/snake.png');
        this.game.load.image('troll', 'assets/troll.png');
        this.game.load.image('werewolf', 'assets/werewolf.png');
        this.game.load.image('ghost', 'assets/ghost.png');
        this.game.load.image('vampire', 'assets/vampire.png');
        this.game.load.image('spiderFront', 'assets/spiderFront.png');
        this.game.load.image('spider', 'assets/spiderSide.png');
        this.game.load.image('kraken', 'assets/poolMonster.png');
        this.game.load.image('fairy', 'assets/fairy.png');
        this.game.load.image('dragonRock', 'assets/dragonRock.png');
        this.game.load.image('dragonScissor', 'assets/dragonScissor.png');
        this.game.load.image('dragonPaper', 'assets/dragonPaper.png');
        this.game.load.image('ant', 'assets/antFight.png');
        this.game.load.image('watcher', 'assets/watcher.png');
        this.game.load.image('ropasci', 'assets/ropasci.png');
        this.game.load.image('miniWatcher', 'assets/miniWatcher.png');
        
        //Characters
        this.game.load.image('elf', 'assets/elf.png');
        this.game.load.image('hobbit', 'assets/hobbit.png');
        
        
        
        this.game.load.image('knight', 'assets/knight.png');
        this.game.load.image('warrior', 'assets/warrior.png');
        this.game.load.image('wizard', 'assets/wizard.png');
        this.game.load.image('token', 'assets/token.png');
        this.game.load.image('frog', 'assets/frog.png');
        this.game.load.image('questMarker', 'assets/questMarker.png');
        
        //TreasureChests
        this.game.load.image('treasureReally', 'assets/treasureReally.png');
        this.game.load.image('treasureClosed', 'assets/treasureClosed.png');
        this.game.load.image('treasureEmpty', 'assets/treasureEmpty.png');
        this.game.load.image('treasurePoison', 'assets/treasurePoison.png');
        this.game.load.image('treasureThief', 'assets/treasureThief.png');
        
        
        
    },
    
    create: function () {
        
        console.log("load create");
        
        
        
        var timerload = this.game.time.create(false);
    
        timerload.start();
        
    
        timerload.add(2000, startMenu, this);
        
        
        
        
        
        
    }
    
    
    
};


function  startMenu () {
        
        console.log("start function");
        
        this.game.state.start('menu');
        
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

	loadingText.setText("Loading " + progress + "%");

// 	var newImage = this.game.add.image(x, y, cacheKey);

// 	newImage.scale.set(0.3);

// 	x += newImage.width + 20;

// 	if (x > 700)
// 	{
// 		x = 32;
// 		y += 332;
// 	}

}