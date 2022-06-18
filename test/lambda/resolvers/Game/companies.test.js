import chai from "chai";

chai.should();

import companies from "../../../../lambda/resolvers/Game/companies";

describe("lambda/resolvers/Game/companies", () => {
    describe("companies", () => {
        it("should be a function", () => {
            companies.should.be.a("function");
        });
    });
});
