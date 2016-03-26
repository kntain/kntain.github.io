define('joystick', function() {
  return function Joystick(){
    this.keyCodes = {
      up: 38,
      down: 40,
      left: 37,
      right: 39,
      w: 87,
      a: 65,
      s: 83,
      d: 68,
      r: 82,
      i: 73,
      space: 32,
      enter: 13
    };

    this.addEventListeners = function() {
      var $el = $('.game-column');
      $el.on('keydown', function(e) {
        var keys = stg.joystick.keyCodes;
        if (e.which == keys.left  || e.which == keys.a) { stg.joystick.isLeftPressed  = true; }
        if (e.which == keys.right || e.which == keys.d) { stg.joystick.isRightPressed = true; }
        if (e.which == keys.up    || e.which == keys.w) { stg.joystick.isUpPressed    = true; }
        if (e.which == keys.down  || e.which == keys.s) { stg.joystick.isDownPressed  = true; }
        if (e.which == keys.r) { $('#resetButton').click(); }
        if (e.which == keys.i) { $('#invincibleButton').click(); }
      });
      $el.on('keyup', function(e) {
        var keys = stg.joystick.keyCodes;
        if (e.which == keys.left  || e.which == keys.a) { stg.joystick.isLeftPressed  = false; }
        if (e.which == keys.right || e.which == keys.d) { stg.joystick.isRightPressed = false; }
        if (e.which == keys.up    || e.which == keys.w) { stg.joystick.isUpPressed    = false; }
        if (e.which == keys.down  || e.which == keys.s) { stg.joystick.isDownPressed  = false; }
      });

      $el.focus();
    };

    this.isLeftPressed   = false;
    this.isRightPressed  = false;
    this.isUpPressed     = false;
    this.isDownPressed   = false;

    this.isUpLeft    = function() { return this.isUpPressed    && this.isLeftPressed;  };
    this.isUpRight   = function() { return this.isUpPressed    && this.isRightPressed; };
    this.isDownLeft  = function() { return this.isDownPressed  && this.isLeftPressed;  };
    this.isDownRight = function() { return this.isDownPressed  && this.isRightPressed; };

    this.addEventListeners();

  }
});
