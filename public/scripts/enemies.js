"use strict";

var Enemies = function(game) {
    this.game = game;

    this.enemies = {};
};

Enemies.prototype.EXPIRE = 5000;

Enemies.prototype.preload = function() {

};

Enemies.prototype.create = function() {

};

Enemies.prototype.update = function() {
    var enemy_ids = Object.keys(this.enemies);
    var now = Date.now();

    for (var i = 0; i < enemy_ids.length; i++) {
        var enemy_id = enemy_ids[i];
        var enemy = this.enemies[enemy_id];
        if (enemy.last_seen < now - this.EXPIRE) {
            enemy.entity.kill();
            delete this.enemies[enemy_id];
            console.log('EXPIRE', enemy_id);
        }
    }
};

Enemies.prototype.add = function(enemy) {
    enemy.last_seen = Date.now();

    if (this.enemies[enemy.client]) {
        this.enemies[enemy.client].entity.x = enemy.x;
        this.enemies[enemy.client].entity.y = enemy.y;
        this.enemies[enemy.client].entity.animations.play('alive');
        return;
    }

    this.enemies[enemy.client] = enemy;
    this.enemies[enemy.client].entity = this.game.add.sprite(enemy.x - 16, enemy.y - 48, 'avatar');

    var entity = this.enemies[enemy.client].entity;

    this.game.physics.arcade.enable(entity);

    entity.immovable = true;
    entity.body.immovable = true;

    entity.animations.add('alive', [0, 1, 0, 2], 2, true);
    entity.animations.add('dead', [3], 1000, false);

    entity.animations.play('alive');

    world.hostileground.add(entity);
};

Enemies.prototype.kill = function(enemy) {
    if (!this.enemies[enemy.client]) {
        return;
    }

    enemy.last_seen = Date.now();
    this.enemies[enemy.client].last_seen = enemy.last_seen;

    this.enemies[enemy.client].entity.animations.play('dead');
    // TODO: Delete after period of time
};

Enemies.prototype.move = function(enemy) {
    enemy.last_seen = Date.now();

    if (!this.enemies[enemy.client]) {
        this.add(enemy);
    }

    var entity = this.enemies[enemy.client].entity;
    this.enemies[enemy.client].last_seen = enemy.last_seen;

    entity.x = enemy.x - 16;
    entity.y = enemy.y - 48;
    //entity.z = -1 * Math.floor(enemy.y - 48);
};

Enemies.prototype.heartbeat = function(data) {
    this.move(data);
};