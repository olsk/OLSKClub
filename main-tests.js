const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('validateConfig', function test_validateConfig() {

	it('throws if not object', function () {
		throws(function () {
			mod.validateConfig(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if parent not object', function () {
		deepEqual(mod.validateConfig(uConfig({
			parent: null,
		})), false);
	});

	it('returns false if name not string', function () {
		deepEqual(mod.validateConfig(uConfig({
			name: null,
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.validateConfig(uConfig()), true);
	});

	context('icon', function () {
		
		it('throws if not string', function () {
			deepEqual(mod.validateConfig(uConfig({
				icon: null,
			})), false);
		});
		
	});

	context('tiers', function () {
		
		it('throws if not array', function () {
			throws(function () {
				mod.validateConfig(uConfig({
					tiers: null,
				}));
			}, /ErrorInputNotValid/);
		});
		
		it('throws if member not valid', function () {
			throws(function () {
				mod.validateConfig(uConfig({
					tiers: [{}],
				}));
			}, /ErrorInputNotValid/);
		});
	
	});

});

describe('validTier', function test_validTier() {

	it('throws if not object', function () {
		throws(function () {
			mod.validTier(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if name not string', function () {
		deepEqual(mod.validTier(uTier({
			name: null,
		})), false);
	});

	it('throws if monthly not valid', function () {
		throws(function () {
			mod.validTier(uTier({
				monthly: {},
			}));
		}, /ErrorInputNotValid/);
	});

	it('throws if yearly not valid', function () {
		throws(function () {
			mod.validTier(uTier({
				yearly: {},
			}));
		}, /ErrorInputNotValid/);
	});

	it('returns true', function () {
		deepEqual(mod.validTier(uTier()), true);
	});

	context('description', function () {
		
		it('returns false if not string', function () {
			deepEqual(mod.validTier(uTier({
				description: null,
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.validTier(uTier({
				description: Math.random().toString(),
			})), true);
		});
	
	});

});

describe('validPlan', function test_validPlan() {

	it('throws if not object', function () {
		throws(function () {
			mod.validPlan(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if price not string', function () {
		deepEqual(mod.validPlan(uPlan({
			price: null,
		})), false);
	});

	it('throws if links not array', function () {
		throws(function () {
			mod.validPlan(uPlan({
				links: {},
			}));
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if links member not valid', function () {
		throws(function () {
			mod.validPlan(uPlan({
				links: [' '],
			}));
		}, /OLSKErrorInputNotValid/);
	});

	it('returns true', function () {
		deepEqual(mod.validPlan(uPlan()), true);
	});

});

describe('linkObjects', function test_linkObjects() {

	it('throws if not array', function () {
		throws(function () {
			mod.linkObjects({});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns array if string', function () {
		const url = uLink();
		deepEqual(mod.linkObjects([url]), [{
			name: (new URL(url)).hostname,
			url,
		}]);
	});

});

describe('validLink', function test_validLink() {

	it('throws if not object', function () {
		throws(function () {
			mod.validLink(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if name not string', function () {
		deepEqual(mod.validLink(uLinkObject({
			name: null,
		})), false);
	});
	
	it('returns false if name empty', function () {
		deepEqual(mod.validLink(uLinkObject({
			name: ' ',
		})), false);
	});
	
	it('returns false if url not string', function () {
		deepEqual(mod.validLink(uLinkObject({
			url: null,
		})), false);
	});
	
	it('returns false if url empty', function () {
		deepEqual(mod.validLink(uLinkObject({
			url: ' ',
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.validLink(uLinkObject()), true);
	});

	context('string', function () {

		it('returns false if empty', function () {
			deepEqual(mod.validLink(' '), false);
		});

		it('returns true', function () {
			deepEqual(mod.validLink(Math.random().toString()), true);
		});	
	
	});

});
