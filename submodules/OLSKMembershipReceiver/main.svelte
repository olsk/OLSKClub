<script>
export let OLSKMembershipReceiverPage;
export let OLSKMembershipReceiverEmail;
export let OLSKMembershipReceiverDispatchSubmit;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSKFormatted } from 'OLSKString';
import OLSKLink from 'OLSKLink';

const mod = {

	// VALUE

	_ValueCode: '',
	_ValueEmail: OLSKMembershipReceiverEmail,

	// DATA

	DataValid () {
		if (mod._ValueCode.replace(/\D/g, '').length < 5) {
			return false;
		}

		return OLSKLink.OLSKEmailValid(mod._ValueEmail);
	},

	// INTERFACE

	InterfaceFormDidSubmit () {
		event.preventDefault();

		OLSKMembershipReceiverDispatchSubmit({
			pin: mod._ValueCode,
			email: mod._ValueEmail,
		});
	},

};
</script>

<form class="OLSKMembershipReceiver OLSKDecorBigForm" on:submit={ mod.InterfaceFormDidSubmit }>

<strong class="OLSKMembershipReceiverHeading">{@html OLSKFormatted(OLSKLocalized('OLSKMembershipReceiverHeadingText'), OLSKMembershipReceiverPage) }</strong>

<p>
	<input class="OLSKMembershipReceiverCodeField" placeholder="X-X-X-X-X" type="text" bind:value={ mod._ValueCode } required />
</p>

<p>
	<input class="OLSKMembershipReceiverEmailField" placeholder="hello@example.com" type="email" bind:value={ mod._ValueEmail } required />
</p>

<p>
	<button class="OLSKMembershipReceiverSubmitButton" disabled={ !mod.DataValid() }>{ OLSKLocalized('OLSKWordingSubmitText') }</button>
</p>

</form>

<style>
.OLSKMembershipReceiverCodeField {
	font-family: Monaco, monospace;
}
</style>
