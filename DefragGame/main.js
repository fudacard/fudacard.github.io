enchant();
var game;
var boardData = new Array();
var BOARD_WIDTH = 8;
var BOARD_HEIGHT = 8;
window.onload = function() {

    game = new Game(320, 320);
    console.log(game.fps);
    game.preload('chara1.png');
    game.onload = function() {
        // ここに処理を書いていきます。
        var bear = new Sprite(32, 32);
        bear.image = game.assets['chara1.png'];
        game.rootScene.addChild(bear);
        
        game.pushScene(new GameScene());
        
    };
    game.start();
};

var Block = Class.create(enchant.Sprite, {
    initialize: function() {
        enchant.Sprite.call(this, 40, 38);
        
        this._color = '#f00';
        
        var s = new Surface(40, 38);
        s.context.fillStyle = this._color;
        s.context.fillRect(0, 0, s.width, s.height);
        s.context.strokeStyle = 'black';
        s.context.strokeRect(0, 0, s.width, s.height);
        this.image = s;
    },
    color: {
        get: function() {
            return this._color;
        },
        set: function(c) {
            this._color = c;
            var s = new Surface(40, 38);
            s.context.fillStyle = this._color;
            s.context.fillRect(0, 0, s.width, s.height);
            s.context.strokeStyle = 'black';
            s.context.strokeRect(0, 0, s.width, s.height);
            this.image = s;
        }
    }
});

function addBlock(scene, color) {
    var block = new Block();
    block.color = color;
    scene.addChild(block);
    return block;
}

function putBlock(scene, color, x, y) {
    boardData[x + y * BOARD_WIDTH] = new Block();
    boardData[x + y * BOARD_WIDTH].color = color;
    boardData[x + y * BOARD_WIDTH].x = x * 40;
    boardData[x + y * BOARD_WIDTH].y = y * 40;
    scene.addChild(boardData[x + y * BOARD_WIDTH]);
    return boardData[x + y * BOARD_WIDTH];
}

var GameScene = Class.create(enchant.Scene, {
    initialize: function() {
        enchant.Scene.call(this);
        
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
        /*this.block = new Sprite(40, 38);
        var s = new Surface(40, 38);
        s.context.fillStyle = 'lightgreen';
        s.context.fillRect(0, 0, s.width, s.height);
        s.context.strokeStyle = 'black';
        s.context.strokeRect(0, 0, s.width, s.height);
        this.block.image = s;
        this.addChild(this.block);*/
        
        var parent = this;
        
        this.bx = 0;
        this.by = 0;
        this.moving = 0;
        this.movingBlock = null;
        
        /*var block2 = new Sprite(40, 38);
        s.context.fillStyle = 'red';
        s.context.fillRect(0, 0, s.width, s.height);
        s.context.strokeStyle = 'black';
        s.context.strokeRect(0, 0, s.width, s.height);
        block2.image = s;
        block2.x = 40;
        this.addChild(block2);*/
        
       // this.block.ontouchstart = function(e) {
            //bx = e.x - block.x;
            //by = e.y - block.y;
       //     parent.bx = 20;
       //     parent.by = 19;
       //     parent.moving = 1;
       // };
        
        
        /*this.block.ontouchmove = function(e) {
            if(parent.moving) {
                parent.block.x = e.x + parent.bx;
                parent.block.y = e.y + parent.by;
            }
        };*/
        
        /*this.block.ontouchend = function(e) {
            parent.moving = 0;
            parent.block.x = Math.floor((e.x - parent.bx + 20) / 40) * 40 + left;
            parent.block.y = Math.floor((e.y - parent.by + 19) / 40) * 40;
            boardData[x + y * BOARD_WIDTH] = parent.movingBlock;
            parent.movingBlock = null;
        };*/
        boardData[0 + 0 * BOARD_WIDTH] = new Block();
        boardData[0 + 0 * BOARD_WIDTH].color;
        this.addChild(boardData[0 + 0 * BOARD_WIDTH]);
        
        putBlock(this, '#f00', 2, 0);
        putBlock(this, '#ff0', 2, 2);
        putBlock(this, '#f00', 3, 3);
    },
    ontouchmove: function(e) {
        if(this.moving) {
            //this.movingBlock.x = e.x - this.bx;
            //this.movingBlock.y = e.y - this.by;
            for (var i = 0; i < 1 + this.front + this.back; i++) {
                this.movingBlocks[i].x = e.x - this.bx + (i - this.front) * 40;
                this.movingBlocks[i].y = e.y - this.by;
            }
        }
    },
    ontouchstart: function(e) {
        var x = Math.floor(e.x / 40);
        var y = Math.floor(e.y / 40);
        if (boardData[x + y * BOARD_WIDTH] != null) {
            this.bx = 20;
            this.by = 19;
            this.moving = 1;
            
            
            this.back = 0;
            while(boardData[x + this.back + 1 + y * BOARD_WIDTH] != null
                && boardData[x + y * BOARD_WIDTH].color == boardData[x + this.back + 1 + y * BOARD_WIDTH].color) {
                this.back++;
            }
            
            this.front = 0;
            while(boardData[x - this.front - 1 + y * BOARD_WIDTH] != null
                && boardData[x + y * BOARD_WIDTH].color == boardData[x - this.front - 1 + y * BOARD_WIDTH].color) {
                this.front++;
            }
            this.srcBegin = x - this.front + y * BOARD_WIDTH;
            this.srcEnd = x + this.back + y * BOARD_WIDTH;
            this.movingBlocks = [];
            for (var i = 0; i < 1 + this.front + this.back; i++) {
                boardData[x + i - this.front + y * BOARD_WIDTH].opacity = 0.4;
                this.movingBlocks[i] = addBlock(this, boardData[x + i - this.front + y * BOARD_WIDTH].color);
//                boardData[x + i - this.front + y * BOARD_WIDTH] = null;
            }
        }
    },
    ontouchend: function(e) {
        var x = Math.floor(e.x / 40);
        var y = Math.floor(e.y / 40);
        if (boardData[x + y * BOARD_WIDTH] == null) {
        
            this.moving = 0;
            
            for (var i = this.srcBegin; i <= this.srcEnd; i++) {
                this.removeChild(boardData[i]);
                boardData[i] = null;
            }
            
            for (var i = 0; i < 1 + this.front + this.back; i++) {
                this.movingBlocks[i].x = Math.floor((e.x + (i - this.front) * 40 - this.bx + 20) / 40) * 40;
                this.movingBlocks[i].y = Math.floor((e.y - this.by + 19) / 40) * 40;
                boardData[x + (i - this.front) + y * BOARD_WIDTH] = this.movingBlocks[i]
            }
        } else {
            this.moving = 0;
            for (var i = this.srcBegin; i <= this.srcEnd; i++) {
                boardData[i].opacity = 1;
            }
            for (var i = 0; i < 1 + this.front + this.back; i++) {
                this.removeChild(this.movingBlocks[i]);
                this.movingBlocks[i] = null;
            }
        }
    }
});
