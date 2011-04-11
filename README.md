	var chainer = require('chainer');
	
	// Make a new chain.
	var chain = chainer();
	
	// Add callbacks to chain.
	chain.add(function(){
		console.log('First!');
		chain.next();
	});	
	chain.add(function(){
		console.log('Second!');
	});
	
	chain.add(function hi() {
		console.log('hi');
	});

	chain.add('hello', function() {
		console.log('hello');
	});
	
	// Run chain.
	chain.run();
	
	// Run some explicit function
	chain.fn.hi();
	chain.fn.hello();
	
	 