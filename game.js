var game = new Phaser.Game(900, 600, Phaser.AUTO, '');
game.state.add('menu', Menu);
game.state.add('play', Play);
game.state.add('gameover',GameOver);
game.state.start('menu');

var GRAVITY = 1000;
var SPEED = 300;
var OPENING = 144;
