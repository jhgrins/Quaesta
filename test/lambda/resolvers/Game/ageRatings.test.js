import chai from "chai";

chai.should();

import ageRatings from "../../../../lambda/resolvers/Game/companies";

describe("Game/ageRatings", () => {
    describe("ageRatings", () => {
        it("should be a function", () => {
            ageRatings.should.be.a("function");
        });
    });
});
