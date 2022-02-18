import chai from "chai";

chai.should();

import loginUser from "../../../serverless/Mutation/loginUser";

describe("Mutation/loginUser", () => {
	describe("loginUser", () => {
		it("should be a function", () => {
			loginUser.should.be.a("function");
		});
	});
});
