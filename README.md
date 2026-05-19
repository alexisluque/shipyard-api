# Shipyard - Backend API

[![codecov](https://codecov.io/github/alexisluque/shipyard-api/graph/badge.svg?token=J23FZISMQ1)](https://codecov.io/github/alexisluque/shipyard-api)

This is the backend service for **Shipyard**, a production-like full-stack application designed to explore real-world DevOps practices.

The API is built with Node.js and TypeScript, and is intended to run in a containerized environment with CI/CD pipelines and cloud deployment.

---

## 🚀 Purpose

The goal of this project is not only to build application features, but to simulate how backend services are developed, validated, and deployed in modern production environments.

This includes:

- Type safety with TypeScript
- Code quality enforcement with ESLint and Prettier
- CI-ready scripts for automated validation
- Containerization and infrastructure integration (planned)

---

## 🧰 Tech Stack

- Node.js
- TypeScript
- ESLint
- Prettier

---

## 📦 Available Scripts

### Development

- `pnpm run dev:start`
  Runs the app in development mode using `tsx`.

- `pnpm run dev:watch`
  Runs the app with file watching enabled.

- `pnpm dev:db:up`
  Starts the development database Docker container in the background.

- `pnpm dev:db:down`
  Stops and removes the development database Docker container.

---

### Build & Run

- `pnpm run build`
  Compiles TypeScript into JavaScript.

- `pnpm start`
  Runs the compiled application.

---

### Migrations

- `pnpm migration:generate`
  Compares the current entities against the database schema and generates a new migration file with the differences.

- `pnpm migration:run`
  Builds the project and runs all pending migrations against the database.

- `pnpm migration:check`
  Builds the project and runs all pending migrations against the database.

- `pnpm migration:revert`
  Builds the project and reverts the last executed migration.

---

### Code Quality

- `pnpm run lint`
  Runs ESLint to check for code issues.

- `pnpm run lint:fix`
  Automatically fixes ESLint issues where possible.

- `pnpm run format`
  Formats the code using Prettier.

- `pnpm run format:check`
  Checks if files are properly formatted.

- `pnpm run type-check`
  Runs TypeScript type checking without emitting files.

---

### Testing

- `pnpm test`
  Placeholder for future tests.

- `pnpm test`
  Runs the test suite in watch mode using Vitest.

- `pnpm test:ci`
  Runs the test suite once without watch mode, intended for CI environments.

- `pnpm test:db:up`
  Starts the test database Docker container in the background.

- `pnpm test:db:down`
  Stops and removes the test database Docker container.

- `pnpm migration:run:test`
  Builds the project and runs pending database migrations against the test database.

- `pnpm test:migration:check`
  Builds the project and checks the migration status against the test database. Fails if any pending migrations are detected, ensuring the schema is fully up to date before running tests.

---

## 🧪 CI/CD Integration

This project is designed to integrate with a CI/CD pipeline where the following checks will be enforced:

- Linting (`pnpm run lint`)
- Formatting (`pnpm run format:check`)
- Type checking (`pnpm run type-check`)
- Build (`pnpm run build`)

Any failure in these steps should block deployment.

---

## 🐳 Containerization

- `docker compose up -d`
  Creates and starts the dabtabase and backend containers in detach mode.

- `docker compose build`
  To build the backend container(Only needed if the Dockerfile is changed).

---

## ☁️ Future Improvements

- Deploy to AWS (EC2)
- Infrastructure as Code with Terraform
- Observability and logging

---

## 📄 License

MIT

---

## ✨ Notes

This project prioritizes learning and experimentation around DevOps practices over feature completeness.
