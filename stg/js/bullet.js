define('bullet', function() {
  return function Bullet(args) {

    this.initialize = function(args) {
      if (typeof args == 'undefined') args = {};

      this.x = (typeof args.x == 'undefined') ? stg.screenWidth * 0.5 : args.x;
      this.y = (typeof args.y == 'undefined') ? stg.screenHeight * 0.25 : args.y;
      this.speed = (typeof args.speed == 'undefined') ? stg.screenWidth / 2 : args.speed;

      if (args.aimed != false) {
        this.dir = getDegreesToPlayer(this.x, this.y) + (args.dir || 0);
      }
      else {
        this.dir = args.dir || 0;
      }

      this.innerColor = args.innerColor || '#FFFFFF'
      this.outerColor = args.outerColor || '#AAAAAA'
      this.hitRadius = args.hitRadius || 1;
      this.drawRadius = args.drawRadius || 3;
      this.isPendingKill = false;
      this.rotSpeed = args.rotSpeed || 0;
      this.accel = args.accel || 0;

      if (typeof args.customUpdate == 'function') {
        this.customUpdate = args.customUpdate;
      }
    }

    this.update = function(deltaTime) {
      this.dir += this.rotSpeed * deltaTime;
      this.speed += this.accel * deltaTime;

      this.x += Math.cos(Math.radians(this.dir)) * this.speed * deltaTime;
      this.y += Math.sin(Math.radians(this.dir)) * this.speed * deltaTime;

      if (this.x - this.drawRadius > stg.screenWidth
          ||  this.x + this.drawRadius < 0
          ||  this.y - this.drawRadius > stg.screenHeight
          ||  this.y + this.drawRadius < 0) {
        this.isPendingKill = true;
      };

      this.customUpdate(deltaTime);
    };

    this.customUpdate = function(deltaTime) {

    };

    this.draw = function() {
      stg.ctx.beginPath();
      stg.ctx.fillStyle = this.innerColor;
      stg.ctx.strokeStyle = this.outerColor;
      stg.ctx.lineWidth = this.drawRadius/3;
      stg.ctx.arc(this.x, this.y, this.drawRadius, 0, 2 * Math.PI);
      stg.ctx.fill();
      stg.ctx.stroke();
      stg.ctx.closePath();
    };

    this.initialize(args);

  };
});
