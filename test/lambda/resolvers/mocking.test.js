import chai from "chai";

chai.should();

import mocks from "../../../lambda/resolvers/mocking";

describe("mocking", () => {
	describe("mocks", () => {
		it("should be a object", () => {
			mocks.should.be.an("object");
		});
		it("should have User and Match properties", () => {
			mocks.should.have.property("User");
			mocks.should.have.property("Game");
		});
		it("User function should return schema defined properties", () => {
			mocks.User().should.have.property("id");
			mocks.User().should.have.property("name");
			mocks.User().should.have.property("avatar");
			mocks.User().should.have.property("email");
			mocks.User().should.have.property("username");
			mocks.User().should.have.property("password");
		});
		it("Game function should return schema defined properties", () => {
			mocks.Game().should.have.property("id");
			mocks.Game().should.have.property("name");
			mocks.Game().should.have.property("cover");
			mocks.Game().should.have.property("genres");
			mocks.Game().should.have.property("companies");
		});
	});
});
