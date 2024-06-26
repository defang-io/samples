# Langchain & flask

## Prerequisites

1. Download [Defang CLI](https://github.com/DefangLabs/defang)
2. (Optional) If you are using [Defang BYOC](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) authenticated with your AWS account
3. (Optional - for local development) [Docker CLI](https://docs.docker.com/engine/install/)

## Deploying

1. Open the terminal and type `defang login`
2. Set the environment variable `OPENAI_API_KEY` by typing `defang config set OPENAI_API_KEY`.
3. Type `defang compose up` in the CLI.
4. Your app will be running within a few minutes.

## Development

For development, first clone the project and navigate to its directory. After such, please run the command

```
docker compose up --build
```

This will start a Docker container with the flask app which will display the result of the langchain prompt.

---

Title: Flask & Langchain

Short Description: A sample project demonstrating how to deploy langchain with flask on defang

Tags: Langchain, AI

Languages: Flask
