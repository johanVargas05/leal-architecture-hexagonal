<h1 align="center">Hexagonal Architecture Typescript Service</h1>


## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installing](#installing)
- [DB](#db)
- [Building](#building)
- [Testing](#testing)
  - [Jest with Testing Library](#jest-with-testing-library)
- [Linting](#linting)

## Installing

```bash
nvm install 18.0.0
nvm use
npm install npm@8.3.0 -g
npm install
```

## DB
It is required to give a connection to a postgres database, once changed in the .env file, execute the following command 

```bash
npx prisma db push
```

## Building

```bash
npm run build
npm start
```

## Testing

### Jest with Testing Library

```bash
npm run test
```

## Linting

Run the linter

```bash
npm run lint
```

Fix lint issues automatically

```bash
npm run lint:fix
```