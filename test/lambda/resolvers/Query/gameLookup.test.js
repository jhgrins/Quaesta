import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";

import gameLookup from "../../../../lambda/resolvers/Query/gameLookup";

describe("lambda/resolvers/Query/gameLookup", () => {
	describe("gameLookup", () => {
		it("should be a function", () => {
			gameLookup.should.be.a("function");
		});
	});
});
