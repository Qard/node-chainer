/**
 * Super simple and lightweight function chain.
 * 
 * Usage:
 *	
 *  // Start new chain.
 *  var chain = chainer();
 *	
 *	// Add callbacks to chain.
 *	chain.add(function(){
 *		console.log('First!');
 *		chain.next();
 *	});
 *  chain.add(function(){
 *    console.log('Second!');
 *  });
 *
 *  // Run chain.
 *  chain.run()
 */
function Chainer() {
	// don't force to use 'new'
	if ( ! (this instanceof Chainer)) {
		return new Chainer();
	}

	this._curr;
	this._chain = [];
	this._revChain = [];
	this.fn = {};
}

// Add callback to chain.
Chainer.prototype.add =
Chainer.prototype.push = function(name, callback) {
	if (typeof name === 'function') {
		callback = name;
		name = callback.name;
	}

	this._chain.push(callback);

	if (name) {
		this.fn[name] = callback;
	}

	return this;
};

// Execute previous item in chain.
Chainer.prototype.prev = function() {
	if ( ! this._revChain.length) {
		return this;
	}

	// Get new current function.
	var fn = this._revChain.pop();

	// Add old current function to start of chain.
	if (this._curr) {
		this._chain.reverse();
		this._chain.push(this._curr);
		this._chain.reverse();
	}

	// Store new current function outside
	// of forward and reverse lists.
	this._curr = fn;

	// Execute current function.
	fn.apply(this, arguments);
	
	return this;    
};

// Execute next item in chain.
Chainer.prototype.next =
Chainer.prototype.run =
Chainer.prototype.start = function() {
	if ( ! this._chain.length) {
		return this;
	}    

	// Get new current function.
	var fn = this._chain.shift();

	// Add old current function to end of rev_chain.
	if (this._curr) {
		this._revChain.push(this._curr);
	}

	// Store new current function outside
	// of forward and reverse lists.
	this._curr = fn;

	// Execute current function.
	fn.apply(this, arguments);

	return this;
};

// Execute from origin point in chain.
Chainer.prototype.from = function(origin) {
	// Convert start/end to boolean.
	origin = origin === 'start';

	// Collect argument list after origin.
	var args = [], i;

	for(i = 1; i < arguments.length; i++) {
		args.push(arguments[i]);
	}

	// If origin is true, we should
	// run from the start of the chain.
	if (origin) {
		// Shift everything in the reverse chain
		// back to the start of the forward chain.
		while (this._revChain.length) {
			this._chain.reverse();
			this._chain.push(this._revChain.pop());
			this._chain.reverse();
		}
		this.next.apply(this, args);

	// Otherwise, run from the end.
	} else {
		// Shift everything in the chain
		// to the end of the reverse chain.
		while (this._chain.length) {
			this._revChain.push(this._chain.shift());
		}
		this.prev.apply(this, args);
	}

	return this;
};

// Make chainer work in the browser.
if (module && module.exports) {
	module.exports = Chainer;
}