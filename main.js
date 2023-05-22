(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.OLSKClub = global.OLSKClub || {})));
}(this, (function(exports) { 'use strict';

	const mod = {

		validateConfig (config) {
			if (typeof config !== 'object' || config === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof config.parent !== 'object' || config.parent === null) {
				return false
			}

			if (typeof config.name !== 'string') {
				return false;
			}

			if (config.tiers !== undefined) {
				if (!Array.isArray(config.tiers)) {
					throw new Error('OLSKErrorInputNotValid');
				}

				if (config.tiers.map(mod.validTier).includes(false)) {
					throw new Error('OLSKErrorInputNotValid');
				}
			}

			return true;
		},

		validTier (tier) {
			if (typeof tier !== 'object' || tier === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof tier.name !== 'string') {
				return false;
			}

			if (tier.description !== undefined && typeof tier.description !== 'string') {
				return false;
			}

			if (!mod.validPlan(tier.monthly)) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (!mod.validPlan(tier.yearly)) {
				throw new Error('OLSKErrorInputNotValid');
			}

			return true;
		},

		validPlan (plan) {
			if (typeof plan !== 'object' || plan === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof plan.price !== 'string') {
				return false;
			}

			if (!Array.isArray(plan.links)) {
				throw new Error('OLSKErrorInputNotValid');
			}

			plan.links = mod.linkObjects(plan.links);

			if (!plan.links.length) {
				throw new Error('OLSKErrorInputNotValid');
			}

			return true;
		},

		linkObjects (links) {
			if (!Array.isArray(links)) {
				throw new Error('OLSKErrorInputNotValid');
			}

			return links.filter(mod.validLink).map(e => typeof e === 'string' ? {
				name: (new URL(e)).hostname,
				url: e,
			} : e);
		},

		validLink (link) {
			if (typeof link === 'string') {
				return !!link.trim();
			}

			if (typeof link !== 'object' || link === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof link.name !== 'string') {
				return false;
			}

			if (!link.name.trim()) {
				return false;
			}

			if (typeof link.url !== 'string') {
				return false;
			}

			if (!link.url.trim()) {
				return false;
			}

			return true;
		},

		// COMMAND

		goChoose (index, plan) {
			const previous = document.querySelector('.OLSKClub choice');

			if (previous) {
				previous.remove();
			}

			console.log(mod._valConfig.tiers[index][plan].links);

			const choice = document.createElement('choice');
			choice.innerHTML = `<h2 class="choiceHeading">Summary</h2>
			<span class="choiceName">${ mod._valConfig.tiers[index].name }</span>
			<span class="choicePrice">${ mod._valConfig.tiers[index][plan].price }</span>
			${ mod._valConfig.tiers[index][plan].links.map(e => `<a class="gateway OLSKDecorPress OLSKDecorPressCall OLSKDecorPressCallInverted" href="${ e.url }">${ e.name }</a>`).join('\n') }`;
			document.querySelector('.OLSKClub').appendChild(choice);
		},

		// SETUP

		setupEverything(config) {
			mod.validateConfig(config);

			mod._valConfig = config;
			
			config.parent.innerHTML = `<div class="OLSKClub OLSKDecor" lang="en">
			<h2 class="clubHeading">${ config.name }</h2>
			<table>${
				config.tiers.map((e, i) => `<tr class="tier">
					<td class="tierName">${ e.name }</td>
					<td><button class="tierMonthly" onclick="OLSKClub.goChoose(${ i }, 'monthly')">${ e.monthly.price }</button></td>
					<td><button class="tierYearly" onclick="OLSKClub.goChoose(${ i }, 'yearly')">${ e.yearly.price }</button></td>
				</tr>`).join('\n')
			}</table></div>`;

			if (!config.modal) {
				return;
			}

			config.parent.innerHTML = `<div class="micromodal-slide modal" id="modal-1" aria-hidden="true">
			<div class="modal__overlay" tabindex="-1" data-micromodal-close="">
				<div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
			
					<header class="modal__header">
						<h2 class="modal__title clubHeading" id="modal-1-title">${ config.name }</h2>
						<button class="modal__close" aria-label="Close modal" data-micromodal-close=""></button>
					</header>
					<div class="modal__content" id="modal-1-content">${ config.parent.innerHTML }</div>
				</div>
			</div></div>`;

			MicroModal.show('modal-1');

			document.querySelector('.modal__container').onclick = (event) => event.stopPropagation();
		},

	};

	Object.assign(exports, {

		OLSKClubLoad: mod.setupEverything,

	}, mod);

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

})));