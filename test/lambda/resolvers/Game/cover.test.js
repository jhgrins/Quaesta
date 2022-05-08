import chai from "chai";

chai.should();

import cover from "../../../../lambda/resolvers/Game/cover";

describe("Game/cover", () => {
	describe("cover", () => {
		it("should be a function", () => {
			cover.should.be.a("function");
		});
	});
});
