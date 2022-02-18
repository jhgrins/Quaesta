import chai from "chai";

chai.should();

import email from "../../../serverless/User/email";

describe("User/email", () => {
	describe("email", () => {
		it("should be a function", () => {
			email.should.be.a("function");
		});
	});
});