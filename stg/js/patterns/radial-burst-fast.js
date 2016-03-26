define(['bullet'], function(Bullet) {
  return {
    name:'Radial Burst Fast',
    activate: function() {
      var burst = function () {
        for (var i=0; i < 120; i++) {
          addBullet({x:stg.screenWidth * .5, y: stg.screenHeight*.25, dir: i*3, speed: 120});
        }
      };
      addPatternInterval(burst, 250);
    }
  };
});
