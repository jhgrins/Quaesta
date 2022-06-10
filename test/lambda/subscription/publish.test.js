import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import { publish } from "../../../lambda/subscription/publish";

import { HTTP_SUCCESS } from "../../../lambda/subscription/utils";

describe("lambda/subscription/publish", () => {
    describe("publish", () => {
        it("should be a function", () => {
            publish.should.be.a("function");
        });

        it("should return success if no body is provided", () => {
            publish({}).should.eventually.contain({ statusCode: HTTP_SUCCESS });
        });
    });
});
