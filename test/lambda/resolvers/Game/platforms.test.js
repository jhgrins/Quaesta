import chai from "chai";

chai.should();

import platforms from "../../../../lambda/resolvers/Game/companies";

describe("Game/platforms", () => {
    describe("platforms", () => {
        it("should be a function", () => {
            platforms.should.be.a("function");
        });
    });
});
