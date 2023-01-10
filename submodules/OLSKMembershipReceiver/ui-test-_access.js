const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKMembershipReceiver: '.OLSKMembershipReceiver',
	OLSKMembershipReceiverHeading: '.OLSKMembershipReceiverHeading',
	OLSKMembershipReceiverCodeField: '.OLSKMembershipReceiverCodeField',
	OLSKMembershipReceiverEmailField: '.OLSKMembershipReceiverEmailField',
	OLSKMembershipReceiverSubmitButton: '.OLSKMembershipReceiverSubmitButton',
	OLSKMembershipReceiverErrorAlert: '.OLSKMembershipReceiverErrorAlert',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('OLSKMembershipReceiver_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKMembershipReceiver', function () {
		browser.assert.elements(OLSKMembershipReceiver, 1);
	});

	it('shows OLSKMembershipReceiverHeading', function () {
		browser.assert.elements(OLSKMembershipReceiverHeading, 1);
	});

	it('shows OLSKMembershipReceiverCodeField', function () {
		browser.assert.elements(OLSKMembershipReceiverCodeField, 1);
	});

	it('shows OLSKMembershipReceiverEmailField', function () {
		browser.assert.elements(OLSKMembershipReceiverEmailField, 1);
	});

	it('shows OLSKMembershipReceiverSubmitButton', function () {
		browser.assert.elements(OLSKMembershipReceiverSubmitButton, 1);
	});

	it('hides OLSKMembershipReceiverErrorAlert', function () {
		browser.assert.elements(OLSKMembershipReceiverErrorAlert, 0);
	});

	context('Error', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKMembershipReceiverPage: '/stub/OLSKMembershipReceiver/Error',
				DEBUG_OLSKMembershipReceiverPIN: Math.random().toString(),
				OLSKMembershipReceiverEmail: uEmail(),
			});
		});

		before(function () {
			return browser.pressButton(OLSKMembershipReceiverSubmitButton);
		});

		it.skip('shows OLSKMembershipReceiverErrorAlert', function () {
			browser.assert.elements(OLSKMembershipReceiverErrorAlert, 1);
		});

	});

});
