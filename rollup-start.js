import RollupStart from './main.svelte';

const OLSKClub = new RollupStart({
	target: document.body,
	props: Object.assign({
		OLSKClubReceiverPage: Math.random().toString(),
		OLSKClubReceiverEmail: Math.random().toString(),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default OLSKClub;
