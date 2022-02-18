import chai from "chai";

chai.should();

import companies from "../../../serverless/Game/companies";

describe("Game/companies", () => {
	describe("companies", () => {
		it("should be a function", () => {
			companies.should.be.a("function");
		});
	});
});
