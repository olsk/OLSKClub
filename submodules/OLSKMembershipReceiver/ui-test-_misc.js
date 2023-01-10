const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKMembershipReceiver_Misc', function () {

	const OLSKMembershipReceiverEmail = uRandomElement(Math.random().toString(), '');

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKMembershipReceiverPage: '/stub/OLSKMembershipReceiver/MatchSuccess',
			OLSKMembershipReceiverEmail,
		});
	});

	describe('OLSKMembershipReceiver', function test_OLSKMembershipReceiver () {
		
		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(OLSKMembershipReceiver, 'OLSKDecorBigForm');
		});

	});

	describe('OLSKMembershipReceiverCodeField', function test_OLSKMembershipReceiverCodeField () {
		
		it('sets type', function () {
			browser.assert.attribute(OLSKMembershipReceiverCodeField, 'type', 'text');
		});

		it('sets required', function () {
			browser.assert.attribute(OLSKMembershipReceiverCodeField, 'required', '');
		});

	});

	describe('OLSKMembershipReceiverEmailField', function test_OLSKMembershipReceiverEmailField () {
		
		it('sets type', function () {
			browser.assert.attribute(OLSKMembershipReceiverEmailField, 'type', 'email');
		});

		it('sets required', function () {
			browser.assert.attribute(OLSKMembershipReceiverEmailField, 'required', '');
		});

		it('binds OLSKMembershipReceiverEmail', function () {
			browser.assert.input(OLSKMembershipReceiverEmailField, OLSKMembershipReceiverEmail);
		});

	});

	describe('OLSKMembershipReceiverSubmitButton', function test_OLSKMembershipReceiverSubmitButton () {

		const pin = Math.random().toString();
		const email = uEmail();

		it.skip('sets disabled', function () {
			browser.assert.attribute(OLSKMembershipReceiverEmailField, 'disabled', '');
		});

		context('missing email', function () {
			
			before(function () {
				browser.fill(OLSKMembershipReceiverCodeField, pin);
			});
			
			before(function () {
				browser.fill(OLSKMembershipReceiverEmailField, '');
			});
			
			it.skip('sets disabled', function () {
				browser.assert.attribute(OLSKMembershipReceiverEmailField, 'disabled', '');
			});
		
		});

		context('filled email', function () {
			
			before(function () {
				browser.fill(OLSKMembershipReceiverEmailField, email);
			});
			
			it('sets disabled', function () {
				browser.assert.attribute(OLSKMembershipReceiverEmailField, 'disabled', null);
			});
		
		});

		context('submit', function () {

			before(function () {
				browser.assert.text('#TestOLSKMembershipReceiverDispatchGrant', '0');
			});
			
			before(function () {
				return browser.pressButton(OLSKMembershipReceiverSubmitButton);
			});

			it.skip('sends OLSKMembershipReceiverDispatchGrant', function () {
				browser.assert.text('#TestOLSKMembershipReceiverDispatchGrant', '1');
				browser.assert.text('#TestOLSKMembershipReceiverDispatchGrantData', JSON.stringify({
					OLSK_FUND_GRANT_V1: 'OLSK_FUND_GRANT_V1',
				}));
			});
		
		});

	});

});
