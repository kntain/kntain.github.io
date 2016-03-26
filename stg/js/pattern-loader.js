var patternsDir = 'patterns/';
var patternScripts = [
  'radial-burst',
  'radial-burst-fast'
];

patternScripts.forEach(function(n, i, ps){
  ps[i] = patternsDir+n;
});

define('pattern-loader', patternScripts, function(){
  var patterns = [];
  for (var i=0;i<arguments.length;i++) {
    patterns.push(arguments[i]);
  }
  return {
    patterns: patterns
  };
});
