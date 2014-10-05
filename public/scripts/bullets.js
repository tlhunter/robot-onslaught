"use strict";

var Bullets = function(game) {
    this.game = game;

    this.bullets = [];
};

Bullets.prototype.SPEED = 300;

Bullets.prototype.preload = function() {
    this.game.load.spritesheet('bullet', 'images/bullet.png', 24, 24);
};

Bullets.prototype.create = function() {

};

Bullets.prototype.update = function() {
    for (var i = 0; i < this.bullets.length; i++) {
        this.game.physics.arcade.collide(this.bullets[i].entity, this.middleground, this.collisionHandler);
        this.game.physics.arcade.collide(this.bullets[i].entity, player.entity, this.shotHandler);
    }
};

Bullets.prototype.collisionHandler = function(bullet, collide) {
    console.log('bullet destroy');
    bullet.body.destroy();
    // TODO: remove from array
};

Bullets.prototype.shotHandler = function (bullet, player_body) {
    console.log("I've been hit!");

    bullet.destroy();

    player.hurt();
};

Bullets.prototype.add = function(bullet) {
    bullet.entity = this.game.add.sprite(bullet.x, bullet.y, 'bullet');
    this.game.physics.enable(bullet.entity, Phaser.Physics.ARCADE);

    switch (bullet.dir) {
        case 0:
            bullet.entity.animations.add('north', [0, 1], 8, true);
            bullet.entity.animations.play('north');
            bullet.entity.body.setSize(6, 10, 9, 0);
            bullet.entity.body.velocity.y = -this.SPEED;
            bullet.entity.body.checkCollision.up = true;
            bullet.entity.body.checkCollision.down = false;
            bullet.entity.body.checkCollision.right = false;
            bullet.entity.body.checkCollision.left = false;
            break;

        case 1:
            bullet.entity.animations.add('east', [2, 3], 8, true);
            bullet.entity.animations.play('east');
            bullet.entity.body.setSize(10, 6, 14, 9);
            bullet.entity.body.velocity.x = this.SPEED;
            bullet.entity.body.checkCollision.up = false;
            bullet.entity.body.checkCollision.down = false;
            bullet.entity.body.checkCollision.right = true;
            bullet.entity.body.checkCollision.left = false;
            break;

        case 2:
            bullet.entity.animations.add('south', [4, 5], 8, true);
            bullet.entity.animations.play('south');
            bullet.entity.body.setSize(6, 10, 9, 18);
            bullet.entity.body.velocity.y = this.SPEED;
            bullet.entity.body.checkCollision.up = false;
            bullet.entity.body.checkCollision.down = true;
            bullet.entity.body.checkCollision.right = false;
            bullet.entity.body.checkCollision.left = false;
            break;

        case 3:
            bullet.entity.animations.add('west', [6, 7], 8, true);
            bullet.entity.animations.play('west');
            bullet.entity.body.setSize(10, 6, 0, 9);
            bullet.entity.body.velocity.x = -this.SPEED;
            bullet.entity.body.checkCollision.up = false;
            bullet.entity.body.checkCollision.down = false;
            bullet.entity.body.checkCollision.right = false;
            bullet.entity.body.checkCollision.left = true;
            break;

        default:
            console.log('INVALID BULLET', bullet);
            return;
    }

    world.middleground.add(bullet.entity);

    this.bullets.push(bullet);
};

Bullets.prototype.destroy = function(enemy) {
    if (!this.enemies[enemy.client]) {
        return;
    }

    this.enemies[enemy.client].entity.animations.play('dead');
    // TODO: Delete after period of time
};

Bullets.prototype.move = function(enemy) {
    if (!this.enemies[enemy.client]) {
        this.add(enemy);
    }

    var entity = this.enemies[enemy.client].entity;

    entity.x = enemy.x - 16;
    entity.y = enemy.y - 48;
    //entity.z = -1 * Math.floor(enemy.y - 48);
};