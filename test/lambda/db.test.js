import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";
import sinon from "sinon";

import {
    BaseGameAPI,
    getItem,
    getItemsByIndex,
    putItem,
    updateItem,
    deleteItem,
    getItemFromDynamoDBResult
} from "../../lambda/db";

describe("lambda/db", () => {
    const tableName = "testTable";
    const fakeUser = {
        id: casual.uuid,
        name: casual.full_name,
        avatar: casual.url,
        email: casual.email,
        username: casual.username,
        password: casual.password
    };

    describe("BaseGameAPI", () => {
        it("should be a string", () => {
            BaseGameAPI.should.be.a("string");
        });
    });

    describe("getItem", () => {
        it("should be a function", () => {
            getItem.should.be.a("function");
        });
    });

    describe("getItemsByIndex", () => {
        it("should be a function", () => {
            getItemsByIndex.should.be.a("function");
        });
    });

    describe("putItem", () => {
        it("should be a function", () => {
            putItem.should.be.a("function");
        });
    });

    describe("updateItem", () => {
        it("should be a function", () => {
            updateItem.should.be.a("function");
        });
    });

    describe("deleteItem", () => {
        it("should be a function", () => {
            deleteItem.should.be.a("function");
        });
    });

    describe("getItemFromDynamoDBResult", () => {
        const fakeGetItemOutput = { Item: fakeUser };
        const fakeQueryOutput = { Count: 1, Items: [fakeUser] };
        const fakePutItemOutput = { Attributes: fakeUser };

        it("should be a function", () => {
            getItemFromDynamoDBResult.should.be.a("function");
        });
        it("should return Item if a GetItemOutput", () => {
            getItemFromDynamoDBResult(fakeGetItemOutput).should.deep.equal(fakeGetItemOutput.Item);
        });
        it("should return first in Items if a QueryOutput", () => {
            getItemFromDynamoDBResult(fakeQueryOutput).should.deep.equal(fakeQueryOutput.Items[0]);
        });
        it("should return Attributes if a PutItemOutput, UpdateItemOutput, or DeleteItemOutput", () => {
            getItemFromDynamoDBResult(fakePutItemOutput).should.deep.equal(
                fakePutItemOutput.Attributes
            );
        });
    });
});
