define(['bullet'], function(Bullet) {
  return {
    name:'Radial Burst',
    activate: function() {
      var burst = function () {
        for (var i=1; i < 120; i++) {
          stg.bullets.push(new Bullet(0, stg.screenHeight*.25, i*3, 120));
        }
      };
      stg.patternIntervals.push(setInterval(burst, 1000));
    }
  };

});
