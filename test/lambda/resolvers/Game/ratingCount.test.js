import chai from "chai";

chai.should();

import ratingCount from "../../../../lambda/resolvers/Game/companies";

describe("lambda/resolvers/Game/ratingCount", () => {
    describe("ratingCount", () => {
        it("should be a function", () => {
            ratingCount.should.be.a("function");
        });
    });
});
