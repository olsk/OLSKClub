<script>
export let OLSKClubReceiverPage;
export let OLSKClubReceiverEmail;
export let OLSKClubReceiverDispatchGrant;
export let DEBUG_OLSKClubReceiverPIN = '';
export let DEBUG_OLSKClubReceiverError = '';
export let DEBUG_OLSKClubReceiverSuccess = false;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSKFormatted } from 'OLSKString';
import OLSKLink from 'OLSKLink';

const mod = {

	// VALUE

	_ValueCode: DEBUG_OLSKClubReceiverPIN || '',
	_ValueEmail: OLSKClubReceiverEmail,
	_ValueError: DEBUG_OLSKClubReceiverError,
	_ValueSuccess: DEBUG_OLSKClubReceiverSuccess,

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
			const response = await window.fetch(OLSKClubReceiverPage, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					pin: mod._ValueCode,
					email: mod._ValueEmail,
				}),
			});

			const result = await response.json();

			if (result.error === 'RCAErrorNoMatch') {
				throw new Error(OLSKLocalized('OLSKClubReceiverMatchErrorText'));
			}

			if (!result.OLSK_FUND_GRANT_V1) {
				throw new Error('MissingGrant');
			}

			mod._ValueSuccess = true;

			OLSKClubReceiverDispatchGrant(result);
		} catch (error) {
			mod._ValueError = error.message;
		}
	},

};
</script>

<form class="OLSKClubReceiver OLSKDecorBigForm" on:submit={ mod.InterfaceFormDidSubmit }>

<p class="OLSKClubReceiverHeading">{@html OLSKFormatted(OLSKLocalized('OLSKClubReceiverHeadingText'), OLSKClubReceiverPage) }</p>

<p>
	<input class="OLSKClubReceiverCodeField" placeholder="X-X-X-X-X" type="text" bind:value={ mod._ValueCode } required />
</p>

<p>
	<input class="OLSKClubReceiverEmailField" placeholder="hello@example.com" type="email" bind:value={ mod._ValueEmail } required />
</p>

<p>
	<button class="OLSKClubReceiverSubmitButton" disabled={ !mod.DataValid() }>{ OLSKLocalized('OLSKWordingSubmitText') }</button>
</p>

{#if mod._ValueError }

<p class="OLSKClubReceiverErrorAlert">{ mod._ValueError }</p>
	
{/if}

{#if mod._ValueSuccess }

<p class="OLSKClubReceiverSuccessAlert">{ OLSKLocalized('OLSKClubReceiverMatchSuccessText') }</p>
	
{/if}

</form>

<style>
.OLSKClubReceiverCodeField {
	font-family: Monaco, monospace;
}
</style>
