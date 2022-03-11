import chai from "chai";

chai.should();

import { typeDefs, resolvers } from "../../../lambda/graphql/schema";

describe("schema", () => {
	describe("typeDefs", () => {
		it("should be an object", () => {
			typeDefs.should.be.an("object");
		});
	});

	describe("resolvers", () => {
		it("should be an object", () => {
			resolvers.should.be.an("object");
		});
		it("should have Query, Mutation, and Subscription properties", () => {
			resolvers.should.have.property("Query");
			resolvers.should.have.property("Mutation");
		});
		it("should have other properties", () => {
			resolvers.should.have.property("User");
			resolvers.should.have.property("Game");
		});
	});
});
