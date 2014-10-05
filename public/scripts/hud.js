"use strict";

var HUD = function(game) {
    this.game = game;
    this.text = {};
    this.hud = null;
    this.hearts = [];
};

HUD.prototype.FONT = {
    fill: '#ffffff',
    font: '16px "Press Start 2P"',
    stroke: '#000000',
    strokeThickness: 4
};

HUD.prototype.FONT_SMALL = {
    fill: '#ffffff',
    font: '8px "Press Start 2P"',
    stroke: '#000000',
    strokeThickness: 2
};

HUD.prototype.preload = function() {
    this.game.load.spritesheet('heart', 'images/heart.png', 24, 24);
};

HUD.prototype.create = function() {
    this.hud = this.game.add.group();
    this.hud.enableBody = false;
    this.hud.fixedToCamera = true;

    var heart;
    for (var i = 0; i < 5; i++) {
        // backgrounds
        heart = this.game.add.sprite(8 + 28 * i, 8, 'heart', 1);
        this.hud.add(heart);

        // red hearts
        heart = this.game.add.sprite(8 + 28 * i, 8, 'heart', 0);
        this.hearts.push(heart);
        this.hud.add(heart);
    }

    this.text.debug = this.game.add.text(8, 40, '', this.FONT_SMALL);

    this.hud.add(this.text.debug);
};

HUD.prototype.update = function() {
    var text = "";

    var pos = player.getCoordinate(false);

    text += "POS: " + pos.x + "," + pos.y + "\n";
    text += "FPS: " + this.game.time.fps + "/60";

    this.text.debug.text = text;

    for (var i = 0; i < 5; i++) {
        if (i > player.health - 1) {
            this.hearts[i].exists = false;
        } else {
            this.hearts[i].exists = true;
        }
    }
};