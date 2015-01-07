var test = require('tap').test,
    breakCycles = require('../lib/breakCycles.js'),
    load = require('ngraph.fromdot');

test('it breaks a cycle', function (t) {
  var graphsWithCycles = [
    'a -> b -> a',
    'a -> b -> a -> b',
    'a -> b -> c -> b',
    'a -> b -> c -> a',
    'a -> b -> c; b -> a',
  ];
  graphsWithCycles.forEach(testCyclesAreBroken);

  var graphsWithoutCycles = [
    '', // empty graph
    'a -> b',
    'a -> a',
    'a -> b -> c'
  ];

  graphsWithoutCycles.forEach(testNoCycles);

  t.end();

  function testCyclesAreBroken(graphDef) {
    var graph = load('digraph {' + graphDef + '}');
    var hadCyclesBefore = findCycles(graph).length > 0;
    breakCycles(graph);
    var doesnotHaveAnymore = findCycles(graph).length === 0;
    t.ok(hadCyclesBefore, 'Graph ' + graphDef + ' had cycles before');
    t.ok(doesnotHaveAnymore, 'Cycles are broken in ' + graphDef);
  }

  function testNoCycles(graphDef) {
    var graph = load('digraph {' + graphDef + '}');
    var hadNoCyclesBefore = findCycles(graph).length === 0;
    breakCycles(graph);
    var doesnotHaveThemAfter = findCycles(graph).length === 0;
    t.ok(hadNoCyclesBefore, 'Graph ' + graphDef + ' had no cycles before');
    t.ok(doesnotHaveAnymore, 'Graph ' + graphDef + ' has no cycles after');
  }
});
