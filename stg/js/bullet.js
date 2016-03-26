define('bullet', function() {
  return function Bullet(args) {
    this.x = (typeof args.x == 'undefined') ? stg.screenWidth * 0.5 : args.x;
    this.y = (typeof args.y == 'undefined') ? stg.screenHeight * 0.25 : args.y;
    this.movementDir = args.dir || 0;
    this.movementSpeed = args.speed || 120;
    this.hitRadius = args.hitRadius || 1;
    this.drawRadius = args.drawRadius || 3;
    this.isPendingKill = false;


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
      stg.ctx.arc(this.x, this.y, this.drawRadius, 0, 2 * Math.PI);
      stg.ctx.fill();
      stg.ctx.closePath();
    };
  };
});
