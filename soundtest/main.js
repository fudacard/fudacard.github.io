enchant();
var game;
window.onload = function() {

    game = new Game(320, 320);
    game.onload = function() {
        var label = new Label("再生ボタンを押してください");
        game.rootScene.addChild(label);
        
        // canPlayTypeチェック
        var audio = new Audio();
        var labelMp3 = new Label("");
        labelMp3.x = 0;
        labelMp3.y = 25;
        labelMp3.text = "audio/mpeg " + audio.canPlayType('audio/mpeg');
        game.rootScene.addChild(labelMp3);
        var labelOgg = new Label("");
        labelOgg.x = 0;
        labelOgg.y = 60;
        labelOgg.text = "audio/ogg " + audio.canPlayType('audio/ogg');
        game.rootScene.addChild(labelOgg);
        var labelWav = new Label("");
        labelWav.x = 0;
        labelWav.y = 95;
        labelWav.text = "audio/wav " + audio.canPlayType('audio/wav');
        game.rootScene.addChild(labelWav);
        
        // 再生ボタン
        var label3 = new Label("音楽:魔王魂");
        label3.x = 220;
        label3.y = 280;
        game.rootScene.addChild(label3);
        
        var buttonMp3 = new Button("mp3再生");
        buttonMp3.x = 130;
        buttonMp3.y = 25;
        buttonMp3.ontouchend = function() {
            game.load("se_maoudamashii_onepoint28.mp3", function() {
                game.assets["se_maoudamashii_onepoint28.mp3"].play();
            });
        };
        game.rootScene.addChild(buttonMp3);
        
        var buttonOgg = new Button("ogg再生");
        buttonOgg.x = 130;
        buttonOgg.y = 60;
        buttonOgg.ontouchend = function() {
            game.load("se_maoudamashii_onepoint28.ogg", function() {
                game.assets["se_maoudamashii_onepoint28.ogg"].play();
            });
        };
        game.rootScene.addChild(buttonOgg);
        
        var buttonWav = new Button("wav再生");
        buttonWav.x = 130;
        buttonWav.y = 95;
        buttonWav.ontouchend = function() {
            game.load("se_maoudamashii_onepoint28.wav", function() {
                game.assets["se_maoudamashii_onepoint28.wav"].play();
            });
        };
        game.rootScene.addChild(buttonWav);
    };
    game.start();
};
