import RollupStart from './main.svelte';

const OLSKMembership = new RollupStart({
	target: document.body,
	props: Object.assign({
		OLSKMembershipReceiverPage: Math.random().toString(),
		OLSKMembershipReceiverEmail: Math.random().toString(),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default OLSKMembership;
