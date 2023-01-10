import RollupStart from './main.svelte';

const OLSKMembershipReceiver = new RollupStart({
	target: document.body,
	props: Object.assign({
		OLSKMembershipReceiverPage: Math.random().toString(),
		OLSKMembershipReceiverEmail: Math.random().toString(),
		OLSKMembershipReceiverDispatchGrant: (function (inputData) {
			window.TestOLSKMembershipReceiverDispatchGrant.innerHTML = parseInt(window.TestOLSKMembershipReceiverDispatchGrant.innerHTML) + 1;
			window.TestOLSKMembershipReceiverDispatchGrantData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default OLSKMembershipReceiver;
