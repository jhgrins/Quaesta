import sinon from "sinon";

exports.mochaHooks = {
	afterEach() {
		sinon.restore();
	}
};
