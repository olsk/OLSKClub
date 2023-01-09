const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKMembership: '.OLSKModalView .OLSKMembership',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('OLSKMembership_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function() {
		return browser.pressButton('#TestDebugOpenButton');
	});

	it('shows OLSKMembership', function () {
		browser.assert.elements(OLSKMembership, 1);
	});

});
