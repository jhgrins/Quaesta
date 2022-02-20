import chai from "chai";

chai.should();

import createUser from "../../../lambda/Mutation/createUser";

describe("Mutation/createUser", () => {
	describe("createUser", () => {
		it("should be a function", () => {
			createUser.should.be.a("function");
		});
	});
});
