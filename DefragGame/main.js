enchant();
var game;
window.onload = function() {

    game = new Game(320, 320);
    game.preload('chara1.png');
    game.onload = function() {
        // ここに処理を書いていきます。
        var bear = new Sprite(32, 32);
        bear.image = game.assets['chara1.png'];
        game.rootScene.addChild(bear);
        
        
        var left = (game.width - 8 * 40) / 2;
        console.log(left);
        var board = new Sprite(320, 320);
        var s1 = new Surface(320, 320);
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                s1.context.strokeRect(i * 40 + left, j * 40, 40, 38);
            }
        }
        board.image = s1;
        game.rootScene.addChild(board);
        
        
        // テストブロック
        var block = new Sprite(40, 38);
        var s = new Surface(40, 38);
        s.context.fillStyle = 'lightgreen';
        s.context.fillRect(0, 0, s.width, s.height);
        s.context.strokeStyle = 'black';
        s.context.strokeRect(0, 0, s.width, s.height);
        block.image = s;
        game.rootScene.addChild(block);
        
        var x = 0;
        var y = 0;
        var bx = 0;
        var by = 0;
        var moving = 0;
        block.ontouchstart = function(e) {
            x = e.x;
            y = e.y;
            //bx = e.x - block.x;
            //by = e.y - block.y;
            bx = 20;
            by = 19;
            moving = 1;
        };
        
        game.rootScene.ontouchmove = function(e) {
            if(moving) {
                block.x = e.x - bx;
                block.y = e.y - by;
            }
        };
        
        block.ontouchmove = function(e) {
            if(moving) {
                block.x = e.x + bx;
                block.y = e.y + by;
            }
        };
        
        block.ontouchend = function(e) {
            moving = 0;
            block.x = Math.floor((e.x - bx + 20) / 40) * 40 + left;
            block.y = Math.floor((e.y - by + 19) / 40) * 40;
        };
        
    };
    game.start();
};
