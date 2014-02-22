HUD = function(game) {
    this.game = game;
    this.score = 0;
    this.scoreText = null;
    this.gameOverText = null;
};

HUD.prototype = {
    create: function() {
        localStorage.score = 0;
        this.scoreText = this.game.add.text(
            this.game.world.width/2,
            this.game.world.height/8,
            '0',
            {
                font: '26px "Lucida Console"',
                fill: '#fff',
                stroke: '#430',
                strokeThickness: 4,
                align: 'center'
            }
        );
        this.scoreText.anchor.setTo(0.5,0.5);
    },
    updateScore: function() {
        this.score += 1;
        this.scoreText.content = this.score;
        if(typeof(Storage)!=="undefined") {
            localStorage.score = this.score;
            if (localStorage.highScore) {
                if (localStorage.score > localStorage.highScore) {
                    localStorage.highScore = localStorage.score;
                }
            }
            else {
                localStorage.highScore = localStorage.score;
            }
        }
        //else no local storage support
    },
};
