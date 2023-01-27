const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKClub: '.OLSKModalView .OLSKClub',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('OLSKClub_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function() {
		return browser.pressButton('#TestDebugOpenButton');
	});

	it('shows OLSKClub', function () {
		browser.assert.elements(OLSKClub, 1);
	});

	it('shows OLSKClubReceiver', function () {
		browser.assert.elements('.OLSKClubReceiver', 1);
	});

});
