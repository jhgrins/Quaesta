import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";

import selfLookup from "../../../../lambda/resolvers/Query/selfLookup";

describe("lambda/resolvers/Query/selfLookup", () => {
    describe("selfLookup", () => {
        it("should be a function", () => {
            selfLookup.should.be.a("function");
        });
        it("should return null if userId is undefined", () => {
            const testContext = { userId: undefined };
            selfLookup({}, {}, testContext, {}).should.eventually.equal(null);
        });
    });
});
