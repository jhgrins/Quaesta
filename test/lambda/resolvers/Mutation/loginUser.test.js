import chai from "chai";

chai.should();

import loginUser from "../../../../lambda/graphql/Mutation/loginUser";

describe("Mutation/loginUser", () => {
	describe("loginUser", () => {
		it("should be a function", () => {
			loginUser.should.be.a("function");
		});
	});
});
