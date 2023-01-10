const mod = {

	OLSKControllerRoutes  () {
		return [{
			OLSKRoutePath: '/stub/OLSKMembershipReceiver',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'OLSKMembershipReceiverStubRoute',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		}];
	},

};

Object.assign(exports, mod)
