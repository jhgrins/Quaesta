import sinon from "sinon";

// Restores The Default Sandbox After Every Test

exports.mochaHooks = {
	afterEach() {
		sinon.restore();
	}
};
