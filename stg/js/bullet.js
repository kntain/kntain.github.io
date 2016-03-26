define('bullet', function() {
  return function Bullet(inX, inY, inDir, inSpeed) {
    this.x = inX || stg.screenWidth * .5;
    this.y = inY || stg.screenHeight * .25;
    this.hitRadius = 1;
    this.outerRadius = 3;
    this.isPendingKill = false;
    this.movementSpeed = inSpeed || 120;
    this.movementDir = inDir || 0;

    this.update = function(deltaTime) {
      this.x += Math.sin(Math.radians(this.movementDir)) * this.movementSpeed * deltaTime;
      this.y += Math.cos(Math.radians(this.movementDir)) * this.movementSpeed * deltaTime;

      if (this.x - this.outerRadius > stg.screenWidth
          ||  this.x + this.outerRadius < 0
          ||  this.y - this.outerRadius > stg.screenHeight
          ||  this.y + this.outerRadius < 0) {
        this.isPendingKill = true;
      };
    };

    this.draw = function() {
      stg.ctx.beginPath();
      stg.ctx.fillStyle = '#FFFFFF';
      stg.ctx.arc(this.x, this.y, this.outerRadius, 0, 2 * Math.PI);
      stg.ctx.fill();
      stg.ctx.closePath();
    };
  };
});
