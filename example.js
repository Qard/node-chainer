var chainer = require('./index');
var chain = new chainer();
var count = 0;
var max_calls = 20;

// Add four functions to chain.
// These are designed to ping-pong
// back and forth between first and fourth.
chain.add(function(){
	console.log('first');
	counter(true, chain.next);
});
chain.add(function(dir){
	console.log('second');
	counter(dir, dir ? chain.next : chain.prev);
});
chain.add(function(dir){
	console.log('third');
	counter(dir, dir ? chain.next : chain.prev);
});
chain.add(function(){
	console.log('fourth');
	counter(false, chain.prev);
});

// Execute chain from end.
chain.from('end');

/**
 * Other options include;
 * 
 * 	chain.from('start');
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
		callback.apply(null, args);
	}
}