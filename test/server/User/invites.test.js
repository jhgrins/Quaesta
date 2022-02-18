import chai from "chai";

chai.should();

import invites from "../../../serverless/User/friends";

describe("User/invites", () => {
	describe("invites", () => {
		it("should be a function", () => {
			invites.should.be.a("function");
		});
	});
});