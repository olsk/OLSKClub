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

		context('OLSKMembershipReceiverErrorAlert', function () {

			const DEBUG_OLSKMembershipReceiverError = Math.random().toString();
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					OLSKMembershipReceiverPage: '/stub/OLSKMembershipReceiver/Error',
					OLSKMembershipReceiverEmail: uEmail(),
					DEBUG_OLSKMembershipReceiverPIN: Math.random().toString(),
					DEBUG_OLSKMembershipReceiverError,
				});
			});

			before(function () {
				return browser.pressButton(OLSKMembershipReceiverSubmitButton);
			});

			it('sets text', function () {
				browser.assert.text(OLSKMembershipReceiverErrorAlert, DEBUG_OLSKMembershipReceiverError);
			});

		});

		context('MatchError', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					OLSKMembershipReceiverPage: '/stub/OLSKMembershipReceiver/MatchError',
					OLSKMembershipReceiverEmail: uEmail(),
					DEBUG_OLSKMembershipReceiverPIN: Math.random().toString(),
					DEBUG_OLSKMembershipReceiverError: uLocalized('OLSKMembershipReceiverMatchErrorText'),
				});
			});

			before(function () {
				// return browser.pressButton(OLSKMembershipReceiverSubmitButton);
			});

			it('shows OLSKMembershipReceiverErrorAlert', function () {
				browser.assert.text(OLSKMembershipReceiverErrorAlert, uLocalized('OLSKMembershipReceiverMatchErrorText'));
			});

		});

		context('MatchSuccess', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					OLSKMembershipReceiverPage: '/stub/OLSKMembershipReceiver/MatchSuccess',
					OLSKMembershipReceiverEmail: uEmail(),
					DEBUG_OLSKMembershipReceiverPIN: Math.random().toString(),
					DEBUG_OLSKMembershipReceiverSuccess: true,
				});
			});

			before(function () {
				// return browser.pressButton(OLSKMembershipReceiverSubmitButton);
			});

			it('shows OLSKMembershipReceiverSuccessAlert', function () {
				browser.assert.text(OLSKMembershipReceiverSuccessAlert, uLocalized('OLSKMembershipReceiverMatchSuccessText'));
			});

		});
	
	});

});
