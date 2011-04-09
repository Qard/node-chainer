/**
 * Super simple and lightweight function chain.
 * 
 * Usage:
 * 	
 * 	// Start new chain.
 * 	var chain = new chainer();
 * 	
 * 	// Add callbacks to chain.
 * 	chain.add(function(){
 * 		console.log('First!');
 * 		chain.next();
 * 	});
 * 	chain.add(function(){
 * 		console.log('Second!');
 * 	});
 * 	
 * 	// Run chain.
 * 	chain.run()
 */
function chainer(){
	var chain = [];
	
	function add(callback) {
		chain.push(callback);
	}
	function next() {
		if (chain.length) {
			chain[0]();
			chain.shift();
		}
	}
	
	return {
		add: add
		, push: add
		, run: next
		, start: next
		, next: next
	};
}

module.exports = chainer;