var chainer = require('./index');
var chain = new chainer();
var count = 0;

// Add three functions to chain.
chain.add(function(){
	console.log('first');
	counter(20, chain.next, true);
});
chain.add(function(dir){
	console.log('second');
	counter(20, dir ? chain.next : chain.prev, dir);
});
chain.add(function(dir){
	console.log('third');
	counter(20, chain.prev, !dir);
});

// Execute chain from end.
chain.from('end', true);

/**
 * Other options include;
 * 
 * 	chain.from('start');
 * 	chain.run();
 */

// Only executes the callback
// if the counter limit hasn't been reached.
function counter(max_calls, callback) {
	count++;
	args = [];
	for (var i = 2; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
	if (count < max_calls) {
		callback.apply(null, args);
	}
}