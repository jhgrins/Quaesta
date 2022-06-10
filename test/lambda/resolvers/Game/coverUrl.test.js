import chai from "chai";

chai.should();

import coverUrl from "../../../../lambda/resolvers/Game/coverUrl";

describe("lambda/resolvers/Game/coverUrl", () => {
    describe("coverUrl", () => {
        it("should be a function", () => {
            coverUrl.should.be.a("function");
        });
    });
});
