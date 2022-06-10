import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";
import sinon from "sinon";

import { googleLogin } from "../../../lambda/loginHandlers/googleLogin";

import { HTTP_SUCCESS } from "../../../lambda/subscription/utils";

describe("lambda/loginHandlers/googleLogin", () => {
    describe("googleLogin", () => {
        it("should be a function", () => {
            googleLogin.should.be.a("function");
        });

        it("should return success if no body is provided", () => {
            googleLogin({}).should.eventually.contain({ statusCode: HTTP_SUCCESS });
        });
    });
});
