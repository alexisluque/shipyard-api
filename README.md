# Shipyard - Backend API

This is the backend service for **Shipyard**, a production-like full-stack application designed to explore real-world DevOps practices.

The API is built with Node.js and TypeScript, and is intended to run in a containerized environment with CI/CD pipelines and cloud deployment.

---

## 🚀 Purpose

The goal of this project is not only to build application features, but to simulate how backend services are developed, validated, and deployed in modern production environments.

This includes:

* Type safety with TypeScript
* Code quality enforcement with ESLint and Prettier
* CI-ready scripts for automated validation
* Containerization and infrastructure integration (planned)

---

## 🧰 Tech Stack

* Node.js
* TypeScript
* ESLint
* Prettier

---

## 📦 Available Scripts

### Development

* `npm run dev:start`
  Runs the app in development mode using `tsx`.

* `npm run dev:watch`
  Runs the app with file watching enabled.

---

### Build & Run

* `npm run compile`
  Compiles TypeScript into JavaScript.

* `npm start`
  Runs the compiled application.

---

### Code Quality

* `npm run lint`
  Runs ESLint to check for code issues.

* `npm run lint:fix`
  Automatically fixes ESLint issues where possible.

* `npm run format`
  Formats the code using Prettier.

* `npm run format:check`
  Checks if files are properly formatted.

* `npm run type-check`
  Runs TypeScript type checking without emitting files.

---

### Testing

* `npm test`
  Placeholder for future tests.

---

## 🧪 CI/CD Integration (Planned)

This project is designed to integrate with a CI/CD pipeline where the following checks will be enforced:

* Linting (`npm run lint`)
* Formatting (`npm run format:check`)
* Type checking (`npm run type-check`)
* Build (`npm run compile`)

Any failure in these steps should block deployment.

---

## 🐳 Containerization (Planned)

The service will be containerized using Docker and orchestrated alongside other services (frontend, database, reverse proxy) using Docker Compose.

---

## ☁️ Future Improvements

* Add authentication and core API features
* Integrate PostgreSQL
* Add automated tests
* Deploy to AWS (EC2)
* Infrastructure as Code with Terraform
* Observability and logging

---

## 📄 License

MIT

---

## ✨ Notes

This project prioritizes learning and experimentation around DevOps practices over feature completeness.
