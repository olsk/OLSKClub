<script>

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

};

import OLSKModalView from 'OLSKModalView';
</script>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKClubHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<div class="OLSKClub">
	</div>
</OLSKModalView>

{#if OLSK_SPEC_UI() }
	<button id="TestDebugOpenButton" on:click={ mod._OLSKModalView.modPublic.OLSKModalViewShow() }>DebugOpenButton</button>
{/if}
