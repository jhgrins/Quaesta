# Quaesta-Serverless

### A Portal For Gamers

Built on the Apollo Framework for GraphQL, this project implements a portal for storing your favorite games. Using a schema-first Graph approach, we implement an Apollo Server on AWS Lambda, with support for services such as authentication, logging, mocking, and testing. Our frontend is React based Apollo Client, utilizing hooks and new technology such as Webpack v5 and Typescript. Our service runs on AWS, and has a completly automated continuous deployment process.

## Installation

### Node

We are currently using Node version `17.0.1`. This version add support for package level module enforcement. If you are using `nvm`, use the following command to activate the correct Node version.

```bash
nvm use
```

### Local Start

For a traditional start, install the node modules required by the project, and start both the web client and a server wrapper of our lambda implementation.

```bash
npm install && npm start
```

### Environment Variables

We currently support the following variables in a `.env` file with key=value pairs.

```
AWS_ACCESS_KEY_ID: AWS IAM credentials with access to deploy to AWS (CloudFormationFullAccess)
AWS_SECRET_ACCESS_KEY: AWS IAM credentials secret
AWS_REGION: AWS region to deploy service and dynamodb tables to
DDB_ENDPOINT: Endpoint of dynamodb endpoint to connect to
MAIL_USERNAME: The username for the mail service.
MAIL_PASSWORD: The password for the mail service.
GOOGLE_CLIENT_ID: The client ID for the Google OAuth2 service.
GOOGLE_CLIENT_SECRET: The client secret for the Google OAuth2 service.
TWITCH_CLIENT_ID: The client ID for the Twitch OAuth2 service.
TWITCH_CLIENT_SECRET: The client secret for the Twitch OAuth2 service.
AUTH_KEY: The key used to encrypt and decrypt the user's session.
PASSWORD_KEY: The key used to encrypt and decrypt the user's password.
MOCKS: false
```

#### Database

We use DynamoDB for our application. After installing `node_modules`, install dynamodb-local.

```
npm install -g serverless
sls dynamodb install
```

This can then be connected to using the following URI environment variable.

```
DDB_ENDPOINT=http://localhost:8080
```
