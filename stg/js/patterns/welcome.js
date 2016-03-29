define(['bullet'], function(Bullet) {
  return {
    name:'Welcome Pattern',
    activate: function() {
      // uncomment to fire a totally default bullet, which is an aimed
      // bullet from the upper-middle:
      // addBullet();

      // at half a second, fire two bigger yellow bullets from different
      // positions, aimed 5 degrees off from the player:
      addPatternTimeout(function(){
        addBullet({x: 60,  y: 32, speed: 100, dir: 5,  drawRadius:6, outerColor: '#FFFF00'});
        addBullet({x: 180, y: 32, speed: 100, dir: -5, drawRadius:6, outerColor: '#FFFF00'});
      }, 500);

      // set aimed to false to ignore player position:
      addPatternTimeout(function(){
        addBullet({x: 60,  y: 32, aimed: false, dir: 45,  outerColor: '#0000FF'});
        addBullet({x: 180, y: 32, aimed: false, dir: 135, outerColor: '#0000FF'});
      }, 1000);

      // fire a spread of bullets:
      addPatternTimeout(function() {
        addBulletSpread({
          x: 120,
          y: 5,
          outerColor: '#FF00FF',
          spread: {numBullets: 6, degrees: 45}
        });
      }, 1500);

      // curve bullets with rotSpeed:
      addPatternTimeout(function() {
        addBullet({rotSpeed: 110,   outerColor: '#00FF00'});
        addBullet({rotSpeed: -110,  outerColor: '#00FF00'});
      }, 2000);

      // use accel to set acceleration:
      addPatternTimeout(function() {
        addBullet({accel:-50, outerColor: '#FF0000'});
      }, 2500);

      // fire big dumb shotgun blasts to the side every
      // half second, starting after 2.5 seconds:
      addPatternTimeout(function(){
        addPatternInterval(function(){
         for (var i=0;i<20;i++) {
           addBullet({  dir: Math.random() * 45 - 22.5 + 90,
                        speed: Math.random() * 40 + 80  });
           addBullet({  dir: Math.random() * 45 - 22.5 - 90,
                        speed: Math.random() * 40 + 80  });
         }
       }, 500);
     }, 2500);

      // clear all intervals after 6 seconds:
      addPatternTimeout(function(){clearPatternIntervals()}, 6000);
    }
  };

});
