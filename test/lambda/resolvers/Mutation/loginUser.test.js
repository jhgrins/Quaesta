import chai from "chai";

chai.should();

import loginUser from "../../../../lambda/resolvers/Mutation/loginUser";

describe("lambda/resolvers/Mutation/loginUser", () => {
    describe("loginUser", () => {
        it("should be a function", () => {
            loginUser.should.be.a("function");
        });
    });
});
