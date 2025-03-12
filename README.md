# Change of Address (COA)

Change of Address (COA) used by the public to update their details with UK Visas and Immigration (UKVI) 

## Description


- The service allows the user to make a change request as the applicant themselve along with any dependants, or by someone who is helping the applicant, or by the applicant's legal representative.
- The details that can be requested to change are Applicant's home address, Applicant's postal address, Applicant's legal representative's contact details and address.
- The form facilitates the upload of required documents such as proof of identity, proof of home address, proof of postal address, letter of authority.
- The user is able to review all the answers provided to confirm their details prior to submission.
- Once the application is submitted, automated notifications are sent to the business/employee and the user.
- The notification email will include a unique reference number that can be used to refer to the submission.
- All uploaded documents are stored in encrypted form, links to the uploaded documents will be listed in the email to the business/caseworker and can only be accessed after authentication.

## Getting Started

- [Install & run locally](#install--run-the-application-locally)
- [Install & run locally with Docker Compose](#install--run-the-application-locally-with-docker-compose)
- [Install & run locally with VS Code Devcontainers](#install--run-the-application-locally-with-vs-code-dev-containers)

### Dependencies

- This form is built using the [HOF framework](https://github.com/UKHomeOfficeForms/hof)
- [Gov.uk Notify](https://www.notifications.service.gov.uk) to send notification emails
- [File Vault](https://github.com/UKHomeOffice/file-vault) to store and retrieve uploaded files

## Install & Run the Application locally

### Prerequisites

- [Node.js](https://nodejs.org/en/) - v.20.15.0
- [Redis server](http://redis.io/download) running on default port 6379
- [File Vault](https://github.com/UKHomeOffice/file-vault) Service - running port 3000

### Setup

1. Create a `.env` file in the root directory and populate it with all the required environment variables for the project.
2. Install dependencies using the command `yarn`.
3. Start the service in development mode using `yarn run start:dev`.

## Install & Run the Application locally with Docker Compose

You can containerise the application using [Docker](https://www.docker.com). The `.devcontainer` directory includes a `docker-compose.dev.yml` file for orchestrating multi-container application.

### Prerequisites
   - [Docker](https://www.docker.com)

### Setup

By following these steps, you should be able to install and run your application using a Docker Compose. This provides a consistent development environment across different machines and ensures that all required dependencies are available.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

3. Open a terminal, navigate to the project directory and run: `docker compose -f .devcontainer/docker-compose.dev.yml up -d`

4. Once the containers are built and started, you can go inside the app container: `docker exec -it devcontainer-hof-coa-app-1 sh` (note: Docker containers may be named differently)

5. Run the necessary commands to install dependencies `yarn` and `yarn start:dev` to start your application.

## Install & Run the Application locally with VS Code Dev Containers

Alternatively, if you are using [Visual Studio Code](https://code.visualstudio.com/) (VS Code), you can run the application with a [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers).

The `.devcontainer` folder contains the necessary configuration files for the devcontainer.

### Prerequisites
   - [Docker](https://www.docker.com)
   - [VS Code Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention

### Setup

By following these steps, you should be able to run your application using a devcontainer in VS Code. The Dev Containers extension lets you use a Docker container as a full-featured development environment. This provides a consistent development environment across different machines and ensures that all required dependencies are available. A `devcontainer.json` file in this project tells VS Code how to access (or create) a development container with a well-defined tool and runtime stack.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention in VS Code. This extension allows you to develop inside a containerised environment.

3. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

4. Run the `Dev Containers: Open Folder in Container...` command from the Command Palette (F1) or click on the Remote Indicator (≶) in the status bar. This command will build and start the devcontainer based on the configuration files in the `.devcontainer` folder.

7. Once the devcontainer is built and started, you will be inside the containerised environment. You can now work on your project as if you were working locally, but with all the necessary dependencies and tools installed within the container.

8. To start the application, open a terminal within VS Code by going to `View -> Terminal` or by pressing `Ctrl+backtick` (`Cmd+backtick` on macOS). In the terminal, navigate to the project directory if you're not already there.

9. Run the necessary commands to install dependencies `yarn` and `yarn start:dev` to start your application.

### Testing

#### Linting Tests
`$ yarn run test:lint`

#### Unit Tests
`$ yarn test:unit`

#### Acceptance Tests
`$ yarn test:acceptance`

### Deployment

This application is containerised and ready for deployment on Kubernetes. Refer to the `kube/` directory for Kubernetes deployment scripts.
