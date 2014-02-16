Play = function(game) {
    this.game = game;
    this.level = null;
    this.player = null;
    this.hud = null;
};

Play.prototype = {
    preload: function() {
        this.level = new Level(game);
        this.level.preload();
        this.player = new Player(game);
        this.player.preload();
        this.hud = new HUD(game);
    },


    create: function() {
        this.level.create();
        this.player.create();
        this.hud.create();
    },

    update: function() {
        this.level.update();
        this.player.update();
        //check for collision
        this.game.physics.overlap(this.player.sprite, this.level.pipes, this.setGameOver, null, this);
        this.game.physics.overlap(this.player.sprite, this.level.scoreObj, this.addScore, null, this);
        if (this.player.hitGround()) {
            this.setGameOver();
        }
    },

    setGameOver: function() {
        this.player.gameOver();
        this.level.gameOver();
        this.game.state.start('gameover');
    },

    addScore: function(player, scoreObj) {
        this.level.updateScore(scoreObj);
        this.hud.updateScore();
    }
};
