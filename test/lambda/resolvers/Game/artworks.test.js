import chai from "chai";

chai.should();

import artworks from "../../../../lambda/resolvers/Game/companies";

describe("lambda/resolvers/Game/artworks", () => {
    describe("artworks", () => {
        it("should be a function", () => {
            artworks.should.be.a("function");
        });
    });
});
