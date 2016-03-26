define(['bullet'], function(Bullet) {
  return {
    name:'Welcome Pattern',
    activate: function() {

      // firing a bullet immediately:
      addBullet({x:stg.screenWidth * .5, y: stg.screenHeight*.25, dir: 90, speed: 120});

      // firing three bullets after a half-second delay:
      addPatternTimeout(function(){
        addBullet({dir: 75, speed: 110});
        addBullet({dir: 90, speed: 110});
        addBullet({dir: 105, speed: 110});
      }, 500);

      // begin firing repeatedly in random directions with a widening range after a full-second delay:
      addPatternTimeout(function(){
        addPatternInterval(function(){
          addBullet({dir: 67.5 + Math.random() * 45  });
        }, 10);
      }, 1000);

      // clearing all repeaters after two seconds:
      addPatternTimeout(function(){clearPatternIntervals()}, 2000);

    }
  };

});
