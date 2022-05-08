import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import { APIGatewayEvent } from "aws-lambda";

import { subscribe } from "../../../lambda/subscription/subscribe";
import { HTTP_SERVER_ERROR, HTTP_SUCCESS } from "../../../lambda/subscription/utils";

describe("subscription/subscribe", () => {
	describe("subscribe", () => {
		it("should be a function", () => {
			subscribe.should.be.a("function");
		});

        it("should return success if no body is provided", () => {
            const gateway = new APIGatewayEvent();
			subscribe(gateway).should.eventually.contain({ statusCode: HTTP_SUCCESS });
		});

        it("should return error if no connectionId is provided in requestBody", () => {
			const gateway = new APIGatewayEvent();
			subscribe(gateway).should.eventually.contain({ statusCode: HTTP_SERVER_ERROR });
		});

        it("should return error if unknown subscription protocol type provided", () => {
			const gateway = new APIGatewayEvent();
			subscribe(gateway).should.eventually.contain({ statusCode: HTTP_SERVER_ERROR });
		});

        it("should ackgnoledge a connection_init message", () => {
			const gateway = new APIGatewayEvent();
			subscribe(gateway).should.eventually.contain({ statusCode: HTTP_SERVER_ERROR });
		});
	});
});
