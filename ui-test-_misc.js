const kDefaultRoute = 'file://' + __dirname + '/stub-view.html';

describe('OLSKClub_Misc', () => {

	const name = Math.random().toString();
	const tier = uTier();

	before(() => browser.OLSKVisit(kDefaultRoute, {
		name,
		tiers: JSON.stringify([tier]),
	}));

	describe('OLSKClub', () => {

		it('classes OLSKDecor', () => browser.assert.hasClass(OLSKClub, 'OLSKDecor'));

		it('sets lang', () => browser.assert.attribute(OLSKClub, 'lang', 'en'));

	});

	describe('clubHeading', () => {

		it('binds name', () => browser.assert.text(clubHeading, name));

	});

	describe('tierName', () => {

		it('binds name', () => browser.assert.text(tierName, tier.name));

	});

	describe('tierMonthly', () => {

		it('classes OLSKDecorTappable', () => browser.assert.hasClass(tierMonthly, 'OLSKDecorTappable'));

		it('classes OLSKDecorButtonNoStyle', () => browser.assert.hasClass(tierMonthly, 'OLSKDecorButtonNoStyle'));

		it('binds monthly.price', () => browser.assert.text(tierMonthly, tier.monthly.price));

	});
		
	describe('tierYearly', () => {

		it('binds yearly.price', () => browser.assert.text(tierYearly, tier.yearly.price));

	});

	context('choose monthly', function () {

		before(() => browser.click(tierMonthly));
		
		describe('choiceName', () => {

			it('binds tier.name', () => browser.assert.text(choiceName, tier.name));

		});

		describe('choicePrice', () => {

			it('binds tier.price', () => browser.assert.text(choicePrice, tier.monthly.price));

		});

		describe('gateway', () => {

			it('classes OLSKDecorPress', () => browser.assert.hasClass(gateway + ':first-of-type', 'OLSKDecorPress'));

			it('classes OLSKDecorPressCall', () => browser.assert.hasClass(gateway + ':first-of-type', 'OLSKDecorPressCall'));

			it('classes OLSKDecorPressCallInverted', () => browser.assert.hasClass(gateway + ':first-of-type', 'OLSKDecorPressCallInverted'));

			it('sets href', () => browser.assert.attribute(gateway + ':first-of-type', 'href', tier.monthly.links[0].url));

			it('sets text', () => browser.assert.text(gateway + ':first-of-type', tier.monthly.links[0].name));

		});
	
	});

	context('choose yearly', function () {

		before(() => browser.click(tierYearly));
		
		describe('choiceName', () => {

			it('binds tier.name', () => browser.assert.text(choiceName, tier.name));

		});

		describe('choicePrice', () => {

			it('binds tier.price', () => browser.assert.text(choicePrice, tier.yearly.price));

		});

		describe('gateway', () => {

			it('sets href', () => browser.assert.attribute(gateway + ':last-of-type', 'href', tier.yearly.links[1].url));

			it('sets text', () => browser.assert.text(gateway + ':last-of-type', tier.yearly.links[1].name));

		});
	
	});

});
