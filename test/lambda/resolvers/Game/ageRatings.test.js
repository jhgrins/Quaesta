import chai from "chai";

chai.should();

import ageRatings from "../../../../lambda/resolvers/Game/companies";

describe("lambda/resolvers/Game/ageRatings", () => {
    describe("ageRatings", () => {
        it("should be a function", () => {
            ageRatings.should.be.a("function");
        });
    });
});
