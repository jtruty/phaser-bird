Menu = function(game){
    this.game = game;
    this.startkey = null;
    this.menuText = null;
};
Menu.prototype = {
    preload : function() {
        this.game.load.image('bg','assets/bg.png');
    },
    create : function() {
        this.game.add.sprite(0,0,'bg');
        this.menuText = this.game.add.text(
            this.game.world.width/2,
            this.game.world.height/2,
            "click or tap to flap",
            {
                font: '32px "Lucida Console"',
                fill: '#fff',
                stroke: '#430',
                strokeThickness: 4,
                align: 'center'
            }
        );
        this.menuText.anchor.setTo(0.5,0.5);
        this.game.input.onTap.add(this.transition, this);
    },
    transition : function() {
        this.game.state.start('play');
    }
};
