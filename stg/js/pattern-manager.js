var patternsDir = 'patterns/';
var patternScripts = [
  'welcome',
  'radial-burst',
  'radial-burst-fast'
];

patternScripts.forEach(function(n, i, ps){
  ps[i] = patternsDir+n;
});

define('pattern-manager', patternScripts, function(){
  var patterns = JSON.parse(localStorage.getItem('patterns'));
  if (patterns == null) {
    patterns = [];
    for (var i=0;i<arguments.length;i++) {
      patterns.push(arguments[i]);
    }
  }
  return {
    patterns: patterns,
    addNewPattern: function() {
      this.patterns.unshift({name:'New Pattern',activate:'function(){ \r\n }'});
      this.saveAllPatternsToLocalStorage();
    },
    saveAllPatternsToLocalStorage: function() {
      localStorage.setItem('patterns', JSON.stringify(this.patterns));
    },
    deletePattern: function(pattern) {
      this.patterns.splice(this.patterns.indexOf(pattern),1);
      this.saveAllPatternsToLocalStorage();
    }
  };
});
