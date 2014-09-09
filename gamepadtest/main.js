enchant();
var game;
window.onload = function() {

    game = new Game(320, 320);
    game.preload('chara1.png');
    game.onload = function() {
        
        var label = new Label("ゲームパッドを接続してください。");
        game.rootScene.addChild(label);
        
        window.addEventListener("gamepadconnected", function(e) {
            console.log("gamepad connected");
        });
        window.addEventListener("gamepaddisconnected", function(e) {
            console.log("gamepad disconnected");
        });
        
        var bear = new Sprite(32, 32);
        bear.image = game.assets['chara1.png'];
        bear.onenterframe = function() {
            var gamepad = navigator.getGamepads && navigator.getGamepads()[0];
            if (gamepad) {
                label.text = "ゲームパッドを検出しました";
                if (gamepad.axes[0] < -0.5) {
                    bear.x -= 3;
                }
                if (gamepad.axes[0] > 0.5) {
                    bear.x += 3;
                }
                if (gamepad.axes[1] < -0.5) {
                    bear.y -= 3;
                }
                if (gamepad.axes[1] > 0.5) {
                    bear.y += 3;
                }
                if (gamepad.buttons[0].pressed) {
                    bear.frame = (bear.frame + 1) % 9;
                }
                if (gamepad.buttons[1].pressed) {
                    bear.frame = (bear.frame + 8) % 9;
                }
            } else {
                label.text = "ゲームパッドを接続してください。";
            }
        };
        game.rootScene.addChild(bear);
    };
    game.start();
};

