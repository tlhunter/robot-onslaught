"use strict";

var World = function(game) {
    this.game = game;

    this.music = null;
    this.sounds = {};

    this.foreground = null;
    this.middleground = null;
    this.background = null;
};

World.prototype.BLOCK = {
    w: 64,
    h: 64
};

World.prototype.preload = function() {
    this.game.stage.backgroundColor = '#1f1d2c';

    // Terrain Spritesheet
    this.game.load.spritesheet('terrain', 'images/terrain.png', this.BLOCK.w, this.BLOCK.h);

    // Background Music
    this.game.load.audio('music', 'audio/background.mp3');

    // Sound Effects
    this.game.load.audio('damage', 'audio/damage.wav');
    this.game.load.audio('death', 'audio/death.wav');
    this.game.load.audio('pickup', 'audio/pickup.wav');
    this.game.load.audio('shoot', 'audio/shoot.wav');
    this.game.load.audio('spawn', 'audio/spawn.wav');

    // Game Settings
    this.game.world.setBounds(0, 0, 100 * this.BLOCK.w, 100 * this.BLOCK.h);
    this.game.renderer.roundPixels = true;
    this.game.time.advancedTiming = true;
};

World.prototype.create = function() {
    this.music = game.add.audio('music', 1, true);

    this.sounds = {
        damage: this.game.add.audio('damage'),
        death: this.game.add.audio('death'),
        pickup: this.game.add.audio('pickup'),
        shoot: this.game.add.audio('shoot'),
        spawn: this.game.add.audio('spawn')
    };

    this.music.play('', 0, 0.1, true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.background = this.game.add.group();
    this.background.enableBody = false;

    this.middleground = this.game.add.group();
    this.middleground.enableBody = true;

    this.foreground = this.game.add.group();
    this.foreground.enableBody = false;

    this.background.create(50 * this.BLOCK.w, 50 * this.BLOCK.h, 'terrain', 20);
    this.background.create(50 * this.BLOCK.w, 49 * this.BLOCK.h, 'terrain', 6);
    this.background.create(50 * this.BLOCK.w, 48 * this.BLOCK.h, 'terrain', 42);
    this.foreground.create(50 * this.BLOCK.w, 47 * this.BLOCK.h, 'terrain', 30);
};

World.prototype.update = function() {
    //this.game.physics.arcade.collide(player.entity, this.foreground);
    //this.game.physics.arcade.collide(pickups.entities, this.foreground);
};

/**
 * Draws the floor surfaces
 */
World.prototype.drawBackground = function() {

};

/**
 * Draws the collidable items, such as boxes
 */
World.prototype.drawMiddleground = function() {

};

/**
 * Draws the items which can occlude the players, such as box tops
 */
World.prototype.drawForeground = function() {

};