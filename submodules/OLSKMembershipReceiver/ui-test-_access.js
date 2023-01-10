const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKMembershipReceiver: '.OLSKMembershipReceiver',
	OLSKMembershipReceiverHeading: '.OLSKMembershipReceiverHeading',
	OLSKMembershipReceiverCodeField: '.OLSKMembershipReceiverCodeField',
	OLSKMembershipReceiverEmailField: '.OLSKMembershipReceiverEmailField',
	OLSKMembershipReceiverSubmitButton: '.OLSKMembershipReceiverSubmitButton',
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

});
