import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";

import gameSearch from "../../../../lambda/resolvers/Query/gameSearch";

describe("Query/gameSearch", () => {
	const fakeUserId = casual.id;
	const fakeUser = { id: fakeUserId, satellites: ["1234"] };
	const fakeContainer = { container: casual.name };
	const context = {
		userId: fakeUserId
	};
	const args = { id: "1234" };
	describe("gameSearch", () => {
        it("should be a function", () => {
            gameSearch.should.be.a("function");
        });
        it("should return an inspected container found through docker", () => {
            gameSearch({}, args, context, {}).should.eventually.deep.equal(fakeContainer);
        });
    });
});
