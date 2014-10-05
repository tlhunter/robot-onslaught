"use strict";

var Bullets = function(game) {
    this.game = game;

    this.bullets = [];
};

Bullets.prototype.SPEED = 600;

Bullets.prototype.preload = function() {
    this.game.load.spritesheet('bullet', 'images/bullet.png', 24, 24);
};

Bullets.prototype.create = function() {

};

Bullets.prototype.update = function() {
    for (var i = 0; i < this.bullets.length; i++) {
        this.game.physics.arcade.collide(this.bullets[i].entity, player.entity, this.shotHandler);
        this.game.physics.arcade.collide(this.bullets[i].entity, world.middleground, this.collisionHandler);
        this.game.physics.arcade.collide(this.bullets[i].entity, world.hostileground, this.enemyHitHandler);
    }
};

Bullets.prototype.collisionHandler = function(bullet, collide) {
    console.log('bullet destroy');
    bullet.kill();
    // TODO: remove from array
};

Bullets.prototype.shotHandler = function (bullet, player_body) {
    console.log("I've been hit!");

    bullet.kill();

    player.hurt();
};

Bullets.prototype.enemyHitHandler = function(bullet, enemy_body) {
    console.log('enemy hit');
    world.sounds.damage.play();

    bullet.kill();

    return false;
};

Bullets.prototype.add = function(bullet) {
    bullet.entity = this.game.add.sprite(bullet.x, bullet.y, 'bullet');
    this.game.physics.enable(bullet.entity, Phaser.Physics.ARCADE);

    switch (bullet.dir) {
        case 0:
            bullet.entity.animations.add('north', [0, 1], 8, true);
            bullet.entity.animations.play('north');
            bullet.entity.body.setSize(6, 10, 9, 18);
            bullet.entity.body.velocity.y = -this.SPEED;
            bullet.entity.body.checkCollision.up = true;
            bullet.entity.body.checkCollision.down = false;
            bullet.entity.body.checkCollision.right = false;
            bullet.entity.body.checkCollision.left = false;
            break;

        case 1:
            bullet.entity.animations.add('east', [2, 3], 8, true);
            bullet.entity.animations.play('east');
            bullet.entity.body.setSize(10, 6, 14, 27);
            bullet.entity.body.velocity.x = this.SPEED;
            bullet.entity.body.checkCollision.up = false;
            bullet.entity.body.checkCollision.down = false;
            bullet.entity.body.checkCollision.right = true;
            bullet.entity.body.checkCollision.left = false;
            break;

        case 2:
            bullet.entity.animations.add('south', [4, 5], 8, true);
            bullet.entity.animations.play('south');
            bullet.entity.body.setSize(6, 10, 9, 38);
            bullet.entity.body.velocity.y = this.SPEED;
            bullet.entity.body.checkCollision.up = false;
            bullet.entity.body.checkCollision.down = true;
            bullet.entity.body.checkCollision.right = false;
            bullet.entity.body.checkCollision.left = false;
            break;

        case 3:
            bullet.entity.animations.add('west', [6, 7], 8, true);
            bullet.entity.animations.play('west');
            bullet.entity.body.setSize(10, 6, 0, 27);
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