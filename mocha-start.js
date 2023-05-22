(function SetupGlobals() {
	const mod = {

		uConfig (inputData = {}) {
			return Object.assign({
				parent: {},
				name: Math.random().toString(),
			}, inputData);
		},

		uTier (inputData = {}) {
			return Object.assign({
				name: Math.random().toString(),
				monthly: uPlan(),
				yearly: uPlan(),
			}, inputData);
		},

		uPlan (inputData = {}) {
			return Object.assign({
				price: Math.random().toString(),
				links: [uLinkObject(), uLinkObject()],
			}, inputData);
		},

		uLinkObject (inputData = {}) {
			return Object.assign({
				name: Math.random().toString(),
				url: uLink(),
			}, inputData);
		},

	};

	Object.entries(mod).map(function (e) {
		return global[e.shift()] = e.pop();
	});
})();
