<script>
export let OLSKMembershipReceiverPage;
export let OLSKMembershipReceiverEmail;
export let OLSKMembershipReceiverDispatchGrant;
export let DEBUG_OLSKMembershipReceiverPIN = '';
export let DEBUG_OLSKMembershipReceiverError = '';
export let DEBUG_OLSKMembershipReceiverSuccess = false;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSKFormatted } from 'OLSKString';
import OLSKLink from 'OLSKLink';

const mod = {

	// VALUE

	_ValueCode: DEBUG_OLSKMembershipReceiverPIN || '',
	_ValueEmail: OLSKMembershipReceiverEmail,
	_ValueError: DEBUG_OLSKMembershipReceiverError,
	_ValueSuccess: DEBUG_OLSKMembershipReceiverSuccess,

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

			if (result.error === 'RCAErrorNoMatch') {
				throw new Error(OLSKLocalized('OLSKMembershipReceiverMatchErrorText'));
			}

			if (!result.OLSK_FUND_GRANT_V1) {
				throw new Error('MissingGrant');
			}

			mod._ValueSuccess = true;

			OLSKMembershipReceiverDispatchGrant(result);
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

{#if mod._ValueSuccess }

<p class="OLSKMembershipReceiverSuccessAlert">{ OLSKLocalized('OLSKMembershipReceiverMatchSuccessText') }</p>
	
{/if}

</form>

<style>
.OLSKMembershipReceiverCodeField {
	font-family: Monaco, monospace;
}
</style>
