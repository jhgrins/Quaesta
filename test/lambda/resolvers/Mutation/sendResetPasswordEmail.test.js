import chai from "chai";

chai.should();

import sendResetPasswordEmail from "../../../../lambda/graphql/Mutation/sendResetPasswordEmail";

describe("Mutation/sendResetPasswordEmail", () => {
	describe("sendResetPasswordEmail", () => {
		it("should be a function", () => {
			sendResetPasswordEmail.should.be.a("function");
		});
	});
});
