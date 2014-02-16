Level = function(game) {
    this.game = game;
    this.bgtile = null;
    this.pipes = null;
    this.pipeTimer = null;
    this.scoreObj = null;
};

Level.prototype = {
    preload: function() {
        this.game.load.image('bg', 'assets/bg.png');
        this.game.load.image('pipe', 'assets/pipe_sml.png');
    },
    create: function() {
        this.bgtile = this.game.add.sprite(0, 0, 'bg');
        this.pipes = this.game.add.group();
        this.scoreObj = this.game.add.group();
        this.pipeTimer = game.time.create(game);
        this.pipeTimer.loop(1500, this.spawnPipes, this);
        this.start();
    },
    start: function() {
        this.pipeTimer.start();
    },
    update: function() {
        //scroll background
        //this.bgtile.tilePosition.x -= 1;
        // Remove offscreen pipes
        this.pipes.forEachAlive(function(pipe) {
            if (pipe.x + pipe.width < this.game.world.bounds.left) {
                pipe.kill();
            }
        });
        this.scoreObj.forEachAlive(function(obj) {
            if (obj.x + obj.width < this.game.world.bounds.left) {
                obj.kill();
            }
        });
    },
    updateScore: function(obj) {
        this.scoreObj.remove(obj);
    },
    gameOver: function() {
        // Stop all pipes
        this.pipes.forEachAlive(function(pipe) {
            pipe.body.velocity.x = 0;
        });
        this.scoreObj.forEachAlive(function(obj) {
            obj.body.velocity.x = 0;
        });
        // Stop spawning pipes
        this.pipeTimer.stop();
        // Stop scrolling bg
        //this.bgtile.tilePosition.x = 0;
    },
    spawnPipe: function(pipeY, flipped) {
        var pipe = this.pipes.create(
            this.game.width,
            pipeY + (flipped ? -this.o() : this.o()) / 2,
            'pipe'
        );
        pipe.body.allowGravity = false;

        // Flip pipe
        pipe.scale.setTo(1, flipped ? -1 : 1);
        pipe.body.offset.y = flipped ? -pipe.body.height * 2 : 0;

        // Move to the left
        pipe.body.velocity.x = -SPEED;

        return pipe;
    },
    spawnPipes: function() {
        var pipeY = ((this.game.height - 16 - this.o() / 2) / 2) + (Math.random() > 0.5 ? -1 : 1) * Math.random() * this.game.height / 6;
        // Bottom pipe
        var botpipe = this.spawnPipe(pipeY);
        // Top pipe (flipped)
        var toppipe = this.spawnPipe(pipeY, true);
        // Invisible object for score keeping
        var obj = this.scoreObj.create(toppipe.x + toppipe.width, 0);
        obj.width = 2;
        obj.height = this.game.world.height;
        obj.body.allowGravity = false;
        obj.body.velocity.x = -SPEED;
    },
    o: function() {
        return OPENING + 60;
    }
};
