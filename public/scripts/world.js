var World = function(game) {
    this.game = game;
};

World.prototype.preload = function() {
    this.game.stage.backgroundColor = '#1f1d2c';

    game.load.audio('background', 'audio/background.mp3');
};

World.prototype.create = function() {
    this.music = game.add.audio('background', 1, true);

    //this.music.play('', 0, 0.1, true);
};

World.prototype.update = function() {

};