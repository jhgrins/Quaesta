import chai from "chai";

chai.should();

import editUser from "../../../lambda/Mutation/editUser";

describe("Mutation/editUser", () => {
	describe("editUser", () => {
		it("should be a function", () => {
			editUser.should.be.a("function");
		});
	});
});
