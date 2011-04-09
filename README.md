// Make a new chain.
var chain = new chainer();

// Add callbacks to chain.
chain.add(function(){
	console.log('First!');
	chain.next();
});
chain.add(function(){
	console.log('Second!');
});

// Run chain.
chain.run();