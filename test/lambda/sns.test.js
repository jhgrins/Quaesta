import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";
import sinon from "sinon";

import { publishToSubscribers } from "../../lambda/sns";

describe("lambda/sns", () => {
    describe("publishToSubscribers", () => {
        it("should be a string", () => {
            publishToSubscribers.should.be.a("function");
        });
    });
});
