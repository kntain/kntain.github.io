define('utils', ['bullet'], function(Bullet) {
  Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };

  Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
  };

  Math.sind = function(x) {
    return Math.degrees(Math.sin(x));
  };

  Math.cosd = function(x) {
    return Math.degrees(Math.cos(x));
  };

  Math.tand = function(x) {
    return Math.degrees(Math.tan(x));
  };

  Math.acosd = function(x) {
    return Math.degrees(Math.acos(x));
  };

  Math.asind = function(x) {
    return Math.degrees(Math.asin(x));
  };

  Math.atand = function(x) {
    return Math.degrees(Math.atan(x));
  };

  Math.atan2d = function(y,x) {
    return Math.degrees(Math.atan2(y,x));
  };

  getRadiansToPlayer = function(x, y) {
    return Math.atan2(stg.playerShip.y-y,stg.playerShip.x-x);
  }

  getDegreesToPlayer = function(x, y) {
    return Math.degrees(getRadiansToPlayer(x,y));
  }

  getPatternTime = function() {
    return stg.elapsedTime - stg.startTime;
  }

  addPatternTimeout = function(f, milliseconds) {
    var handle = setTimeout(f, milliseconds);
    stg.patternTimeouts.push(handle);
    return handle;
  };

  addPatternInterval = function(f, milliseconds) {
    var handle = setInterval(f, milliseconds);
    stg.patternIntervals.push(handle);
    return handle;
  };

  removePatternTimeout = function(handle) {
    var i = stg.patternTimeouts.indexOf(handle);
    if (i > -1) {
      clearTimeout(stg.patternTimeouts[i]);
      stg.patternTimeouts.splice(i, 1);
    }
  };

  removePatternInterval = function(handle) {
    var i = stg.patternIntervals.indexOf(handle);
    if (i > -1) {
      clearInterval(stg.patternIntervals[i]);
      stg.patternIntervals.splice(i, 1);
    }

  };

  addBullet = function(args) {
    var b = new Bullet(args);
    stg.bullets.push(b);
    return b;
  };

  removeBullet = function(b) {
    var i = stg.bullets.indexOf(b);
    if (i > -1) stg.bullets.splice(i, 1);
  };

  clearPatternTimeouts = function() {
    stg.patternTimeouts.forEach(function(t) {
      clearTimeout(t);
    });
  };

  clearPatternIntervals = function() {
    stg.patternIntervals.forEach(function(t) {
      clearInterval(t);
    });
  };

  addBulletSpread = function(args) {
    var protoBullet = new Bullet(args);
    var startingDegrees = protoBullet.dir - args.spread.degrees/2.0 + args.spread.degrees/args.spread.numBullets/2

    for (var i=0;i<args.spread.numBullets;i++) {
      var bullet = addBullet(args);
      bullet.dir = startingDegrees + i*(args.spread.degrees/args.spread.numBullets);
    }
  };

  return {

    distanceBetweenPoints: function(x1, x2, y1, y2) {
      var a = x1 - x2
      var b = y1 - y2
      return c = Math.sqrt( a*a + b*b );
    },

    isCollision: function(obj1, obj2) {
      distance = this.distanceBetweenPoints(obj1.x, obj2.x, obj1.y, obj2.y);
      if (distance < obj1.hitRadius + obj2.hitRadius) {
        return true;
      } else {
        return false;
      }
    }
  }
});
