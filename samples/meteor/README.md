# Meteor Application with Docker

This sample project demonstrates how to deploy a Meteor application using Docker and connect it to a MongoDB database. We also demonstrate how to run a MongoDB container during development and how to switch over to a managed MongoDB service in production.

## Prerequisites

1. Download [Defang CLI](https://github.com/DefangLabs/defang)
2. Have a managed MongoDB service configured and have the connection string ready.
3. (Optional) If you are using [Defang BYOC](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) authenticated with your AWS account
4. (Optional - for local development) [Docker CLI](https://docs.docker.com/engine/install/)
5. (Optional - for local development) [Meteor CLI](https://docs.meteor.com/install.html)

### Editing the database/permissions etc.

If you want to edit the database, permissions, or any other Meteor settings such that you can deploy them to production, you should make those changes locally and test them in the development environment. Once satisfied, these changes can be applied to the production environment.

## Deploying

1. Open the terminal and type `defang login`
2. Add your connection string as a defang config value by typing `defang config set MONGO_URL` and pasting your connection string (which should be in the format `mongodb://username:password@host:port/dbname`)
3. Set up the environment variables `MONGO_URL` and `ROOT_URL` by typing in `defang config set MONGO_URL` and `defang config set ROOT_URL`
4. Type `defang compose up` in the CLI. 5. Your app will be running within a few minutes.

## Development

For development, we use a MongoDB container. The MongoDB container is defined in the `compose.dev.yaml` file. The Meteor container is also defined in the `compose.dev.yaml` file so it can correctly connect to the development database container.

To start the development environment, run

`docker-compose up --build`.

This will start the MongoDB container and the Meteor container. The Meteor application will be available at `http://localhost:3000`.

---

Title: Meteor

Short Description: A sample project demonstrating how to deploy a Meteor application using Docker and connect it to a MongoDB database

Tags: meteor, mongodb

Languages: javascript, mongodb
