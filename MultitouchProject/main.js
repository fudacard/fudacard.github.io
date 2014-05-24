enchant();
var game;
window.onload = function() {

    game = new Game(320, 320);
    game.onload = function() {
        var surface = new Surface(game.width, game.height);
        
        var sprite = new Sprite(game.width, game.height);
        sprite.image = surface;
        
        sprite.onmultitouchmove = function(e) {
            console.log("touch");
            if (e.touches.length == 2) {
                surface.context.clearRect(0, 0, surface.width, surface.height);
                surface.context.strokeStyle = '#000';
                surface.context.moveTo(e.touches[0].pageX, e.touches[0].pageY);
                surface.context.lineTo(e.touches[1].pageX, e.touches[1].pageY);
                surface.context.stroke();
            }
        };
        game.rootScene.addChild(sprite);
    };
    game.start();
};
