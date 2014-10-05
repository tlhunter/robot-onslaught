"use strict";

var world, player, hud, pickups, enemies, bullets, game;

var client_id;
var pubnub;
var channel;

$(function() {
    progressJs().setOptions({
        overlayMode: true,
        theme: 'onslaught'
    }).start();

    $.get('config/pubnub.json', function (data) {
        client_id = PUBNUB.uuid();
        channel = data.channel;

        pubnub = PUBNUB.init({
            publish_key: data.publish,
            subscribe_key: data.subscribe,
            ssl: true
        });

        pubnub.subscribe({
            channel: channel,

            message: function(data) {
                if (data.client === client_id || game.load.progress < 100) {
                    return;
                }

                console.log(data);

                if (data.type === 'spawn') {
                    world.sounds.spawn.play();
                    enemies.add(data);
                } else if (data.type === 'shoot') {
                    world.sounds.shoot.play();
                    bullets.add(data);
                    // TODO: bullet magic
                } else if (data.type === 'death') {
                    world.sounds.death.play();
                    enemies.kill(data);
                } else if (data.type === 'pickup') {
                    world.sounds.pickup.play();
                    // TODO: Remove from pickups
                } else if (data.type === 'move') {
                    enemies.move(data);
                } else if (data.type === 'heartbeat') {
                    enemies.heartbeat(data);
                }
            },
            connect: function() {
                $('#gamefield span').hide();

                init();
            }
        });
    });
});

function init() {
    game = new Phaser.Game(24*32, 14*32, Phaser.AUTO, 'gamefield', {
        preload: function() {
            world.preload();
            hud.preload();
            player.preload();
            pickups.preload();
            enemies.preload();
            bullets.preload();
        },

        create: function() {
            progressJs().end();
            world.create();
            hud.create();
            player.create();
            pickups.create();
            enemies.create();
            bullets.create();
        },

        update: function() {
            world.update();
            hud.update();
            player.update();
            pickups.update();
            enemies.update();
            bullets.update();
        },

        loadUpdate: function() {
            progressJs().set(game.load.progress);
        }
    });

    world = new World(game);
    player = new Player(game);
    hud = new HUD(game);
    pickups = new Pickups(game);
    enemies = new Enemies(game);
    bullets = new Bullets(game);
}

function reportLocation(x, y) {
    pubnub.publish({
        channel: channel,
        message: {
            type: 'move',
            client: client_id,
            x: Math.round(x), // bandwidth > accuracy
            y: Math.round(y)
        }
    });
}

function reportSpawn(x, y) {
    pubnub.publish({
        channel: channel,
        message: {
            type: 'spawn',
            client: client_id,
            x: Math.round(x),
            y: Math.round(y)
        }
    });
}

function reportShoot(bullet) {
    pubnub.publish({
        channel: channel,
        message: {
            type: 'shoot',
            client: client_id,
            x: Math.round(bullet.x),
            y: Math.round(bullet.y),
            dir: bullet.dir
        }
    });
}

function reportDeath() {
    pubnub.publish({
        channel: channel,
        message: {
            type: 'death',
            client: client_id
        }
    });
}

function reportHeartbeat(x, y) {
    pubnub.publish({
        channel: channel,
        message: {
            type: 'heartbeat',
            client: client_id,
            x: Math.round(x),
            y: Math.round(y)
        }
    });
}