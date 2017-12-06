/* global game, Phaser, playState, menuState, mainMenuState */

var playState = {

    preload: function() { 
        if (!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.setMinMax(game.width/2, game.height/2, game.width, game.height);
        }
        
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        game.stage.backgroundColor = '#8185d5';
        
        game.load.image('bird', 'assets/images/banana.png');
    },

    create: function() { 
        
    },

    update: function() {
        
    }
};
