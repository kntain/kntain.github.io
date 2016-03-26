define('player-ship', function() {
  return function PlayerShip() {
    this.x = stg.screenWidth * .5;
    this.y = stg.screenHeight * .75;
    this.hitRadius = 2;
    this.outerRadius = 8;
    this.isDead = false;
    this.isInvincible = false;
    this.movementSpeed = 120;
    this.update = function(deltaTime) {
      var movementDir = this.getMovementDir();

      if (movementDir != null) {
        var destinationX = this.x + Math.sin(movementDir) * this.movementSpeed * deltaTime;
        var destinationY = this.y + Math.cos(movementDir) * this.movementSpeed * deltaTime;

        if (destinationX > stg.screenWidth) destinationX = stg.screenWidth;
        else if (destinationX < 0) destinationX = 0;
        if (destinationY > stg.screenHeight) destinationY = stg.screenHeight;
        else if (destinationY < 0) destinationY = 0;

        this.x = destinationX;
        this.y = destinationY;
      }
    };

    this.getMovementDir = function() {
      var joystick = stg.joystick;
      var movementDir = null;

      if (joystick.isUpLeft())          movementDir = 1.25 * Math.PI;
      else if (joystick.isUpRight())    movementDir = .75 * Math.PI;
      else if (joystick.isDownLeft())   movementDir = 1.75 * Math.PI;
      else if (joystick.isDownRight())  movementDir = .25 * Math.PI;
      else if (joystick.isLeftPressed)  movementDir = 1.5 * Math.PI;
      else if (joystick.isRightPressed) movementDir = .5 * Math.PI;
      else if (joystick.isUpPressed)    movementDir = Math.PI;
      else if (joystick.isDownPressed)  movementDir = 0;

      return movementDir;
    };

    this.draw = function() {
      this.drawOuter();
      this.drawHitRegion();
    };

    this.drawOuter = function() {
      stg.ctx.beginPath();
      stg.ctx.fillStyle = '#333333';
      stg.ctx.arc(this.x, this.y, this.outerRadius, 0, 2 * Math.PI);
      stg.ctx.fill();
      stg.ctx.closePath();
    };

    this.drawHitRegion = function() {
      stg.ctx.beginPath();
      stg.ctx.fillStyle = '#FF0000';
      stg.ctx.arc(this.x, this.y, this.hitRadius, 0, 2 * Math.PI);
      stg.ctx.fill();
      stg.ctx.closePath();
    };
  };
});
