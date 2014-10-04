"use strict";

var Player = function(game) {
    this.game = game;

    this.entity = null;
    this.health = 5;

    this.keyboard = null;

    this.SHOOT_DELAY = 350;
    this.last_shoot = 0;
};

Player.prototype.preload = function() {
    this.game.load.spritesheet('avatar', 'images/avatar.png', 64, 64);

    this.keyboard = this.game.input.keyboard;
};

Player.prototype.create = function() {
    this.entity = this.game.add.sprite(world.BLOCK.w * 50, world.BLOCK.h * 50, 'avatar');
    this.game.physics.arcade.enable(this.entity);
    this.entity.body.collideWorldBounds = true;
    this.entity.linearDamping = 0.1;

    this.entity.animations.add('alive', [0, 1, 0, 2], 2, true);
    this.entity.animations.add('dead', [3], 1000, false);

    this.entity.animations.play('alive');
};

Player.prototype.update = function() {
    this.entity.body.velocity.x = this.entity.body.velocity.y = 0;
    var moving = false;

    if (this.goNorth()) {
        this.entity.body.velocity.y -= 200;
        moving = true;
    }

    if (this.goSouth()) {
        this.entity.body.velocity.y += 200;
        moving = true;
    }

    if (this.goWest()) {
        this.entity.body.velocity.x -= 200;
        moving = true;
    }

    if (this.goEast()) {
        this.entity.body.velocity.x += 200;
        moving = true;
    }

    if (this.isFiring()) {
        var time = Date.now();

        if (this.last_shoot < Date.now() - this.SHOOT_DELAY) {
            world.sounds.shoot.play();
            this.last_shoot = time;
        }
    }

    // Phaser seems incapable of snapping to full pixels :'(
    if (!moving) {
        this.entity.body.x = Math.round(this.entity.body.x);
        this.entity.body.y = Math.round(this.entity.body.y);
    }

    this.game.camera.follow(this.entity);
};

Player.prototype.getCoordinate = function(accurate) {
    if (accurate) {
        return {
            x: this.entity.body.x / world.BLOCK.w,
            y: this.entity.body.y / world.BLOCK.h
        }
    } else {
        return {
            x: Math.floor(this.entity.body.x / world.BLOCK.w),
            y: Math.floor(this.entity.body.y / world.BLOCK.h)
        }
    }
};

Player.prototype.goNorth = function() {
    return this.keyboard.isDown(Phaser.Keyboard.W);
};

Player.prototype.goSouth = function() {
    return this.keyboard.isDown(Phaser.Keyboard.S);
};

Player.prototype.goWest = function() {
    return this.keyboard.isDown(Phaser.Keyboard.A);
};

Player.prototype.goEast = function() {
    return this.keyboard.isDown(Phaser.Keyboard.D);
};

Player.prototype.aimNorth = function() {
    return this.keyboard.isDown(Phaser.Keyboard.UP);
};

Player.prototype.aimSouth = function() {
    return this.keyboard.isDown(Phaser.Keyboard.DOWN);
};

Player.prototype.aimWest = function() {
    return this.keyboard.isDown(Phaser.Keyboard.LEFT);
};

Player.prototype.aimEast = function() {
    return this.keyboard.isDown(Phaser.Keyboard.RIGHT);
};

Player.prototype.isFiring = function() {
    return this.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
};