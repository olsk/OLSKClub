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
		}, {
			OLSKRoutePath: '/stub/OLSKMembershipReceiver/MatchError',
			OLSKRouteMethod: 'post',
			OLSKRouteSignature: 'OLSKMembershipReceiverMatchErrorStubRoute',
			OLSKRouteFunction (req, res, next) {
				return res.json({
					error: 'RCAErrorNoMatch',
				});
			},
		}, {
			OLSKRoutePath: '/stub/OLSKMembershipReceiver/MatchSuccess',
			OLSKRouteMethod: 'post',
			OLSKRouteSignature: 'OLSKMembershipReceiverMatchErrorStubRoute',
			OLSKRouteFunction (req, res, next) {
				return res.json({
					OLSK_FUND_GRANT_V1: Math.random().toString(),
				});
			},
		}];
	},

};

Object.assign(exports, mod)
