/**
 * multitouch.enchant.js
 */
enchant.multitouch = {};

enchant.multitouch.Core = enchant.Class.create(enchant.Core, {
    initialize: function() {
        enchant.Core.call(this);
        
        var stage = enchant.Core.instance._element;
        stage.addEventListener('touchstart', function(e) {
            var core = enchant.Core.instance;
            var evt = new enchant.Event('multitouchstart');
            evt._initPosition(e.pageX, e.pageY);
            evt.touches = e.touches;
            var target = core.currentScene._determineEventTarget(evt);
            //core._touchEventTarget[core._mousedownID] = target;
            target.dispatchEvent(evt);
        }, false);
        stage.addEventListener('touchmove', function(e) {
            var core = enchant.Core.instance;
            var evt = new enchant.Event('multitouchmove');
            evt._initPosition(e.pageX, e.pageY);
            evt.touches = e.touches;
            var target = core._touchEventTarget[core._mousedownID];
            if (target) {
                target.dispatchEvent(evt);
            }
        }, false);
        stage.addEventListener('touchend', function(e) {
            var core = enchant.Core.instance;
            var evt = new enchant.Event('multitouchend');
            evt._initPosition(e.pageX, e.pageY);
            evt.touches = e.touches;
            var target = core._touchEventTarget[core._mousedownID];
            if (target) {
                target.dispatchEvent(evt);
            }
            delete core._touchEventTarget[core._mousedownID];
        }, false);
    }
});

