import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import { AuthenticationError } from "apollo-server-express";

import axios from "axios";
import casual from "casual";
import sinon from "sinon";

import {
    checkIsLoggedIn,
    checkIsMe,
    checkInMyFriends,
    getTwitchAccessToken,
    createIGDBRequestConfig,
    makeIGDBRequestForRouteByIds
} from "../../../lambda/resolvers/utils";

describe("lambda/resolvers/utils", () => {
    const fakeUser = {
        id: casual.uuid,
        name: casual.full_name,
        avatar: casual.url,
        email: casual.email,
        username: casual.username,
        password: casual.password,
        friends: ["testFriend", casual.username, casual.username]
    };

    describe("checkIsLoggedIn", () => {
        it("should be a function", () => {
            checkIsLoggedIn.should.be.a("function");
        });
        it("should throw an error if userId is not provided", () => {
            const testContext = { userId: undefined };
            checkIsLoggedIn(testContext).should.eventually.throw(AuthenticationError);
        });
        it("should not throw an error if user is logged in and in database", () => {
            checkIsLoggedIn({ userId: fakeUser.id }).should.eventually.not.throw(
                AuthenticationError
            );
        });
    });

    describe("checkIsMe", () => {
        it("should be a function", () => {
            checkIsMe.should.be.a("function");
        });
        it("should not throw an error if requested user is the same as userId", () => {
            checkIsMe(fakeUser, { userId: fakeUser.id }).should.eventually.not.throw(
                AuthenticationError
            );
        });
        it("should throw an error if userId is not provided", () => {
            checkIsMe(fakeUser, { userId: undefined }).should.eventually.throw(AuthenticationError);
        });
        it("should throw an error if requested user is not the same as userId", () => {
            checkIsMe(fakeUser, { userId: casual.uuids }).should.eventually.throw(
                AuthenticationError
            );
        });
    });

    describe("checkInMyFriends", () => {
        it("should be a function", () => {
            checkInMyFriends.should.be.a("function");
        });
        it("should not throw an error if friend is in requested user's friends list", () => {
            checkInMyFriends({ userId: fakeUser.id }, "testFriend").should.eventually.not.throw(
                AuthenticationError
            );
        });
        it("should throw an error if friend username is the same as requested username", () => {
            checkInMyFriends({ userId: fakeUser.id }, fakeUser.username).should.eventually.throw(
                AuthenticationError
            );
        });
        it("should throw an error if friend username is not in requested user's friend list", () => {
            checkInMyFriends({ userId: fakeUser.id }, "notAFriend").should.eventually.throw(
                AuthenticationError
            );
        });
    });

    describe("getTwitchAccessToken", () => {
        it("should be a function", () => {
            getTwitchAccessToken.should.be.a("function");
        });
    });

    describe("createIGDBRequestConfig", () => {
        it("should be a function", () => {
            createIGDBRequestConfig.should.be.a("function");
        });
    });

    describe("makeIGDBRequestForRouteByIds", () => {
        it("should be a function", () => {
            makeIGDBRequestForRouteByIds.should.be.a("function");
        });
    });
});
