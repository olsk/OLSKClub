<script>
export let OLSKClubReceiverPage;
export let OLSKClubReceiverEmail;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	OLSKClubReceiverDispatchGrant () {
		
	},

};

import OLSKModalView from 'OLSKModalView';
import OLSKClubReceiver from './submodules/OLSKClubReceiver/main.svelte';
</script>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKClubHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<div class="OLSKClub">
		<OLSKClubReceiver OLSKClubReceiverPage={ OLSKClubReceiverPage } OLSKClubReceiverEmail={ OLSKClubReceiverEmail } OLSKClubReceiverDispatchGrant={ mod.OLSKClubReceiverDispatchGrant } />
	</div>
</OLSKModalView>

{#if OLSK_SPEC_UI() }
	<button id="TestDebugOpenButton" on:click={ mod._OLSKModalView.modPublic.OLSKModalViewShow() }>DebugOpenButton</button>
{/if}
