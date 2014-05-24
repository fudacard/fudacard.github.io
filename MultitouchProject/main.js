enchant();
var game;
window.onload = function() {

    game = new Game(320, 320);
    game.onload = function() {
        var surface = new Surface(game.width, game.height);
        
        var sprite = new Sprite(game.width, game.height);
        sprite.image = surface;
        
        sprite.onmultitouchstart = function(e) {
            surface.context.clearRect(0, 0, surface.width, surface.height);
        };
        
        sprite.onmultitouchmove = function(e) {
            console.log("touch");
            //surface.context.clearRect(0, 0, surface.width, surface.height);
            if (e.touches.length == 2) {
                surface.context.strokeStyle = '#000';
                surface.context.beginPath();
                surface.context.moveTo(e.touches[0].x, e.touches[0].y);
                surface.context.lineTo(e.touches[1].x, e.touches[1].y);
                surface.context.stroke();
            }
        };
        sprite.onmultitouchend = function(e) {
        };
        game.rootScene.addChild(sprite);
    };
    game.start();
};
