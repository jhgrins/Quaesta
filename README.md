# Quaesta

### A Portal For Gamers

Built on the Apollo Framework for GraphQL, this project implements a portal for storing your favorite games. Using a schema-first Graph approach, we implement an Apollo Server on AWS Lambda, with support for services such as authentication, logging, mocking, and testing. Our frontend is React based Apollo Client, utilizing hooks and new technology such as Webpack v5 and Typescript. Our service runs on AWS, and has a completly automated continuous deployment process.

[![Continuous Deployment Status](https://github.com/jhgrins/Quaesta/actions/workflows/deploy.yml/badge.svg)](https://github.com/jhgrins/Quaesta/actions/workflows/deploy.yml)

## Installation

### Node

We are currently using Node version `17.6.0`. This version add support for package level module enforcement. If you are using `nvm`, use the following command to activate the correct Node version.

```bash
nvm use
```

### Local Start

For a traditional start, install the node modules required by the project, and start both the web client and a server wrapper of our lambda implementation.

```bash
npm install && npm start
```

### Environment Variables

We currently support the following variables in a `.env` file with key=value pairs. Do not include AWS_REGION for production builds (required for development). To use the CD, add them as GitHub secrets.

```
AWS_REGION: AWS region to deploy service and dynamodb tables to
DDB_ENDPOINT: Endpoint of DynamoDB service to connect to
MAIL_USERNAME: The username for the mail service
MAIL_PASSWORD: The password for the mail service
GOOGLE_CLIENT_ID: The client ID for the Google OAuth2 service
APPLE_CLIENT_ID: The client secret for the Apple OAuth2 service
TWITCH_CLIENT_ID: The client ID for the Twitch OAuth2 service
TWITCH_CLIENT_SECRET: The client secret for the Twitch OAuth2 service
AUTH_KEY: The key used to encrypt and decrypt the user's session
PASSWORD_KEY: The key used to encrypt and decrypt the user's password
MOCKS: Controls whether or not the lambda operates in mocking mode
```

You will also need the following secrets to deploy to AWS

```
AWS_ACCOUNT_ID: Your AWS account ID
AWS_ACCESS_KEY_ID: AWS IAM credentials with access to deploy to AWS (Admin)
AWS_SECRET_ACCESS_KEY: AWS IAM credentials secret
```

### Database

We use DynamoDB for our application. After installing `node_modules`, install dynamodb-local.

```
npm install -g serverless
sls dynamodb install
```

### GraphQL Subscriptions

If you take this repository out of the box, graphql subscriptions are available using the serverless framework and lambda.
The service uses the [graphql-ws](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) protocol to support subscriptions.

To create a subscription, start by adding a valid subscription to your schema.

```
type Subscription {
    subscriptionShowcase: String
}
```

Then, simply call the `publishToSubscribers` function to publish a message to any active subscribers.

```
await publishToSubscribers("Hello World!", { subscription: "subscriptionShowcase" });
```

The first parameter is the message to publish, and the second parameter is the subscription to publish to. You 
can also pass in a `userId` parameter to filter publishes to specific users.

```
await publishToSubscribers("Hello World!", { 
    subscription: "subscriptionShowcase", 
    userId: "1234" 
});
```