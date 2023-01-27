const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKClubReceiver_Misc', function () {

	const OLSKClubReceiverEmail = uRandomElement(Math.random().toString(), '');

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKClubReceiverPage: '/stub/OLSKClubReceiver/MatchSuccess',
			OLSKClubReceiverEmail,
		});
	});

	describe('OLSKClubReceiver', function test_OLSKClubReceiver () {
		
		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(OLSKClubReceiver, 'OLSKDecorBigForm');
		});

	});

	describe('OLSKClubReceiverCodeField', function test_OLSKClubReceiverCodeField () {
		
		it('sets type', function () {
			browser.assert.attribute(OLSKClubReceiverCodeField, 'type', 'text');
		});

		it('sets required', function () {
			browser.assert.attribute(OLSKClubReceiverCodeField, 'required', '');
		});

	});

	describe('OLSKClubReceiverEmailField', function test_OLSKClubReceiverEmailField () {
		
		it('sets type', function () {
			browser.assert.attribute(OLSKClubReceiverEmailField, 'type', 'email');
		});

		it('sets required', function () {
			browser.assert.attribute(OLSKClubReceiverEmailField, 'required', '');
		});

		it('binds OLSKClubReceiverEmail', function () {
			browser.assert.input(OLSKClubReceiverEmailField, OLSKClubReceiverEmail);
		});

	});

	describe('OLSKClubReceiverSubmitButton', function test_OLSKClubReceiverSubmitButton () {

		const pin = Math.random().toString();
		const email = uEmail();

		it.skip('sets disabled', function () {
			browser.assert.attribute(OLSKClubReceiverEmailField, 'disabled', '');
		});

		context('missing email', function () {
			
			before(function () {
				browser.fill(OLSKClubReceiverCodeField, pin);
			});
			
			before(function () {
				browser.fill(OLSKClubReceiverEmailField, '');
			});
			
			it.skip('sets disabled', function () {
				browser.assert.attribute(OLSKClubReceiverEmailField, 'disabled', '');
			});
		
		});

		context('filled email', function () {
			
			before(function () {
				browser.fill(OLSKClubReceiverEmailField, email);
			});
			
			it('sets disabled', function () {
				browser.assert.attribute(OLSKClubReceiverEmailField, 'disabled', null);
			});
		
		});

		context('submit', function () {

			before(function () {
				browser.assert.text('#TestOLSKClubReceiverDispatchGrant', '0');
			});
			
			before(function () {
				return browser.pressButton(OLSKClubReceiverSubmitButton);
			});

			it.skip('sends OLSKClubReceiverDispatchGrant', function () {
				browser.assert.text('#TestOLSKClubReceiverDispatchGrant', '1');
				browser.assert.text('#TestOLSKClubReceiverDispatchGrantData', JSON.stringify({
					OLSK_FUND_GRANT_V1: 'OLSK_FUND_GRANT_V1',
				}));
			});
		
		});

	});

});
