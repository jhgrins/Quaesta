# Quaesta-Serverless

### A Portal For Gamers

Built on the Apollo Framework for GraphQL, this project implements a portal for storing your favorite games. Using a schema-first Graph approach, we implement an Apollo Server, with support for services such as authentication, logging, mocking, and testing. Our frontend is React based Apollo Client, utilizing hooks and new technology such as Webpack v5 and Typescript. Our service runs on AWS, and has a completly automated continuous deployment process.

## Installation

### Node

We are currently using Node version `17.0.1`. This version add support for package level module enforcement. If you are using `nvm`, use the following command to activate the correct Node version.

```bash
nvm use
```

### Local Start

For a traditional start, install the node modules required by the project, and start both the web client and the server.

```bash
npm install && npm start
```

### Docker Images

To run the application in a container, a Dockerfile is provided. The Dockerfile assumes you have already run the following commands in your terminal.

```
npm install
npm run buildServer
npm run buildWebsite
```

The image can then be run by Docker. If you would like the built image for your purposes, without modification, you can use the following command.

```
docker pull ghcr.io/jhgrins/Quaesta:latest
```

You will need to add your own environment variables to the image if pulled. You can do this with the following commands.

```
docker run -d -it --name temp ghcr.io/jhgrins/Quaesta:latest
docker 
docker
docker
```

We currently support the following variables in a `.env` file with key=value pairs.

```
AUTH_KEY: The key used to encrypt and decrypt the user's session.
PASSWORD_KEY: The key used to encrypt and decrypt the user's password.
MAIL_USERNAME: The username for the mail service.
MAIL_PASSWORD: The password for the mail service.
GOOGLE_CLIENT_ID: The client ID for the Google OAuth2 service.
GOOGLE_CLIENT_SECRET: The client secret for the Google OAuth2 service.
```

#### Database

We use DynamoDB for our application. To launch a local database quickly for testing, use the following commands.

```
docker-compose up -d
node scripts/setupDB.js
```

This can then be connected to using the following URI environment variable.

```
DDB_ENDPOINT=http://localhost:8080
```
