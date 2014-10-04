"use strict";

var HUD = function(game) {
    this.game = game;
    this.text = {};
    this.hud = null;
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

};

HUD.prototype.create = function() {
    this.hud = this.game.add.group();
    this.hud.enableBody = false;
    this.hud.fixedToCamera = true;

    this.text.score = this.game.add.text(40, 8, 'POINTS: 0', this.FONT);
    this.text.health = this.game.add.text(40, 32, 'HEALTH: 5/5', this.FONT);
    this.text.debug = this.game.add.text(40, 56, '', this.FONT_SMALL);

    this.hud.add(this.text.score);
    this.hud.add(this.text.health);
    this.hud.add(this.text.debug);
};

HUD.prototype.update = function() {
    var text = "";

    var pos = player.getCoordinate(false);

    text += "POS: " + pos.x + "," + pos.y + "\n";
    text += "FPS: " + this.game.time.fps + "/60";

    this.text.debug.text = text;
    this.text.health.text = "HEALTH: " + player.health + "/5";
};