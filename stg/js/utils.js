define('utils', ['bullet'], function() {
  Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };

  Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
  };

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

  };

  removePatternInterval = function(handle) {

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
