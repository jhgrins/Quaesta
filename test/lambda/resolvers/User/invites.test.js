import chai from "chai";

chai.should();

import invites from "../../../../lambda/resolvers/User/friends";

describe("lambda/resolvers/User/invites", () => {
	describe("invites", () => {
		it("should be a function", () => {
			invites.should.be.a("function");
		});
	});
});