Player = function(game) {
	this.game = game;
	this.sprite = null;
	this.flapkey = null;
    this.flapTween = null;
    this.rotateTween = null;
};

Player.prototype = {
    preload: function() {
        this.game.load.spritesheet('bird', 'assets/clumsy.png', 85, 60);
    },
    create: function() {
            // The player and its settings
        this.sprite = game.add.sprite(128, game.world.height - 200, 'bird');

        //  this.sprite physics properties
        this.sprite.body.bounce.y = 0;
        this.sprite.body.gravity.y = GRAVITY;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor.setTo(0.5,0.5);
        //this.sprite.scale.setTo(0.5,0.5);
        this.sprite.animations.add('right', [0,1,2], 10, true);

        this.game.input.onTap.add(this.flap, this);

    },
    update: function() {

    },
    flap: function() {
        this.sprite.angle = -15;
        if (this.flapTween != null) {
            this.flapTween.stop();
        }
        if (this.rotateTween != null) {
            this.rotateTween.stop();
        }
        this.sprite.body.velocity.y = -280;
        this.sprite.animations.play('right');
        this.flapTween = this.game.add.tween(this.sprite).to({y: this.sprite.body.y-10}, 100, Phaser.Easing.Exponential.InOut, true, 0, false);
        this.rotateTween = this.game.add.tween(this.sprite).to({angle: 60}, 1000, Phaser.Easing.Exponential.InOut, true, 0, false);
    },
    hitGround: function() {
        return this.sprite.body.bottom >= this.game.world.bounds.bottom;
    },
    gameOver: function() {
        this.sprite.body.velocity.y = 0;
        this.sprite.body.gravity.y = 0; //stop player
        this.sprite.animations.stop();
    }

};
