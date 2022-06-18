import chai from "chai";

chai.should();

import deleteUser from "../../../../lambda/resolvers/Mutation/deleteUser";

describe("lambda/resolvers/Mutation/deleteSatellite", () => {
    describe("deleteUser", () => {
        it("should be a function", () => {
            deleteUser.should.be.a("function");
        });
    });
});
