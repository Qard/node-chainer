var a = require('assert');
var chainer = require('..');

var chain = chainer();
a.ok(chain instanceof chainer, 'instance created');

var success = false;
chain.add('test', function(){
    success = true;
});

chain.start();
a.ok(success, 'function was called using start');

success = false;
chain.fn.test();
a.ok(success, 'function was called using name as a first argument');

success = false;
chain.add(function test(){
    success = true;
});
chain.fn.test();
a.ok(success, 'function was called using named function name');

console.log('all tests passed');