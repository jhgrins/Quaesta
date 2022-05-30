import chai from "chai";

chai.should();

import dlcs from "../../../../lambda/resolvers/Game/companies";

describe("Game/dlcs", () => {
    describe("dlcs", () => {
        it("should be a function", () => {
            dlcs.should.be.a("function");
        });
    });
});
