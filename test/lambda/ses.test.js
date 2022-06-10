import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";
import sinon from "sinon";

import { sendAccountCreatedEmail, sendForgotPasswordEmail } from "../../lambda/ses";

describe("lambda/ses", () => {
    describe("sendAccountCreatedEmail", () => {
        it("should be a function", () => {
            sendAccountCreatedEmail.should.be.a("function");
        });
    });

    describe("sendForgotPasswordEmail", () => {
        it("should be an function", () => {
            sendForgotPasswordEmail.should.be.a("function");
        });
    });
});
