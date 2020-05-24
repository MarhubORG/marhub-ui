# Marhub UI

## Development

### Framework

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Using Docker Locally

If you choose to use docker, you can start and stop your development environment using these scripts.

#### `docker-compose up -d --build`

#### `docker-compose stop`

### Using Docker in Production

#### `docker-compose -f docker-compose.prod.yml up -d --build`

#### `docker-compose stop`

### Scripts

#### `yarn start`

Starts the project in development mode at localhost:3000

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn lint`

Lints the project and gives feedback for any errors.

#### `yarn format`

Formats the project using prettier

#### Husky, lint-staged, and git hooks

This project uses Husky and lint-staged to manage git hooks. Each time before you commit, the `yarn lint` and `yarn format` will automatically run. If there are any errors you will be notified and will have to clean them up before committing the code
