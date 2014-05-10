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
        
        this.lock = false;
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
        
        var parent = this;
        
        this.bx = 0;
        this.by = 0;
        this.moving = 0;
        this.movingBlock = null;
        
        putBlock(this, '#f00', 1, 1);
        putBlock(this, '#f00', 2, 0);
        putBlock(this, '#f00', 3, 3);
        putBlock(this, '#f00', 4, 4);
        
        var startBlock = putBlock(this, '#0081ff', 0, 0);
        startBlock.lock = true;
        
        this.totals = {};
        this.totals['#f00'] = 4;
        this.last = 1;
        this.colorStart = 1;
    },
    ontouchmove: function(e) {
        if(this.moving) {
            //this.movingBlock.x = e.x - this.bx;
            //this.movingBlock.y = e.y - this.by;
            for (var i = 0; i < this.movingBlocks.length; i++) {
                //this.movingBlocks[i].x = e.x - this.bx + (i - this.front) * 40;
                //this.movingBlocks[i].y = e.y - this.by;
                this.movingBlocks[i].x = e.x - this.bx + this.movingBlocks[i].offsetX;
                this.movingBlocks[i].y = e.y - this.by + this.movingBlocks[i].offsetY;
            }
        }
    },
    ontouchstart: function(e) {
        var x = Math.floor(e.x / 40);
        var y = Math.floor(e.y / 40);
        if (boardData[x + y * BOARD_WIDTH] != null && !boardData[x + y * BOARD_WIDTH].lock) {
            this.bx = 20;
            this.by = 19;
            this.moving = true;
            
            
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
                this.movingBlocks[i].x = boardData[x + y * BOARD_WIDTH].x + (i - this.front) * 40;
                this.movingBlocks[i].y = boardData[x + y * BOARD_WIDTH].y;
                this.movingBlocks[i].offsetX = this.movingBlocks[i].x - boardData[x + y * BOARD_WIDTH].x;
                this.movingBlocks[i].offsetY = this.movingBlocks[i].y - boardData[x + y * BOARD_WIDTH].y;
            }
            for (var i = 0; i < 1 + this.front + this.back; i++) {
                var offset = 1 + this.front + this.back;
                this.movingBlocks[i + offset] = addBlock(this, this.movingBlocks[i].color);
                this.movingBlocks[i + offset].x = this.movingBlocks[i].x + 40 * 8;
                this.movingBlocks[i + offset].y = this.movingBlocks[i].y - 40;
                this.movingBlocks[i + offset].offsetX = this.movingBlocks[i + offset].x - boardData[x + y * BOARD_WIDTH].x;
                this.movingBlocks[i + offset].offsetY = this.movingBlocks[i + offset].y - boardData[x + y * BOARD_WIDTH].y;
            }
            for (var i = 0; i < 1 + this.front + this.back; i++) {
                var offset = (1 + this.front + this.back) * 2;
                this.movingBlocks[i + offset] = addBlock(this, this.movingBlocks[i].color);
                this.movingBlocks[i + offset].x = this.movingBlocks[i].x - 40 * 8;
                this.movingBlocks[i + offset].y = this.movingBlocks[i].y + 40;
                this.movingBlocks[i + offset].offsetX = this.movingBlocks[i + offset].x - boardData[x + y * BOARD_WIDTH].x;
                this.movingBlocks[i + offset].offsetY = this.movingBlocks[i + offset].y - boardData[x + y * BOARD_WIDTH].y;
            }
        }
    },
    ontouchend: function(e) {
        var x = Math.floor(e.x / 40);
        var y = Math.floor(e.y / 40);
        if (!this.moving) {
            return;
        }
        if (boardData[x + y * BOARD_WIDTH] == null) {
        
            this.moving = false;
            
            for (var i = this.srcBegin; i <= this.srcEnd; i++) {
                this.removeChild(boardData[i]);
                boardData[i] = null;
            }
            
            var touchIndex = Math.floor((e.x - this.bx + 20) / 40) + Math.floor((e.y - this.by + 19) / 40) * 8;
            
            for (var i = 0; i < 1 + this.front + this.back; i++) {
               
                this.movingBlocks[i].x = Math.floor((touchIndex + (i - this.front)) % 8) * 40;
                this.movingBlocks[i].y = Math.floor((touchIndex + (i - this.front)) / 8) * 40;
                boardData[x + (i - this.front) + y * BOARD_WIDTH] = this.movingBlocks[i];
                this.movingBlocks[i] = null;
                
                var offset = 1 + this.front + this.back;
                this.removeChild(this.movingBlocks[i + offset]);
                this.movingBlocks[i + offset] = null;
                this.removeChild(this.movingBlocks[i + offset * 2]);
                this.movingBlocks[i + offset * 2] = null;
            }
            
            // 確定チェック
            if (boardData[this.last] != null) {
                var num = this.totals[boardData[this.last].color];
                var ok = true;
                for (var i = 0; i < num; i++) {
                    if (boardData[this.last + i] == null 
                            || boardData[this.last].color != boardData[this.last + i].color) {
                        ok = false;
                        break;
                    }
                }
                if(ok) {
                    
                    for (var i = 0; i < num; i++) {
                        boardData[this.last + i].lock = true;
                        //boardData[this.last + i].color = '#0081ff';
                    }
                    this.colorStart = this.last;
                    this.last += num;
                }
            }
        } else {
            this.moving = false;
            for (var i = this.srcBegin; i <= this.srcEnd; i++) {
                boardData[i].opacity = 1;
            }
            for (var i = 0; i < this.movingBlocks.length; i++) {
                this.removeChild(this.movingBlocks[i]);
                this.movingBlocks[i] = null;
            }
        }
    },
    onenterframe: function() {
        if (this.age % 5 == 0) {
        if (boardData[this.colorStart] != null && boardData[this.colorStart].lock) {
            boardData[this.colorStart].color = '#0081ff';;
            this.colorStart++;
        }
        }
    }
});
