import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import casual from "casual";
import sinon from "sinon";

import {
    BaseGameAPI,
    documentClient,
    getItem,
    getItemsByIndex,
    putItem,
    updateItem,
    deleteItem,
    getItemFromDynamoDBResult
} from "../../lambda/db";

describe("ses", () => {
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

    describe("documentClient", () => {
        it("should be an object", () => {
            documentClient.should.be.a("object");
        });
        it("should have database functions", () => {
            documentClient.should.have.property("get");
            documentClient.should.have.property("query");
            documentClient.should.have.property("put");
            documentClient.should.have.property("update");
            documentClient.should.have.property("delete");
        });
    });

    describe("getItem", () => {
        const fakeReturn = { Item: fakeUser };
        sinon.replace(
            documentClient,
            "get",
            sinon.fake.returns({ promise: sinon.fake.returns(fakeReturn) })
        );

        it("should be a function", () => {
            getItem.should.be.a("function");
        });
        it("should return a GetItemOutput", () => {
            getItem(tableName, fakeUser.id).should.eventually.deep.equal(fakeReturn);
        });
    });

    describe("getItemsByIndex", () => {
        const fakeReturn = { Count: 1, Items: [fakeUser] };
        sinon.replace(
            documentClient,
            "query",
            sinon.fake.returns({ promise: sinon.fake.returns(fakeReturn) })
        );

        it("should be a function", () => {
            getItemsByIndex.should.be.a("function");
        });
        it("should return a QueryOutput by email index", () => {
            getItemsByIndex(tableName, "email", casual.email).should.eventually.deep.equal(
                fakeReturn
            );
        });
        it("should return a QueryOutput by username index", () => {
            getItemsByIndex(tableName, "username", casual.username).should.eventually.deep.equal(
                fakeReturn
            );
        });
    });

    describe("putItem", () => {
        const fakeReturn = { Attributes: fakeUser };
        sinon.replace(
            documentClient,
            "put",
            sinon.fake.returns({ promise: sinon.fake.returns(fakeReturn) })
        );

        it("should be a function", () => {
            putItem.should.be.a("function");
        });
        it("should return a PutItemOutput", () => {
            putItem(tableName, fakeUser).should.eventually.deep.equal(fakeReturn);
        });
    });

    describe("updateItem", () => {
        const newEmail = casual.email;
        const fakeReturn = { Attributes: { ...fakeUser, email: newEmail } };
        sinon.replace(
            documentClient,
            "update",
            sinon.fake.returns({ promise: sinon.fake.returns(fakeReturn) })
        );

        it("should be a function", () => {
            updateItem.should.be.a("function");
        });
        it("should return a UpdateItemOutput by email index", () => {
            updateItem(tableName, fakeUser.id, "email", newEmail).should.eventually.deep.equal(
                fakeReturn
            );
        });
    });

    describe("deleteItem", () => {
        const fakeReturn = { Attributes: fakeUser };
        sinon.replace(
            documentClient,
            "delete",
            sinon.fake.returns({ promise: sinon.fake.returns(fakeReturn) })
        );

        it("should be a function", () => {
            deleteItem.should.be.a("function");
        });
        it("should return a DeleteItemOutput", () => {
            deleteItem(tableName, fakeUser.id).should.eventually.deep.equal(fakeReturn);
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
