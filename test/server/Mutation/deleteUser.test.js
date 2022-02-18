import chai from "chai";

chai.should();

import deleteUser from "../../../serverless/Mutation/deleteUser";

describe("Mutation/deleteSatellite", () => {
	describe("deleteUser", () => {
		it("should be a function", () => {
			deleteUser.should.be.a("function");
		});
	});
});
