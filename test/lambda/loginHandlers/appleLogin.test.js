import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";
import sinon from "sinon";

import appleLogin from "../../../lambda/loginHandlers/appleLogin";

describe("loginHandlers/appleLogin", () => {
    describe("appleLogin", () => {
        it("should be a function", () => {
            appleLogin.should.be.a("function");
        });

        it("should return success if no body is provided", () => {
            const gateway = new APIGatewayEvent();
            subscribe(gateway).should.eventually.contain({ statusCode: HTTP_SUCCESS });
        });
    });
});
