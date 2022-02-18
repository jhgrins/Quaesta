require("dotenv").config();

const AWS = require("aws-sdk");

if (!process.env.AWS_REGION) throw new Error("AWS_REGION Is Not Defined");
if (!process.env.DDB_ENDPOINT) throw new Error("DDB_ENDPOINT Is Not Defined");

let serviceConfigOptions = {
	region: process.env.AWS_REGION,
	endpoint: process.env.DDB_ENDPOINT
};

const dynamodb = new AWS.DynamoDB(serviceConfigOptions);

const usersTable = {
	TableName: "quaesta-users",
	KeySchema: [
		{ AttributeName: "id", KeyType: "HASH" }, // Partition key
		{ AttributeName: "username", KeyType: "RANGE" } // Sort key
	],
	AttributeDefinitions: [
		{ AttributeName: "id", AttributeType: "S" },
		{ AttributeName: "username", AttributeType: "S" },
		{ AttributeName: "email", AttributeType: "S" }
	],
	ProvisionedThroughput: { ReadCapacityUnits: 10, WriteCapacityUnits: 10 },
	GlobalSecondaryIndexes: [
		{
			IndexName: "email",
			KeySchema: [
				{ AttributeName: "email", KeyType: "HASH" } // Partition Key
			],
			Projection: { ProjectionType: "ALL" },
			ProvisionedThroughput: { ReadCapacityUnits: 10, WriteCapacityUnits: 10 }
		},
		{
			IndexName: "username",
			KeySchema: [
				{ AttributeName: "username", KeyType: "HASH" } // Partition Key
			],
			Projection: { ProjectionType: "ALL" },
			ProvisionedThroughput: { ReadCapacityUnits: 10, WriteCapacityUnits: 10 }
		}
	]
};

dynamodb.createTable(usersTable, function (err, data) {
	if (err) {
		console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
	}
});
