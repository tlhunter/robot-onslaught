"use strict";

var world, player, hud, pickups, enemies, game;

var client_id;
var pubnub;

$(function() {
    progressJs().setOptions({
        overlayMode: true,
        theme: 'onslaught'
    }).start();

    $.get('/config/pubnub.json', function (data) {
        client_id = PUBNUB.uuid();

        pubnub = PUBNUB.init({
            publish_key: data.publish,
            subscribe_key: data.subscribe,
            ssl: true
        });

        pubnub.subscribe({
            channel: data.channel,

            message: function(data) {
                console.log(data);

                if (data.client === client_id) { return; }
            },
            connect: function() {
                $('#gamefield span').hide();

                init();

                pubnub.publish({
                    channel: data.channel,
                    message: {
                        client: client_id,
                        msg: 'hi'
                    }
                });
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
        },

        create: function() {
            progressJs().end();
            world.create();
            hud.create();
            player.create();
            pickups.create();
            enemies.create();
        },

        update: function() {
            world.update();
            hud.update();
            player.update();
            pickups.update();
            enemies.update();
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
}