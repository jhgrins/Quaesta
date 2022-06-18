import chai from "chai";

chai.should();

import videos from "../../../../lambda/resolvers/Game/companies";

describe("lambda/resolvers/Game/videos", () => {
    describe("videos", () => {
        it("should be a function", () => {
            videos.should.be.a("function");
        });
    });
});
