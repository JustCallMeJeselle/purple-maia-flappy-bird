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
        game.load.image('pipe', 'assets/images/pipe.png');
        
        game.load.audio('jump', 'assets/audio/jump.m4a')
    },

    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.pipes = game.add.group();
        
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
        
        this.bird = game.add.sprite(100, 245,'bird');
        
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        
        this.bird.anchor.setTo(-0.2, 0.5);
        
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        game.input.onDown.add(this.jump, this);
        
        this.score = 0;
        this.labelScore = game.add.text(20,20, "0");
        
        
        this.jumpSound = game.add.audio('jump');
        this.jumpSound.volume = 0.2;
    },

    update: function() {
        if (this.bird.y < 0 || this.bird.y > game. world.height) {
            this.restartGame();
        }
        
    game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);    
        
        if(this.bird.angle < 20) {
            this.bird.angle +=1;    
        }
        
    },
    
    jump: function() {
        if (this.bird.alive == false) {
            return;
        }
        this.bird.body.velocity.y = -350;
        
        game.add.tween(this.bird).to({angle: -20}, 100).start();
        
        this.jumpSound.play();
    },
    
    hitPipe: function() {
        if(this.bird.alive == false) {
            return;
        }
        this.bird.alive = false;
        
        game.time.events.remove(this.timer);
        
        this.pipes.forEach(function(p) {
            p.body.velocity.x = 0;
        } , this);
    },
    
    restartGame: function() {
        game.state.start('menu');
    },
    
    addPipe: function(x,y) {
        var pipe =game.add.sprite(x,y, 'pipe');
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);
        
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    addRowOfPipes: function() {
        var hole = Math.floor(Math.random()*5)+1;
        
        for(var i = 0; i <10; i++){
            if ( i != hole&& i != hole+1) {
                this.addPipe(400, i*65);
            }
        }
        this.score += 1;
        this.labelScore.text = this.score;
    }

     
};
