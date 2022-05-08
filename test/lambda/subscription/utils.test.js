import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import {
	sendMessageToSocket,
	deleteSocketConnection,
	HTTP_SUCCESS,
	HTTP_SERVER_BAD_REQUEST,
	HTTP_SERVER_ERROR
} from "../../../lambda/subscription/utils";

describe("subscription/utils", () => {
	describe("sendMessageToSocket", () => {
		it("should be a function", () => {
			sendMessageToSocket.should.be.a("function");
		});
	});

	describe("deleteSocketConnection", () => {
		it("should be a function", () => {
			deleteSocketConnection.should.be.a("function");
		});
	});

	describe("HTTP_SUCCESS", () => {
        it("should be a number", () => {
			HTTP_SUCCESS.should.be.a("number");
		});
		it("should be equal to 200", () => {
			HTTP_SUCCESS.should.equal(200);
		});
	});

    describe("HTTP_SERVER_BAD_REQUEST", () => {
        it("should be a number", () => {
			HTTP_SERVER_BAD_REQUEST.should.be.a("number");
		});
		it("should be equal to 400", () => {
			HTTP_SERVER_BAD_REQUEST.should.equal(400);
		});
	});

    describe("HTTP_SERVER_ERROR", () => {
        it("should be a number", () => {
			HTTP_SERVER_ERROR.should.be.a("number");
		});
		it("should be equal to 500", () => {
			HTTP_SERVER_ERROR.should.equal(500);
		});
	});
});
