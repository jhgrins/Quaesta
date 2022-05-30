import chai from "chai";

chai.should();

import franchises from "../../../../lambda/resolvers/Game/companies";

describe("Game/franchises", () => {
    describe("franchises", () => {
        it("should be a function", () => {
            franchises.should.be.a("function");
        });
    });
});
