# FeathersJS Application with Docker

This sample project demonstrates how to deploy a FeathersJS application using Docker. We also demonstrate how to run the application in both development and production environments using Docker Compose.

## Prerequisites

1. Download [Defang CLI](https://github.com/DefangLabs/defang) (optional, if using Defang for deployment)
2. (Optional - for local development) [Docker CLI](https://docs.docker.com/engine/install/)
3. (Optional - for local development) [Node.js](https://nodejs.org/en/download/)

### Development

For development, we use Docker to containerize the FeathersJS application. The Docker Compose configuration is defined in the `docker-compose.dev.yml` file.

To start the development environment, run:

```sh
docker-compose -f compose.dev.yml up --build
```

# Deploying

1. Open the terminal and type defang login
2. Type `defang compose up` in the CLI.
3. Your app will be running within a few minutes.

---

Title: FeathersJS
Short Description: A sample project demonstrating how to deploy a FeathersJS application using Defang. The application displays "DefangxFeathersjs" on the webpage.
Tags: Feathersjs & nodejs
Languages: javascript, nodejs
