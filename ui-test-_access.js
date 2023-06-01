const kDefaultRoute = 'file://' + __dirname + '/stub-view.html';

Object.entries({
	OLSKClub: '.OLSKClub',

	clubHeading: '.clubHeading',
	clubIcon: '.clubIcon',

	tier: '.tier',
	tierName: '.tierName',
	tierBlurb: '.tierBlurb',
	tierMonthly: '.tierMonthly',
	tierYearly: '.tierYearly',
	
	choice: 'choice',
	choiceName: '.choiceName',
	choicePrice: '.choicePrice',
	choiceEdit: '.choiceEdit',
	
	gateway: '.gateway',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('OLSKClub_Access', () => {

	const tiersCount = uRandomInt(5);

	before(() => browser.OLSKVisit(kDefaultRoute, {
		tiers: JSON.stringify(Array.from(Array(tiersCount)).map(e => uTier())),
	}));

	it('shows OLSKClub', () => browser.assert.elements(OLSKClub, 1));

	it('hides clubIcon', () => browser.assert.elements(clubIcon, 0));
	
	it('shows clubHeading', () => browser.assert.elements(clubHeading, 1));

	it('shows tier', () => browser.assert.elements(tier, tiersCount));

	it('shows tierName', () => browser.assert.elements(tierName, tiersCount));

	it('hides tierBlurb', () => browser.assert.elements(tierBlurb, 0));

	it('shows tierMonthly', () => browser.assert.elements(tierMonthly, tiersCount));

	it('shows tierYearly', () => browser.assert.elements(tierYearly, tiersCount));

	it('hides choice', () => browser.assert.elements(choice, 0));

	context('choose', () => {

		const tiers = [tierMonthly, tierYearly];
		const monthlyFirst = uRandomElement(true, false);

		before(() => browser.click(tier + ':nth-of-type(1) ' + tiers[monthlyFirst ? 0 : 1]));

		it('hides tier', () => browser.assert.elements(tier, 0));
		
		it('shows choice', () => browser.assert.elements(choice, 1));
		
		it('shows choiceName', () => browser.assert.elements(choiceName, 1));
		
		it('shows choicePrice', () => browser.assert.elements(choicePrice, 1));
		
		it('shows choiceEdit', () => browser.assert.elements(choiceEdit, 1));

		it('shows gateway', () => browser.assert.elements(gateway, 2));

		context('edit', () => {

			before(() => browser.click(choiceEdit));

			it('shows tier', () => browser.assert.elements(tier, tiersCount));
			
			it('hides choice', () => browser.assert.elements(choice, 0));
		
		});
	
	});

	context('description', () => {

		before(() => browser.OLSKVisit(kDefaultRoute, {
			tiers: JSON.stringify(Array.from(Array(tiersCount)).map(e => uTier({
				description: Math.random().toString(),
			}))),
		}));

		it('shows tierBlurb', () => browser.assert.elements(tierBlurb, tiersCount));
	
	});

	context('icon', () => {

		before(() => browser.OLSKVisit(kDefaultRoute, {
			icon: Math.random().toString(),
			tiers: JSON.stringify([uTier()]),
		}));

		it('shows clubIcon', () => browser.assert.elements(clubIcon, 1));
	
	});

});
