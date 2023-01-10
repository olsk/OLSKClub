import RollupStart from './main.svelte';

const OLSKMembershipReceiver = new RollupStart({
	target: document.body,
	props: Object.assign({
		OLSKMembershipReceiverPage: Math.random().toString(),
		OLSKMembershipReceiverEmail: Math.random().toString(),
		OLSKMembershipReceiverDispatchSubmit: (function (inputData) {
			window.TestOLSKMembershipReceiverDispatchSubmit.innerHTML = parseInt(window.TestOLSKMembershipReceiverDispatchSubmit.innerHTML) + 1;
			window.TestOLSKMembershipReceiverDispatchSubmitData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default OLSKMembershipReceiver;
