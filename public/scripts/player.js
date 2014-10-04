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

    if (this.goNorth()) {
        this.entity.body.velocity.y = -300;
    }

    if (this.goSouth()) {
        this.entity.body.velocity.y = 300;
    }

    if (this.goWest()) {
        this.entity.body.velocity.x = -300;
    }

    if (this.goEast()) {
        this.entity.body.velocity.x = 300;
    }

    if (this.isFiring()) {
        var time = Date.now();

        if (this.last_shoot < Date.now() - this.SHOOT_DELAY) {
            world.sounds.shoot.play();
            this.last_shoot = time;
        }
    }

    this.game.camera.follow(this.entity);
};

Player.prototype.goNorth = function() {
    return this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.W);
};

Player.prototype.goSouth = function() {
    return this.keyboard.isDown(Phaser.Keyboard.DOWN) || this.keyboard.isDown(Phaser.Keyboard.S);
};

Player.prototype.goWest = function() {
    return this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.A);
};

Player.prototype.goEast = function() {
    return this.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.keyboard.isDown(Phaser.Keyboard.D);
};

Player.prototype.isFiring = function() {
    return this.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
};