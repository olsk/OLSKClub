const kDefaultRoute = 'file://' + __dirname + '/stub-view.html';

describe('OLSKClub_Misc', () => {

	const name = Math.random().toString();
	const icon = Math.random().toString();
	const tier = uTier();

	before(() => browser.OLSKVisit(kDefaultRoute, {
		name,
		icon,
		tiers: JSON.stringify([tier]),
	}));

	describe('OLSKClub', () => {

		it('classes OLSKDecor', () => browser.assert.hasClass(OLSKClub, 'OLSKDecor'));

		it('sets lang', () => browser.assert.attribute(OLSKClub, 'lang', 'en'));

	});

	describe('clubHeading', () => {

		it('binds name', () => browser.assert.text(clubHeading, name));

	});

	describe('clubIcon', () => {

		it('binds icon', () => browser.assert.attribute(clubIcon, 'src', icon));

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

		const tierPlan = uRandomElement('monthly', 'yearly');

		before(() => browser.click(tierPlan === 'monthly' ? tierMonthly : tierYearly));
		
		describe('choiceName', () => {

			it('binds tier.name', () => browser.assert.text(choiceName, tier.name));

		});

		describe('choicePrice', () => {

			it('binds tier.price', () => browser.assert.text(choicePrice, tier[tierPlan].price));

		});

		describe('choiceEdit', () => {

			it('classes OLSKDecorTappable', () => browser.assert.hasClass(choiceEdit, 'OLSKDecorTappable'));

			it('sets text', () => browser.assert.text(choiceEdit, 'Change'));

		});

		describe('gateway', () => {

			it('classes OLSKDecorPress', () => browser.assert.hasClass(gateway + ':first-of-type', 'OLSKDecorPress'));

			it('classes OLSKDecorPressCall', () => browser.assert.hasClass(gateway + ':first-of-type', 'OLSKDecorPressCall'));

			it('classes OLSKDecorPressCallInverted', () => browser.assert.hasClass(gateway + ':first-of-type', 'OLSKDecorPressCallInverted'));

			it('sets href', () => browser.assert.attribute(gateway + ':first-of-type', 'href', tier[tierPlan].links[0].url));

			it('sets text', () => browser.assert.text(gateway + ':first-of-type', tier[tierPlan].links[0].name));

		});
	
	});

});
