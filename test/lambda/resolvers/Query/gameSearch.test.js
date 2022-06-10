import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";

import gameSearch from "../../../../lambda/resolvers/Query/gameSearch";

describe("lambda/resolvers/Query/gameSearch", () => {
    describe("gameSearch", () => {
        it("should be a function", () => {
            gameSearch.should.be.a("function");
        });
    });
});
