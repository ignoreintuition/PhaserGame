var loadState = {
    preload: function(){
        var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Courier", fill: "#ffffff"});
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.PageAlignHorizonally = true;
        game.scale.PageAlignVertically = true;
        game.stage.backgroundColor = "#000000";
        
        game.load.spritesheet("characters", "assets/sprites/characters.png", 32, 36);
        
        game.load.tilemap("level", "assets/maps/level.json", null ,Phaser.Tilemap.TILED_JSON);
        game.load.image("tiles", "assets/maps/tileset.png");
        
    },
    create: function(){
        game.state.start("title");
    }
};