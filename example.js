var chainer = require('./index');
var chain = chainer();
var count = 0;
var max_calls = 20;

// Add four functions to chain.
// These are designed to ping-pong
// back and forth between first and fourth.
chain.add('first', function(){
	console.log('first');
	counter(true, chain.next);
})
.add(function(dir){
	console.log('second');
	counter(dir, dir ? chain.next : chain.prev);
})
.add(function(dir){
	console.log('third');
	counter(dir, dir ? chain.next : chain.prev);
})
.add(function fourth(){
	console.log('fourth');
	counter(false, chain.prev);
});

// Execute chain from end.
.from('end');

/**
 * Other options include;
 * 
 * 	chain.from('start');
 * 	chain.fn.first();
 * 	chain.run();
 */

// Only executes the callback if the
// counter limit hasn't been reached.
function counter() {
	count++;
	args = [];
	for (var i = 0; i < (arguments.length-1); i++) {
		args.push(arguments[i]);
	}
	var callback = arguments[arguments.length-1];
	if (count < max_calls) {
		callback.apply(chain, args);
	}
}