var stg = {};
require(['joystick', 'player-ship', 'bullet', 'utils', 'pattern-manager'], function(Joystick, PlayerShip, Bullet, Utils, PatternManager) {

  stg.elapsedTime     = 0.0;
  stg.screenWidth     = 240;
  stg.screenHeight    = 320;
  stg.backgroundColor = '#000000';
  stg.deadBackgroundColor = '#AA0000';
  stg.victoryColor = '#00AA00';
  stg.textColor = '#AAAAAA';
  stg.joystick = new Joystick();
  stg.ctx = getScreenContext();
  stg.bullets = [];
  stg.patternTimeouts = [];
  stg.patternIntervals = [];
  stg.patterns = PatternManager.patterns;
  stg.examplePatterns = PatternManager.examplePatterns;
  stg.currentPattern;
  stg.isVictory = false;
  stg.editorRefreshTimerHandle = null;
  initializeUI();

  startGame(stg.examplePatterns[0]);

  mainLoop(0);

  function mainLoop(now){
      var deltaTime = (now-stg.elapsedTime) / 1000;
      stg.elapsedTime=now;

      if (!stg.playerShip.isDead) {
        stg.playerShip.update(deltaTime);
        updateBullets(deltaTime);
        checkForCollisions();
      }

      draw();
      deletePendingKillBullets();
      requestAnimationFrame(mainLoop);
  }

  function startGame(pattern) {
    var wasInvincible = false;
    if (stg.playerShip) {
      wasInvincible = stg.playerShip.isInvincible;
    };
    stg.playerShip = new PlayerShip();
    stg.playerShip.isInvincible = wasInvincible;
    stg.bullets = [];
    clearPatternTimeoutsAndIntervals();
    stg.startTime = stg.elapsedTime;
    stg.timeOfDeath = 0.0;

    if (pattern) {
      stg.currentPattern = pattern;
      populateEditor(pattern);
    }

    try {
      eval('var currentActivate = '+stg.currentPattern.activate);
      currentActivate();
    } catch (e) {
      stg.playerShip.isDead = true;
    }
  };

  function getScreenContext() {
    var container = $('#canvasContainer');
    var canvas = $('<canvas/>');
    canvas.attr('width', stg.screenWidth);
    canvas.attr('height', stg.screenHeight);
    canvas.attr('id', 'stgCanvas');
    canvas.addClass('stg-canvas');
    container.append(canvas);
    return canvas[0].getContext("2d");
  }

  function clearPatternTimeoutsAndIntervals() {
    clearPatternTimeouts();
    clearPatternIntervals();
  }

  function updateBullets(deltaTime) {
    stg.bullets.forEach(function(b) {
      b.update(deltaTime);
    });
  }

  function drawBullets() {
    stg.bullets.forEach(function(b) {
      b.draw();
    });
  }

  function deletePendingKillBullets() {
    stg.bullets = stg.bullets.filter(function(b){return !b.isPendingKill;});
  }

  function checkForCollisions() {
    if (!stg.playerShip.isInvincible) {
      stg.bullets.forEach(function(b){
        if (Utils.isCollision(b, stg.playerShip)) {
          stg.playerShip.isDead = true;
          stg.timeOfDeath = stg.elapsedTime;
          clearPatternTimeoutsAndIntervals();
        }
      });
    }
  }

  function draw() {
    if (stg.playerShip.isDead) {
      stg.ctx.fillStyle = stg.deadBackgroundColor ;
    } else if (stg.isVictory) {
      stg.ctx.fillStyle = stg.victoryColor;
    } else {
      stg.ctx.fillStyle = stg.backgroundColor;
    }
    stg.ctx.fillRect(0,0,stg.screenWidth,stg.screenHeight);
    stg.playerShip.draw();
    drawBullets();
    drawStats();
  }

  function drawStats() {
    stg.ctx.fillStyle = stg.textColor;
    stg.ctx.fillText(stg.bullets.length,0,10);
    var time = stg.playerShip.isDead ? stg.timeOfDeath : stg.elapsedTime - stg.startTime;
    stg.ctx.fillText(Math.floor(time / 1000),stg.screenWidth-30,10);
  }

  function initializeUI() {
    $('#resetButton').click(function() {
      startGame();
      window.setTimeout(function() {window.scrollTo(0,0);}, 0);
    });
    $('#editButton').click(function() {
      window.setTimeout(function() {window.scrollTo(0,document.body.scrollHeight);}, 0);
    });
    $('#returnButton').click(function() {
      $('#resetButton').click();
    });
    $('#invincibleButton').click(function() {
      stg.playerShip.isInvincible = !stg.playerShip.isInvincible;
    });

    stg.activateMethodEditor = ace.edit("activateMethodEditor");
    stg.activateMethodEditor.$blockScrolling = Infinity;
    stg.activateMethodEditor.setTheme("ace/theme/tomorrow_night_eighties");
    stg.activateMethodEditor.session.setMode("ace/mode/javascript");
    stg.activateMethodEditor.on('change', saveAndExecute);
    $('#patternName').on('input', saveAndExecute);

    $('#newPattern').click(function() {
      PatternManager.addNewPattern();
      initializePatternDropdown();
      $('#stgPatternDropdownItems li').first().click();
    });

    $('#deletePattern').click(function() {
      PatternManager.deletePattern(stg.currentPattern);
      initializePatternDropdown();
      $('#stgPatternDropdownItems li').first().click();
    });

    initializePatternDropdown();
  }

  function saveAndExecute() {
    clearTimeout(stg.editorRefreshTimerHandle);
    stg.editorRefreshTimerHandle = setTimeout(function(){
      stg.currentPattern.name = $('#patternName').val();
      stg.currentPattern.activate = stg.activateMethodEditor.getValue();
      PatternManager.saveAllPatternsToLocalStorage();
      initializePatternDropdown();
      startGame();
    },1000);
  }

  function initializePatternDropdown() {
    $('#stgPatternDropdownItems').empty();

    var addPatternToDropdown = function(p) {
      var item = $('<li><a>'+p.name+'</a></li>');
      item.data('pattern', p);
      item.click(function() {
        startGame($(this).data('pattern'));
      });
      $('#stgPatternDropdownItems').append(item);
    }

    stg.patterns.forEach(function(p){
      addPatternToDropdown(p);
    });

    $('#stgPatternDropdownItems').append('<li><hr/></li>');

    stg.examplePatterns.forEach(function(p){
      addPatternToDropdown(p);
    });
  }

  function populateEditor(pattern) {
    $('#patternName').val(pattern.name);
    stg.activateMethodEditor.setValue(pattern.activate,-1);
    clearTimeout(stg.editorRefreshTimerHandle);
  }
});
