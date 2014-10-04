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

    // Map Data
    this.game.load.tilemap('background', 'data/level_0_0-background.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('middleground', 'data/level_0_0-middleground.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('foreground', 'data/level_0_0-foreground.csv', null, Phaser.Tilemap.CSV);

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

    this.buildMap();

    this.background.create(50 * this.BLOCK.w, 49 * this.BLOCK.h, 'terrain', 6);
    this.middleground.create(50 * this.BLOCK.w, 48 * this.BLOCK.h, 'terrain', 42);
    this.foreground.create(50 * this.BLOCK.w, 47 * this.BLOCK.h, 'terrain', 30);

    this.middleground.setAll('body.immovable', true);
};

World.prototype.update = function() {
    this.game.physics.arcade.collide(player.entity, this.middleground);
    //this.game.physics.arcade.collide(pickups.entities, this.foreground);
};

World.prototype.parseRawTilesheets = function() {
    var raw = {};
    var i;

    raw.background = this.game.cache.getTilemapData('background').data.split('\n');
    for (i = 0; i < raw.background.length; i++) {
        raw.background[i] = raw.background[i].split(',');
    }

    delete raw.background[100];

    raw.middleground = this.game.cache.getTilemapData('middleground').data.split('\n');
    for (i = 0; i < raw.middleground.length; i++) {
        raw.middleground[i] = raw.middleground[i].split(',');
    }

    delete raw.middleground[100];

    raw.foreground = this.game.cache.getTilemapData('foreground').data.split('\n');
    for (i = 0; i < raw.foreground.length; i++) {
        raw.foreground[i] = raw.foreground[i].split(',');
    }

    delete raw.foreground[100];

    return raw;
};

/**
 * This is a heavy process, so optimize the heck out of it
 */
World.prototype.buildMap = function() {
    var raw_layers = this.parseRawTilesheets(),
        bgl = raw_layers.background,
        mgl = raw_layers.middleground,
        fgl = raw_layers.foreground,
        bg, mg, fg, xpos, ypos,
        w = this.BLOCK.w,
        h = this.BLOCK.h;

    for (var y = 0; y < 100; y++) {
        for (var x = 0; x < 100; x++) {
            xpos = x * w;
            ypos = y * h;
            bg = parseInt(bgl[x][y], 10);
            if (bg >= 0) {
                this.background.create(xpos, ypos, 'terrain', bg);
            }

            mg = parseInt(mgl[x][y], 10);
            if (mg >= 0) {
                this.middleground.create(xpos, ypos, 'terrain', mg);
            }

            fg = parseInt(fgl[x][y], 10);
            if (fg >= 0) {
                this.foreground.create(xpos, ypos, 'terrain', fg);
            }
        }
    }
};