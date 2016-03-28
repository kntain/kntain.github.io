define(['bullet'], function(Bullet) {
  return {
    name:'Welcome Pattern',
    activate: function() {

      // firing a totally default bullet:
      addBullet();

      // firing bullets with some parameters:
      addBullet({x:stg.screenWidth * .25, y: stg.screenHeight*.1, speed: 60, drawRadius:6});
      addBullet({x:stg.screenWidth * .75, y: stg.screenHeight*.1, speed: 60, drawRadius:6});

      // use dir to specify a direction in degrees.
      // when aimed is true (which it is by default),
      // dir will be an offset to the aimed angle:
      addBullet({x:stg.screenWidth * .25, y: stg.screenHeight*.1, speed: 160});
      addBullet({x:stg.screenWidth * .75, y: stg.screenHeight*.1, speed: 160});

      // firing three bullets after a one-second delay:
      addPatternTimeout(function(){
        addBullet({dir: -15, speed: 110});
        addBullet({speed: 110});
        addBullet({dir: 15, speed: 110});
      }, 1000);

      // firing a big dumb shotgun blast every half second,
      // starting after two seconds:
      addPatternTimeout(function(){
        addPatternInterval(function(){
          for (var i=0;i<20;i++) {
            addBullet({ dir: Math.random() * 45 - 22.5,
                        speed: Math.random() * 40 + 80});
          }
        }, 500);
      }, 2000);

      // clearing all repeaters after 20 seconds:
      addPatternTimeout(function(){clearPatternIntervals()}, 20000);

    }
  };

});
