import chai from "chai";

chai.should();

import newFriendRequest from "../../../lambda/Subscription/newFriendRequest";

describe("Subscription/newFriendRequest", () => {
	describe("newFriendRequest", () => {
		it("should be a object", () => {
			newFriendRequest.should.be.an("object");
		});
		it("should be a resolve and subscribe properties", () => {
			newFriendRequest.should.have.property("resolve");
			newFriendRequest.should.have.property("subscribe");
		});
	});
});
