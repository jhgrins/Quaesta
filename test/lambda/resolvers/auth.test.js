import chai from "chai";

const should = chai.should();

import { AuthenticationError } from "apollo-server-express";
import casual from "casual";

import {
    generateToken,
    decryptToken,
    authenticateHTTPAccessToken
} from "../../../lambda/resolvers/auth";

describe("lambda/resolvers/auth", () => {
	describe("generateToken", () => {
		it("should be a function", () => {
			generateToken.should.be.a("function");
		});
		it("should return a string", () => {
			generateToken({ id: "test" }).should.be.a("string");
		});
	});

	describe("decryptToken", () => {
		it("should be a function", () => {
			decryptToken.should.be.a("function");
		});
		it("should throw an error if given a bad token", () => {
			const accessToken = casual.uuid;
			(() => decryptToken(accessToken)).should.throw();
		});
		it("should decrypt a token generated by 'generateToken'", () => {
			const id = casual.array_of_digits(24).join("");
			const accessToken = generateToken(id);
			decryptToken(accessToken).should.include({ id });
		});
	});

	describe("authenticateHTTPAccessToken", () => {
		it("should be a function", () => {
			authenticateHTTPAccessToken.should.be.a("function");
		});
		it("should return null if authorization header is not provided", () => {
			const req = { headers: {} };
			should.not.exist(authenticateHTTPAccessToken(req));
		});
		it("should throw an AuthenticationError if token is not provided", () => {
			const req = { headers: { authorization: "Bearer " } };
			(() => authenticateHTTPAccessToken(req)).should.throw(AuthenticationError);
		});
		it("should throw an AuthenticationError if token is not good", () => {
			const req = { headers: { authorization: "Bearer test" } };
			(() => authenticateHTTPAccessToken(req)).should.throw(AuthenticationError);
		});
		it("should return the id if given a token from 'generateToken'", () => {
			const id = casual.array_of_digits(24).join("");
			const token = generateToken(id);
			const req = { headers: { authorization: `Bearer ${token}` } };
			authenticateHTTPAccessToken(req).should.deep.equal(id);
		});
	});
});