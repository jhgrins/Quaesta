import chai from "chai";

chai.should();

import gameEngines from "../../../../lambda/resolvers/Game/companies";

describe("lambda/resolvers/Game/gameEngines", () => {
    describe("gameEngines", () => {
        it("should be a function", () => {
            gameEngines.should.be.a("function");
        });
    });
});
