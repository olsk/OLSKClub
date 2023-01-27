const mod = {

	OLSKControllerRoutes  () {
		return [{
			OLSKRoutePath: '/stub/OLSKClubReceiver',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'OLSKClubReceiverStubRoute',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		}, {
			OLSKRoutePath: '/stub/OLSKClubReceiver/MatchError',
			OLSKRouteMethod: 'post',
			OLSKRouteSignature: 'OLSKClubReceiverMatchErrorStubRoute',
			OLSKRouteFunction (req, res, next) {
				return res.json({
					error: 'RCAErrorNoMatch',
				});
			},
		}, {
			OLSKRoutePath: '/stub/OLSKClubReceiver/MatchSuccess',
			OLSKRouteMethod: 'post',
			OLSKRouteSignature: 'OLSKClubReceiverMatchErrorStubRoute',
			OLSKRouteFunction (req, res, next) {
				return res.json({
					OLSK_FUND_GRANT_V1: 'OLSK_FUND_GRANT_V1',
				});
			},
		}];
	},

};

Object.assign(exports, mod)
