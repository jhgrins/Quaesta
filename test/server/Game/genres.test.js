import chai from "chai";

chai.should();

import genres from "../../../lambda/Game/genres";

describe("Game/genres", () => {
	describe("genres", () => {
		it("should be a function", () => {
			genres.should.be.a("function");
		});
	});
});
