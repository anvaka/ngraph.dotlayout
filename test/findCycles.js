var test = require('tap').test,
    findCycles = require('../lib/findCycles.js');

test('it finds a cycle', function (t) {
  var graph = load('digraph { a -> b -> a }');

  var cycles = findCycles(graph);
  t.equals(cycles.length, 2, 'Two cycles found');
  var firstCycle = cycles[0];
  t.ok(firstCycle[0].id === 'a' && firstCycle[1].id === 'b', 'Found the first cycle');

  var secondCycle = cycles[1];
  t.ok(secondCycle[0].id === 'b' && secondCycle[1].id === 'a', 'Found the second cycle');

  t.end();
});
