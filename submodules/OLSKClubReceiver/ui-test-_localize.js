const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('OLSKClubReceiver_Localize-' + OLSKRoutingLanguage, function () {

		const OLSKClubReceiverPage = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				OLSKClubReceiverPage,
			});
		});
	
		it('localizes OLSKClubReceiverHeading', function() {
			browser.assert.OLSKInnerHTML(OLSKClubReceiverHeading, OLSKTestingFormatted(uLocalized('OLSKClubReceiverHeadingText'), OLSKClubReceiverPage).replace(/'/g, '"').replace('d"', "d'"));
		});

		it('localizes OLSKClubReceiverCodeField', function () {
			browser.assert.attribute(OLSKClubReceiverCodeField, 'placeholder', 'X-X-X-X-X');
		});

		it('localizes OLSKClubReceiverEmailField', function () {
			browser.assert.attribute(OLSKClubReceiverEmailField, 'placeholder', 'hello@example.com');
		});

		it('localizes OLSKClubReceiverSubmitButton', function () {
			browser.assert.text(OLSKClubReceiverSubmitButton, uLocalized('OLSKWordingSubmitText'));
		});

		context('OLSKClubReceiverErrorAlert', function () {

			const DEBUG_OLSKClubReceiverError = Math.random().toString();
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					OLSKClubReceiverPage: '/stub/OLSKClubReceiver/Error',
					OLSKClubReceiverEmail: uEmail(),
					DEBUG_OLSKClubReceiverPIN: Math.random().toString(),
					DEBUG_OLSKClubReceiverError,
				});
			});

			before(function () {
				return browser.pressButton(OLSKClubReceiverSubmitButton);
			});

			it('sets text', function () {
				browser.assert.text(OLSKClubReceiverErrorAlert, DEBUG_OLSKClubReceiverError);
			});

		});

		context('MatchError', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					OLSKClubReceiverPage: '/stub/OLSKClubReceiver/MatchError',
					OLSKClubReceiverEmail: uEmail(),
					DEBUG_OLSKClubReceiverPIN: Math.random().toString(),
					DEBUG_OLSKClubReceiverError: uLocalized('OLSKClubReceiverMatchErrorText'),
				});
			});

			before(function () {
				// return browser.pressButton(OLSKClubReceiverSubmitButton);
			});

			it('shows OLSKClubReceiverErrorAlert', function () {
				browser.assert.text(OLSKClubReceiverErrorAlert, uLocalized('OLSKClubReceiverMatchErrorText'));
			});

		});

		context('MatchSuccess', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					OLSKClubReceiverPage: '/stub/OLSKClubReceiver/MatchSuccess',
					OLSKClubReceiverEmail: uEmail(),
					DEBUG_OLSKClubReceiverPIN: Math.random().toString(),
					DEBUG_OLSKClubReceiverSuccess: true,
				});
			});

			before(function () {
				// return browser.pressButton(OLSKClubReceiverSubmitButton);
			});

			it('shows OLSKClubReceiverSuccessAlert', function () {
				browser.assert.text(OLSKClubReceiverSuccessAlert, uLocalized('OLSKClubReceiverMatchSuccessText'));
			});

		});
	
	});

});
