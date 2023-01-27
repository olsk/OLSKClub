const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKClubReceiver: '.OLSKClubReceiver',
	OLSKClubReceiverHeading: '.OLSKClubReceiverHeading',
	OLSKClubReceiverCodeField: '.OLSKClubReceiverCodeField',
	OLSKClubReceiverEmailField: '.OLSKClubReceiverEmailField',
	OLSKClubReceiverSubmitButton: '.OLSKClubReceiverSubmitButton',
	OLSKClubReceiverErrorAlert: '.OLSKClubReceiverErrorAlert',
	OLSKClubReceiverSuccessAlert: '.OLSKClubReceiverSuccessAlert',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('OLSKClubReceiver_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKClubReceiver', function () {
		browser.assert.elements(OLSKClubReceiver, 1);
	});

	it('shows OLSKClubReceiverHeading', function () {
		browser.assert.elements(OLSKClubReceiverHeading, 1);
	});

	it('shows OLSKClubReceiverCodeField', function () {
		browser.assert.elements(OLSKClubReceiverCodeField, 1);
	});

	it('shows OLSKClubReceiverEmailField', function () {
		browser.assert.elements(OLSKClubReceiverEmailField, 1);
	});

	it('shows OLSKClubReceiverSubmitButton', function () {
		browser.assert.elements(OLSKClubReceiverSubmitButton, 1);
	});

	it('hides OLSKClubReceiverErrorAlert', function () {
		browser.assert.elements(OLSKClubReceiverErrorAlert, 0);
	});

	it('hides OLSKClubReceiverSuccessAlert', function () {
		browser.assert.elements(OLSKClubReceiverSuccessAlert, 0);
	});

	context('Error', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKClubReceiverPage: '/stub/OLSKClubReceiver/Error',
				OLSKClubReceiverEmail: uEmail(),
				DEBUG_OLSKClubReceiverPIN: Math.random().toString(),
				DEBUG_OLSKClubReceiverError: Math.random().toString(),
			});
		});

		before(function () {
			// return browser.pressButton(OLSKClubReceiverSubmitButton);
		});

		it('shows OLSKClubReceiverErrorAlert', function () {
			browser.assert.elements(OLSKClubReceiverErrorAlert, 1);
		});

	});

	context('MatchSuccess', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
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
			browser.assert.elements(OLSKClubReceiverSuccessAlert, 1);
		});

	});

});
