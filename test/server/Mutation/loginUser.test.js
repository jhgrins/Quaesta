import chai from "chai";

chai.should();

import loginUser from "../../../lambda/Mutation/loginUser";

describe("Mutation/loginUser", () => {
	describe("loginUser", () => {
		it("should be a function", () => {
			loginUser.should.be.a("function");
		});
	});
});
