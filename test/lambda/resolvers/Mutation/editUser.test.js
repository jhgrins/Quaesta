import chai from "chai";

chai.should();

import editUser from "../../../../lambda/resolvers/Mutation/editUser";

describe("lambda/resolvers/Mutation/editUser", () => {
    describe("editUser", () => {
        it("should be a function", () => {
            editUser.should.be.a("function");
        });
    });
});
