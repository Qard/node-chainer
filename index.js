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
	var curr = undefined;
	var chain = [];
	var rev_chain = [];
	
	// Add callback to chain.
	function add(callback) {
		chain.push(callback);
	}
	
	// Execute previous item in chain.
	function prev() {
		if (rev_chain.length) {
			// Get new current function.
			var func = rev_chain.pop();
			
			// Add old current function to start of chain.
			if (typeof curr != 'undefined') {
				chain.reverse();
				chain.push(curr);
				chain.reverse();
			}
			
			// Store new current function outside
			// of forward and reverse lists.
			curr = func;
			
			// Execute current function.
			func.apply(this, arguments);
		}
	}
	
	// Execute next item in chain.
	function next() {
		if (chain.length) {
			// Get new current function.
			var func = chain.shift();
			
			// Add old current function to end of rev_chain.
			if (typeof curr != 'undefined') {
				rev_chain.push(curr);
			}
			
			// Store new current function outside
			// of forward and reverse lists.
			curr = func;
			
			// Execute current function.
			func.apply(this, arguments);
		}
	}
	
	// Execute from origin point in chain.
	function from(origin) {
		// Convert start/end to boolean.
		origin = (origin == 'start');
		
		// Collect argument list after origin.
		var args = [];
		for(var i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		
		// If origin is true, we should
		// run from the start of the chain.
		if (origin) {
			// Shift everything in the reverse chain
			// back to the start of the forward chain.
			while (rev_chain.length) {
				chain.reverse();
				chain.push(rev_chain.pop());
				chain.reverse();
			}
			next.apply(this, args);
		
		// Otherwise, run from the end.
		} else {
			// Shift everything in the chain
			// to the end of the reverse chain.
			while (chain.length) {
				rev_chain.push(chain.shift());
			}
			prev.apply(this, args);
		}
	}
	
	// Expose API.
	return {
		add: add
		, push: add
		, run: next
		, start: next
		, next: next
		, prev: prev
		, from: from
	};
}

module.exports = chainer;