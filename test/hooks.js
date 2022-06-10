import sinon from "sinon";

exports.mochaHooks = {
    beforeEach() {
        sinon.replace(console, "log", sinon.fake());
    },
    afterEach() {
        sinon.restore();
    }
};
