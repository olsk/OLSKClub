import RollupStart from './main.svelte';

const OLSKClubReceiver = new RollupStart({
	target: document.body,
	props: Object.assign({
		OLSKClubReceiverPage: Math.random().toString(),
		OLSKClubReceiverEmail: Math.random().toString(),
		OLSKClubReceiverDispatchGrant: (function (inputData) {
			window.TestOLSKClubReceiverDispatchGrant.innerHTML = parseInt(window.TestOLSKClubReceiverDispatchGrant.innerHTML) + 1;
			window.TestOLSKClubReceiverDispatchGrantData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default OLSKClubReceiver;
