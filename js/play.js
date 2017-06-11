var playState = {
    player: null,
    mob: null,
    layer: null,


    create: function () {
        var self = this;
        var map;
        map = game.add.tilemap("level2");
        map.addTilesetImage("tileset", "tiles");

        self.layer = map.createLayer("Tile Layer 1");

        self.player = new Player(300, 200);
        game.add.existing(self.player);
        game.physics.enable(self.player, Phaser.Physics.ARCADE);


        self.mob = game.add.group();
        self.mob.add(Enemy(100, 100));
        self.mob.add(Enemy(300, 100));
        self.mob.forEach(function (enemy, index) {
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.immovable = true;
        });


        game.input.activePointer.capture = true;
    },
    update: function () {
        var self = this;
        self.player.animations.play("wait");
        self.mob.forEach(function (enemy, index) {
            enemy.animations.play("wait");
        });
        if (game.input.activePointer.isDown) {
            self.player.setDest(game.input.x, game.input.y);

        }
        self.player.update();
        game.physics.arcade.collide(self.player, self.mob, function () {
            self.player.stop();
        });
        game.physics.arcade.collide(self.player, self.layer, function () {
            self.player.stop();
        });
    }
}



function Player(x, y) {
    var player = game.add.sprite(x, y, "characters");

    player.frame = 19;
    player.xDest = x;
    player.yDest = y;
    player.anchor.setTo(.5, 1);
    player.animations.add("wait", [18, 19, 20], 3);

    player.setDest = function (x, y) {
        player.xDest = x;
        player.yDest = y;
    };

    player.update = function () {
        var self = this;
        if (Math.floor(self.x / 10) == Math.floor(self.xDest / 10)) {
            self.body.velocity.x = 0;
        } else if (Math.floor(self.x) < Math.floor(self.xDest)) {
            self.body.velocity.x = 80;
            self.scale.x = 1;
        } else if (Math.floor(self.x) > Math.floor(self.xDest)) {
            self.body.velocity.x = -80;
            self.scale.x = -1;
        }
        if (Math.floor(self.y / 10) === Math.floor(self.yDest / 10)) {
            self.body.velocity.y = 0;
        } else if (Math.floor(self.y) < Math.floor(self.yDest)) {
            self.body.velocity.y = 80;
        } else if (Math.floor(self.y) > Math.floor(self.yDest)) {
            self.body.velocity.y = -80;
        }
    }
    player.stop = function () {
        var self = this;
        self.xDest = self.x;
        self.yDest = self.y;
        self.body.velocity.x = self.body.velocity.y = 0;
    }
    return player;

};

function Enemy(x, y) {
    var enemy = game.add.sprite(x, y, "characters");

    enemy.xDest = x;
    enemy.yDest = y;
    //enemy.animations.add("wait", [51, 52, 53], );

    enemy.frame = 52;
    enemy.anchor.setTo(.5, 1)
    enemy.scale.x = 1;

    enemy.goToXY = function (x, y) {

    }

    enemy.update = function () {

    }

    enemy.stop = function () {

    }
    return enemy;
};
