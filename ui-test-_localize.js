const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('OLSKMembership_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		before(function() {
			return browser.pressButton('#TestDebugOpenButton');
		});
	
		it('localizes OLSKModalViewTitle', function() {
			browser.assert.text('.OLSKModalViewTitle', uLocalized('OLSKMembershipHeadingText'));
		});

	});

});
