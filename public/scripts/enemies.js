"use strict";

var Enemies = function(game) {
    this.game = game;

    this.enemies = {};
};

Enemies.prototype.preload = function() {

};

Enemies.prototype.create = function() {

};

Enemies.prototype.update = function() {

};

Enemies.prototype.add = function(enemy) {
    if (this.enemies[enemy.client]) {
        return;
    }

    this.enemies[enemy.client] = enemy;
    this.enemies[enemy.client].entity = this.game.add.sprite(enemy.x - 16, enemy.y - 48, 'avatar');

    var entity = this.enemies[enemy.client].entity;

    entity.animations.add('alive', [0, 1, 0, 2], 2, true);
    entity.animations.add('dead', [3], 1000, false);

    entity.animations.play('alive');

    world.hostileground.add(entity);
};

Enemies.prototype.kill = function(enemy) {
    if (!this.enemies[enemy.client]) {
        return;
    }

    this.enemies[enemy.client].entity.animations.play('dead');
    // TODO: Delete after period of time
};

Enemies.prototype.move = function(enemy) {
    if (!this.enemies[enemy.client]) {
        this.add(enemy);
    }

    var entity = this.enemies[enemy.client].entity;

    entity.x = enemy.x - 16;
    entity.y = enemy.y - 48;
    //entity.z = -1 * Math.floor(enemy.y - 48);
};