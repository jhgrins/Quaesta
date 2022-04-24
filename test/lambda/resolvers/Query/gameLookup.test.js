import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";

import gameLookup from "../../../../lambda/graphql/Query/gameLookup";

describe("Query/gameLookup", () => {
	const fakeUserId = casual.id;
	const fakeUser = { id: fakeUserId, satellites: ["1234"] };
	const fakeContainer = { container: casual.name };
	const context = {
		userId: fakeUserId
	};
	const args = { id: "1234" };
	describe("gameLookup", () => {
		it("should be a function", () => {
			gameLookup.should.be.a("function");
		});
		it("should return an inspected container found through docker", () => {
			gameLookup({}, args, context, {}).should.eventually.deep.equal(fakeContainer);
		});
	});
});
