var patternsDir = 'patterns/';
var patternScripts = [
  'welcome',
  'radial-burst',
  'radial-burst-fast'
];

patternScripts.forEach(function(n, i, ps){
  ps[i] = patternsDir+n;
});

define('pattern-manager', patternScripts, function() {

  var newPatternName = 'My Pattern';
  var newPatternActivate = 'function(){ \r\n }';

  var patterns = JSON.parse(localStorage.getItem('patterns')) || [{name:newPatternName, activate:newPatternActivate}];

  var examplePatterns = [];
  for (var i=0;i<arguments.length;i++) {
    examplePatterns.push(arguments[i]);
  }

  return {
    patterns: patterns,
    examplePatterns: examplePatterns,
    newPatternName: newPatternName,
    newPatternActivate: newPatternActivate,
    addNewPattern: function() {
      this.patterns.unshift({name:this.newPatternName,activate:this.newPatternActivate});
      this.saveAllPatternsToLocalStorage();
    },
    saveAllPatternsToLocalStorage: function() {
      localStorage.setItem('patterns', JSON.stringify(this.patterns));
    },
    deletePattern: function(pattern) {
      if (this.patterns.length > 1) {
        this.patterns.splice(this.patterns.indexOf(pattern),1);
        this.saveAllPatternsToLocalStorage();
      }
    }
  };
});
