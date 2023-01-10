<script>
export let OLSKMembershipReceiverPage;
export let OLSKMembershipReceiverEmail;
export let OLSKMembershipReceiverDispatchSubmit;
export let DEBUG_OLSKMembershipReceiverPIN = '';

import { OLSKLocalized } from 'OLSKInternational';
import { OLSKFormatted } from 'OLSKString';
import OLSKLink from 'OLSKLink';

const mod = {

	// VALUE

	_ValueCode: DEBUG_OLSKMembershipReceiverPIN || '',
	_ValueEmail: OLSKMembershipReceiverEmail,

	// DATA

	DataValid () {
		if (mod._ValueCode.replace(/\D/g, '').length < 5) {
			return false;
		}

		return OLSKLink.OLSKEmailValid(mod._ValueEmail);
	},

	// INTERFACE

	async InterfaceFormDidSubmit () {
		event.preventDefault();

		OLSKMembershipReceiverDispatchSubmit({
			pin: mod._ValueCode,
			email: mod._ValueEmail,
		});

		try {
			const response = await window.fetch(OLSKMembershipReceiverPage, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					pin: mod._ValueCode,
					email: mod._ValueEmail,
				}),
			});

			const result = await response.json();
		} catch (error) {
			mod._ValueError = error.message;
		}
	},

};
</script>

<form class="OLSKMembershipReceiver OLSKDecorBigForm" on:submit={ mod.InterfaceFormDidSubmit }>

<p class="OLSKMembershipReceiverHeading">{@html OLSKFormatted(OLSKLocalized('OLSKMembershipReceiverHeadingText'), OLSKMembershipReceiverPage) }</p>

<p>
	<input class="OLSKMembershipReceiverCodeField" placeholder="X-X-X-X-X" type="text" bind:value={ mod._ValueCode } required />
</p>

<p>
	<input class="OLSKMembershipReceiverEmailField" placeholder="hello@example.com" type="email" bind:value={ mod._ValueEmail } required />
</p>

<p>
	<button class="OLSKMembershipReceiverSubmitButton" disabled={ !mod.DataValid() }>{ OLSKLocalized('OLSKWordingSubmitText') }</button>
</p>

{#if mod._ValueError }

<p class="OLSKMembershipReceiverErrorAlert">{ mod._ValueError }</p>
	
{/if}

</form>

<style>
.OLSKMembershipReceiverCodeField {
	font-family: Monaco, monospace;
}
</style>
