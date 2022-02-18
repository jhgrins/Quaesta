import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";
import sinon from "sinon";

import selfLookup from "../../../serverless/Query/selfLookup";

describe("Query/selfLookup", () => {
	const fakeUserId = casual.id;
	const fakeUser = { id: fakeUserId };
	const context = {
		userId: fakeUserId,
	};
	describe("selfLookup", () => {
		it("should be a function", () => {
			selfLookup.should.be.a("function");
		});
		it("should return null if userId is undefined", () => {
			const testContext = { ...context, userId: undefined };
			selfLookup({}, {}, testContext, {}).should.eventually.equal(null);
		});
		it("should return the user found through the database", () => {
			selfLookup({}, {}, context, {}).should.eventually.deep.equal(fakeUser);
		});
	});
});
