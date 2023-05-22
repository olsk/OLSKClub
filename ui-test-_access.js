const kDefaultRoute = 'file://' + __dirname + '/stub-view.html';

Object.entries({
	OLSKClub: '.OLSKClub',

	clubHeading: '.clubHeading',

	tier: '.tier',
	tierName: '.tierName',
	tierMonthly: '.tierMonthly',
	tierYearly: '.tierYearly',
	
	choice: 'choice',
	choiceHeading: '.choiceHeading',
	choiceName: '.choiceName',
	choicePrice: '.choicePrice',
	
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

	it('shows clubHeading', () => browser.assert.elements(clubHeading, 1));

	it('shows tier', () => browser.assert.elements(tier, tiersCount));

	it('shows tierName', () => browser.assert.elements(tierName, tiersCount));

	it('shows tierMonthly', () => browser.assert.elements(tierMonthly, tiersCount));

	it('shows tierYearly', () => browser.assert.elements(tierYearly, tiersCount));

	it('hides choice', () => browser.assert.elements(choice, 0));

	context('choose', () => {

		const tiers = [tierMonthly, tierYearly];
		const monthlyFirst = uRandomElement(true, false);

		before(() => browser.click(tier + ':nth-child(1) ' + tiers[monthlyFirst ? 0 : 1]));

		const uTest = () => {
			
			it('shows choice', () => browser.assert.elements(choice, 1));
			
			it('shows choiceHeading', () => browser.assert.elements(choiceHeading, 1));
			
			it('shows choiceName', () => browser.assert.elements(choiceName, 1));
			
			it('shows choicePrice', () => browser.assert.elements(choicePrice, 1));

			it('shows gateway', () => browser.assert.elements(gateway, 2));
			
		};

		uTest();

		context('choose again', () => {

			before(() => browser.click(tier + ':nth-child(1) ' + tiers[monthlyFirst ? 1 : 0]));

			uTest();
		
		});
	
	});

});
