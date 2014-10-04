var world, player, hud, pickups, enemies, game;

game = new Phaser.Game(24*32, 14*32, Phaser.AUTO, 'gamefield', {
    preload: function() {
        world.preload();
        hud.preload();
        player.preload();
        pickups.preload();
        enemies.preload();
    },

    create: function() {
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
    }
});

world = new World(game);
player = new Player(game);
hud = new HUD(game);
pickups = new Pickups(game);
enemies = new Enemies(game);