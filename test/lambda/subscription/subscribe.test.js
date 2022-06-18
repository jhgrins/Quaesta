import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import { subscribe } from "../../../lambda/subscription/subscribe";

import { HTTP_SERVER_ERROR, HTTP_SUCCESS } from "../../../lambda/subscription/utils";

describe("lambda/subscription/subscribe", () => {
	describe("subscribe", () => {
		it("should be a function", () => {
			subscribe.should.be.a("function");
		});

        it("should return success if no body is provided", () => {
			subscribe({}).should.eventually.contain({ statusCode: HTTP_SUCCESS });
		});

        it("should return error if no connectionId is provided in requestBody", () => {
			subscribe({}).should.eventually.contain({ statusCode: HTTP_SERVER_ERROR });
		});

        it("should return error if unknown subscription protocol type provided", () => {
			subscribe({}).should.eventually.contain({ statusCode: HTTP_SERVER_ERROR });
		});

        it("should ackgnoledge a connection_init message", () => {
			subscribe({}).should.eventually.contain({ statusCode: HTTP_SERVER_ERROR });
		});
	});
});
