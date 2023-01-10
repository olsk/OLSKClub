const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('OLSKMembershipReceiver_Localize-' + OLSKRoutingLanguage, function () {

		const OLSKMembershipReceiverPage = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				OLSKMembershipReceiverPage,
			});
		});
	
		it('localizes OLSKMembershipReceiverHeading', function() {
			browser.assert.OLSKInnerHTML(OLSKMembershipReceiverHeading, OLSKTestingFormatted(uLocalized('OLSKMembershipReceiverHeadingText'), OLSKMembershipReceiverPage).replace(/'/g, '"').replace('d"', "d'"));
		});

		it('localizes OLSKMembershipReceiverCodeField', function () {
			browser.assert.attribute(OLSKMembershipReceiverCodeField, 'placeholder', 'X-X-X-X-X');
		});

		it('localizes OLSKMembershipReceiverEmailField', function () {
			browser.assert.attribute(OLSKMembershipReceiverEmailField, 'placeholder', 'hello@example.com');
		});

		it('localizes OLSKMembershipReceiverSubmitButton', function () {
			browser.assert.text(OLSKMembershipReceiverSubmitButton, uLocalized('OLSKWordingSubmitText'));
		});
	
	});

});
