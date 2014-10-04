var world, player, hud, pickups, game;

game = new Phaser.Game(24*32, 14*32, Phaser.AUTO, 'gamefield', {
    preload: function() {
        world.preload();
        hud.preload();
        player.preload();
        pickups.preload();
    },

    create: function() {
        world.create();
        hud.create();
        player.create();
        pickups.create();
    },

    update: function() {
        world.update();
        hud.update();
        player.update();
        pickups.update();
    }
});

world = new World(game);
player = new Player(game);
hud = new HUD(game);
pickups = new Pickups(game);
