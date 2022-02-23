import chai from "chai";

chai.should();

import genres from "../../../../lambda/graphql/Game/genres";

describe("Game/genres", () => {
	describe("genres", () => {
		it("should be a function", () => {
			genres.should.be.a("function");
		});
	});
});
