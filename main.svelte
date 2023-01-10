<script>
export let OLSKMembershipReceiverPage;
export let OLSKMembershipReceiverEmail;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	OLSKMembershipReceiverDispatchGrant () {
		
	},

};

import OLSKModalView from 'OLSKModalView';
import OLSKMembershipReceiver from './submodules/OLSKMembershipReceiver/main.svelte';
</script>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKMembershipHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<div class="OLSKMembership">
		<OLSKMembershipReceiver OLSKMembershipReceiverPage={ OLSKMembershipReceiverPage } OLSKMembershipReceiverEmail={ OLSKMembershipReceiverEmail } OLSKMembershipReceiverDispatchGrant={ mod.OLSKMembershipReceiverDispatchGrant } />
	</div>
</OLSKModalView>

{#if OLSK_SPEC_UI() }
	<button id="TestDebugOpenButton" on:click={ mod._OLSKModalView.modPublic.OLSKModalViewShow() }>DebugOpenButton</button>
{/if}
